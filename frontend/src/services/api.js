const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Helper to get authorization header from local storage token
 */
export const getAuthToken = () => {
  const token = localStorage.getItem("st_token") || localStorage.getItem("accessToken") || "";
  if (!token || token === "undefined" || token === "null") return "";
  return token;
};

// Auto-reauthenticate analyst helper for hackathon demo resilience
let reauthPromise = null;
export async function reauthenticateAnalyst() {
  if (reauthPromise) return reauthPromise;
  reauthPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "analyst@scamtrace.dev", password: "analyst123" }),
      });
      const data = await res.json();
      if (data.success && (data.accessToken || data.token)) {
        const freshToken = data.accessToken || data.token;
        localStorage.setItem("st_token", freshToken);
        localStorage.setItem("accessToken", freshToken);
        if (data.user) {
          localStorage.setItem("st_user", JSON.stringify(data.user));
        }
        return freshToken;
      }
    } catch (_) {}
    return null;
  })().finally(() => {
    reauthPromise = null;
  });
  return reauthPromise;
}

/**
 * Universal request wrapper with error normalization, retry & JSON handling,
 * plus free-tier cold start handling and configurable timeouts.
 */
async function request(endpoint, options = {}, isRetry = false) {
  const url = `${API_BASE}${endpoint}`;
  let token = getAuthToken();

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Configure sensible timeout (default 90s for free-tier hosting cold starts)
  const timeoutMs = options.timeout || 90000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error("REQUEST_TIMEOUT")), timeoutMs);

  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

  const config = {
    ...options,
    headers,
    signal: controller.signal,
    credentials: "include", // send HttpOnly cookies if set
  };

  if (config.body && typeof config.body === "object" && !isFormData) {
    config.body = JSON.stringify(config.body);
  }

  let res;
  try {
    res = await fetch(url, config);
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError" || controller.signal.aborted) {
      const timeoutError = new Error(
        "Request timed out while connecting to the analysis engine. If the server is on a free-tier hosting tier, it may take 15–30 seconds to wake up from idle. Please click 'Retry Scan' now that the server is warm."
      );
      timeoutError.isTimeout = true;
      timeoutError.isColdStart = true;
      throw timeoutError;
    }
    const netError = new Error(
      `Network connection error: ${err.message}. If the backend is waking up, please wait a moment and retry.`
    );
    netError.isNetworkError = true;
    netError.isColdStart = true;
    throw netError;
  } finally {
    clearTimeout(timer);
  }

  // If 401 on an admin endpoint, attempt auto-reauth once for demo resilience
  if (res.status === 401 && endpoint.startsWith("/api/admin") && !isRetry) {
    const newToken = await reauthenticateAnalyst();
    if (newToken) {
      return request(endpoint, options, true);
    }
  }

  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const errorMsg =
      (isJson && data?.message) ||
      (isJson && data?.error) ||
      `Request failed with status ${res.status}`;
    const error = new Error(errorMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ─── API Service Catalog ─────────────────────────────────────────────────────

export const api = {
  // ─── Authentication ───
  auth: {
    login: (email, password) =>
      request("/api/auth/login", { method: "POST", body: { email, password } }),
    loginGoogle: (credential) =>
      request("/api/auth/google", { method: "POST", body: { credential } }),
    register: (firstName, lastName, email, password) =>
      request("/api/auth/register", {
        method: "POST",
        body: { firstName, lastName, email, password },
      }),
    logout: () => request("/api/auth/logout", { method: "POST" }),
    me: () => request("/api/auth/me", { method: "GET" }),
  },

  // ─── Content Check (Public) ───
  check: {
    analyze: ({ type, content }, options = {}) =>
      request("/api/check", { method: "POST", body: { type, content }, ...options }),
    analyzeImage: (formData, options = {}) =>
      request("/api/check/image", { method: "POST", body: formData, ...options }),
  },

  // ─── Reports (Public) ───
  reports: {
    list: (params = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          query.append(key, val);
        }
      });
      const qStr = query.toString();
      return request(`/api/reports${qStr ? `?${qStr}` : ""}`, { method: "GET" });
    },
    get: (id) => request(`/api/reports/${id}`, { method: "GET" }),
    submit: ({ type, content, platform, targetRegion }) =>
      request("/api/reports", {
        method: "POST",
        body: { type, content, platform, targetRegion },
      }),
    getStory: (id) => request(`/api/reports/${id}/story`, { method: "GET" }),
    getDNA: (id, compareWith) => {
      const q = compareWith ? `?compareWith=${encodeURIComponent(compareWith)}` : "";
      return request(`/api/reports/${id}/dna${q}`, { method: "GET" });
    },
  },

  // ─── Trends (ScamPulse) ───
  trends: {
    get: (params = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") query.append(k, v);
      });
      const qStr = query.toString();
      return request(`/api/trends${qStr ? `?${qStr}` : ""}`, { method: "GET" });
    },
    getIndicators: ({ type = "TACTIC", days = 30, limit = 20 } = {}) => {
      const query = new URLSearchParams({ type, days: String(days), limit: String(limit) });
      return request(`/api/trends/indicators?${query.toString()}`, { method: "GET" });
    },
  },

  // ─── Admin Portal ───
  admin: {
    login: ({ email, username, password }) =>
      request("/api/admin/login", { method: "POST", body: { email, username, password } }),
    getStats: () => request("/api/admin/stats", { method: "GET" }),
    getReports: ({ status = "ALL", contentType, riskLevel, page = 1, limit = 20 } = {}) => {
      const query = new URLSearchParams();
      if (status && status !== "ALL") query.append("status", status);
      if (contentType && contentType !== "ALL") query.append("contentType", contentType);
      if (riskLevel && riskLevel !== "ALL") query.append("riskLevel", riskLevel);
      query.append("page", String(page));
      query.append("limit", String(limit));
      return request(`/api/admin/reports?${query.toString()}`, { method: "GET" });
    },
    getQueue: ({ status = "RECEIVED", contentType, riskLevel, page = 1, limit = 20 } = {}) => {
      const query = new URLSearchParams();
      if (status) query.append("status", status);
      if (contentType && contentType !== "ALL") query.append("contentType", contentType);
      if (riskLevel && riskLevel !== "ALL") query.append("riskLevel", riskLevel);
      query.append("page", String(page));
      query.append("limit", String(limit));
      return request(`/api/admin/queue?${query.toString()}`, { method: "GET" });
    },
    getCase: (id) => request(`/api/admin/reports/${id}`, { method: "GET" }),
    reviewReport: (id, { status, rationale, publicSummary, redactions }) =>
      request(`/api/admin/reports/${id}/review`, {
        method: "POST",
        body: { status, rationale, publicSummary, redactions },
      }),
    addNote: (id, content) =>
      request(`/api/admin/reports/${id}/notes`, {
        method: "POST",
        body: { content },
      }),
    compareDNA: (reportA, reportB) => {
      const query = new URLSearchParams({ reportA, reportB });
      return request(`/api/admin/dna/compare?${query.toString()}`, { method: "GET" });
    },
    getPatternRadar: (days = 30) =>
      request(`/api/admin/pattern-radar?days=${days}`, { method: "GET" }),
    getAuditLog: ({ page = 1, limit = 50 } = {}) => {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) });
      return request(`/api/admin/audit?${query.toString()}`, { method: "GET" });
    },
  },

  // ─── Brand Intelligence & Risk Protection ───
  brand: {
    demo: () => request("/api/brand/demo", { method: "GET" }),
    checkName: (candidate, brand) => {
      const q = new URLSearchParams({ candidate, brand }).toString();
      return request(`/api/brand/name-check?${q}`, { method: "GET" });
    },
    scan: ({ brand, url, content }) =>
      request("/api/brand/scan", { method: "POST", body: { brand, url, content } }),
    getProfiles: () => request("/api/brand/profiles", { method: "GET" }),
    getProfile: (id) => request(`/api/brand/profiles/${id}`, { method: "GET" }),
    createProfile: (profile) => request("/api/brand/profiles", { method: "POST", body: profile }),
    updateProfile: (id, profile) => request(`/api/brand/profiles/${id}`, { method: "PUT", body: profile }),
    deleteProfile: (id) => request(`/api/brand/profiles/${id}`, { method: "DELETE" }),
    analyzeSocial: (payload) =>
      request("/api/brand/analyze-social", { method: "POST", body: payload }),
    analyzeApp: (payload) =>
      request("/api/brand/analyze-app", { method: "POST", body: payload }),
    uploadImage: (formData, options = {}) =>
      request("/api/brand/upload-image", { method: "POST", body: formData, ...options }),
    submitCase: ({ assetType, candidate, brand, analysisResult }, options = {}) =>
      request("/api/brand/submit-case", { method: "POST", body: { assetType, candidate, brand, analysisResult }, ...options }),
    getLogoPresets: () => request("/api/brand/logo-check/presets", { method: "GET" }),
    checkLogo: (payloadOrFormData, options = {}) =>
      request("/api/brand/logo-check", { method: "POST", body: payloadOrFormData, ...options }),
  },
};

export default api;
