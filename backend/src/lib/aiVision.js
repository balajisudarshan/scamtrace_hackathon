/**
 * NVIDIA API (OpenAI-compatible) + Cloudinary + OCR helper library
 * Key: NVIDIA_API_KEY from .env (from BrandGuard project)
 */
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { createWorker } from "tesseract.js";
import fs from "fs";

// ─── Cloudinary config (from Certificate project) ────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// ─── NVIDIA AI (from BrandGuard) ─────────────────────────────────────────────
const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export const aiEnabled = () =>
  Boolean(process.env.NVIDIA_API_KEY && process.env.NVIDIA_API_KEY !== "your-key-here");

async function nvidiaChatRaw(messages, { maxTokens = 800, temperature = 0.2 } = {}) {
  const res = await fetch(NVIDIA_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.NVIDIA_MODEL || "moonshotai/kimi-k3",
      messages,
      max_tokens: maxTokens,
      temperature,
      stream: false,
    }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`NVIDIA API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  return json.choices?.[0]?.message?.content?.trim() || "";
}

/**
 * Explain a scam/brand impersonation detection with AI
 * Degrades gracefully if no key
 */
export async function aiExplainDetection(brand, detection) {
  if (!aiEnabled()) {
    return {
      text: `Rule-based: scored ${detection.score}/100 (${detection.severity}). ${detection.reasons?.join("; ")}.`,
      ai: false,
    };
  }
  try {
    const prompt = `You are a brand-protection analyst. 
Brand: ${brand.name} (domain: ${brand.domain}, official handles: ${brand.officialSocial?.map(s=>s.handle).join(", ") || "N/A"}).

Detection (${detection.type}, source: ${detection.source}):
${JSON.stringify(detection.item, null, 2)}

Rule-engine score: ${detection.score}/100. Signals: ${detection.reasons?.join("; ")}.

In exactly 3 short sentences:
1. Is this likely a brand impersonation, scam account, or benign/unrelated account?
2. The single strongest evidence for your assessment.
3. Recommended action: report for takedown, monitor closely, or ignore.
Do not invent facts beyond the data given. Be concise.`;
    const text = await nvidiaChatRaw([{ role: "user", content: prompt }]);
    return { text: text || "AI analysis unavailable", ai: Boolean(text) };
  } catch (e) {
    return { text: `Rule-based analysis (AI error: ${e.message}). Score: ${detection.score}/100.`, ai: false };
  }
}

/**
 * Compare two logo images with AI vision
 */
export async function aiCompareLogos(officialUrl, candidateUrl) {
  if (!aiEnabled()) return { text: "AI logo comparison disabled (no API key)", ai: false, confidence: null };
  try {
    const content = [
      { type: "text", text: "Image 1 is the official brand logo. Image 2 is a candidate logo. Reply in 2 sentences: Is image 2 an imitation of image 1 (same shapes/colors/text with small changes)? Give a confidence score 0-100 and say whether it is: 'high similarity (impersonation)', 'moderate similarity (monitor)', or 'low similarity (likely different brand)'." },
      { type: "image_url", image_url: { url: officialUrl } },
      { type: "image_url", image_url: { url: candidateUrl } },
    ];
    const text = await nvidiaChatRaw([{ role: "user", content }], { maxTokens: 300 });
    // Extract confidence from response
    const match = text.match(/(\d{1,3})\s*(?:\/\s*100|%|out of 100)?/);
    const confidence = match ? Math.min(100, parseInt(match[1])) : null;
    return { text, ai: true, confidence };
  } catch (e) {
    return { text: `Logo comparison failed: ${e.message}`, ai: false, confidence: null };
  }
}

/**
 * AI-powered OCR analysis of suspicious screenshot/image
 * Extracts text + analyzes for scam content
 */
export async function analyzeImageWithOCR(imagePath, imageUrl) {
  const result = { ocrText: "", scamIndicators: [], aiAnalysis: null };

  // 1. OCR with Tesseract
  try {
    const worker = await createWorker("eng");
    const { data: { text } } = await worker.recognize(imagePath || imageUrl);
    await worker.terminate();
    result.ocrText = text.trim();
  } catch (e) {
    result.ocrText = "";
    result.ocrError = e.message;
  }

  // 2. Rule-based scam signal scan on extracted text
  if (result.ocrText) {
    const SCAM_PATTERNS = [
      { pattern: /your account (will be|has been) (suspended|blocked|frozen)/i, signal: "account suspension threat" },
      { pattern: /update.*kyc/i, signal: "KYC update demand" },
      { pattern: /share.*otp/i, signal: "OTP theft attempt" },
      { pattern: /you.*(won|earned|received).*(cashback|prize|reward)/i, signal: "reward lure" },
      { pattern: /(click here|tap here).*(claim|verify|update)/i, signal: "phishing link" },
      { pattern: /guaranteed.*(\d+%|returns)/i, signal: "guaranteed returns claim" },
      { pattern: /pay.*processing fee/i, signal: "advance fee fraud" },
      { pattern: /arrest warrant/i, signal: "fake arrest threat" },
      { pattern: /income.?tax.?refund/i, signal: "tax refund scam" },
    ];
    for (const { pattern, signal } of SCAM_PATTERNS) {
      if (pattern.test(result.ocrText)) {
        result.scamIndicators.push(signal);
      }
    }
  }

  // 3. AI analysis of the extracted text
  if (aiEnabled() && result.ocrText && result.ocrText.length > 20) {
    try {
      const prompt = `You are a scam detection analyst. The following text was extracted via OCR from a suspicious screenshot.
OCR Text: "${result.ocrText.slice(0, 1000)}"

In 3 concise points:
1. Is this a scam? (Yes/No/Unclear) and what type?
2. The specific phrases that are most suspicious.
3. Recommended action for the person who received this.
Be factual, do not invent details not in the text.`;
      const aiText = await nvidiaChatRaw([{ role: "user", content: prompt }], { maxTokens: 400 });
      result.aiAnalysis = { text: aiText, ai: true };
    } catch (e) {
      result.aiAnalysis = { text: `AI analysis failed: ${e.message}`, ai: false };
    }
  }

  return result;
}

/**
 * Upload image to Cloudinary and return URL
 */
export async function uploadToCloudinary(filePath, folder = "scamtrace/images") {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    width: result.width,
    height: result.height,
  };
}

/**
 * Upload from URL to Cloudinary (for logo comparison)
 */
export async function uploadUrlToCloudinary(imageUrl, folder = "scamtrace/logos") {
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder,
    resource_type: "image",
  });
  return { url: result.secure_url, publicId: result.public_id };
}
