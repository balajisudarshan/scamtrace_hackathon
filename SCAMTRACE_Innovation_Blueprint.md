# SCAMTRACE — Innovation Blueprint

> **Two connected portals. One evidence-led scam intelligence system.**

**Product concept · UX · Architecture · Demo plan**

---

## At a Glance

- **P0 — Must work:** Check API, explainable evidence, report submission, related reports, analyst review, and safety steps.
- **P1 — Differentiators:** Scam DNA comparison, Scam Story Mode, redaction preview, and report-status timeline.
- **P2 — Stretch goals:** Evidence graph, ScamPulse trends, and Telugu/Hinglish explanations.

Build the end-to-end public-to-analyst workflow before polishing stretch features.

## The Central Difference

Do not build only another AI scam checker. Build a public protection portal that learns from community reports and a separate analyst workspace that turns those reports into explainable, connected evidence. The same report should flow through both portals.

> **Positioning:** SCAMTRACE is an explainable, community-fed scam intelligence workflow—not an oracle that claims to know every scam. Risk signals are indicators, not proof of criminal identity.

Do not build only another AI scam checker. Build a public protection portal that learns from community reports and a separate analyst workspace that turns those reports into explainable, connected evidence. The same report should flow through both portals.

## 1. Executive Summary

The differentiator is the evidence loop: a user submits a report, the system extracts clues, compares those clues with known reports, explains matches and uncertainty, routes the report for review, and updates public intelligence when its status changes.

### Positioning

## 2. Portal A: SCAMTRACE Protect (Public Portal)

Audience: the public, students, families, small businesses and people who need non-technical security guidance.

- Check suspicious SMS, email, URL, social handle or phone number without automatically opening the submitted URL.
- Show a plain-language result with exact evidence, risk signals, uncertainty and practical next steps.
- Scam Story Mode: highlight the persuasion sequence, such as impersonation, urgency, requested action and possible harm.
- Search community reports by phrase, domain, phone number, tactic, platform, date and review status.
- Submit structured scam reports with a preview of what will be public and optional redaction.
- Damage Control Navigator branches on what happened: received only, clicked, entered credentials, shared OTP, installed an app or transferred money.
- Report Status Timeline: show Received, Under Review, Corroborated, Published or Rejected, with safe explanations.
- ScamPulse trend page with date range, source, sample size and last-updated time.
- Correction/appeal flow for people who believe a report is wrong.

## 3. Portal B: SCAMTRACE Intelligence Desk (Analyzer Portal)

Audience: trusted moderators, fraud-response volunteers or authorized analysts. This must be a genuinely separate workspace with server-side role checks.

- Triage queue sorted by recency, severity signals, repeat indicators and review status.
- Evidence Extraction panel: normalized domains, URLs, phone numbers, distinctive phrases, impersonated brands and tactic labels.
- Scam DNA comparison: show the exact overlap between reports, plus important differences.
- Incident Relationship Graph: link reports to shared indicators. Every connection has a clickable explanation.
- Case workspace with notes, evidence references, status, reviewer decision and audit history.
- Verification workflow: New, Under Review, Corroborated, Disputed, Rejected and Published.
- Pattern Radar: recurring tactics, phrases and indicator clusters with time-bounded counts.
- False-positive and appeal controls to correct reports and preserve reviewer reasoning.
- Privacy tools: redact public views, restrict sensitive originals and log access.

## 4. Signature Innovations

### Scam DNA / Connect the Clues

Extract normalized indicators from a new report and compare them with prior reports. Show matched fields, matching snippets, timestamps and differences. Start with deterministic weighted overlap; use embeddings only if time permits. Similarity is not proof of a shared criminal.

### Scam Story Mode

Highlight exact phrases that signal urgency, authority, fear, reward, secrecy or a requested action. Explain each tactic in plain language, grounded in the submitted text.

### Damage Control Navigator

Give different prioritized steps depending on whether the user received a message, clicked, entered credentials, shared an OTP, installed an app or paid. Never ask for the OTP or password.

### Evidence Graph with Explainable Edges

Visualize reports, domains, phone numbers, phrases and tactics. Clicking an edge must answer 'Why are these connected?' using exact shared clues and source reports.

### ScamPulse / Pattern Radar

Show counts over time, repeated phrases, tactic changes and reporting spikes. Say 'increase in submitted reports', not 'confirmed scam surge', unless independently supported.

### Trust and Provenance Layer

Label records as user-submitted, imported, synthetic demo or analyst-reviewed. Display status, source type and review date; include correction and appeal paths.

### Multilingual Explanations

Start with English, then add Telugu or Hinglish examples if feasible. Translate explanations without changing the evidence and test language-specific examples.

### Privacy-First Reporting

Preview what will be public, redact personal details and restrict raw evidence. Collect only what is needed.

### Safe Link Inspection

Analyze URL text offline: spelling/lookalike patterns, punycode, IP-host use, suspicious subdomains, shorteners and known local indicators. Never automatically visit a submitted URL.

### Analyst Feedback Loop

Record why a report was corroborated, disputed or rejected. Use reviewed outcomes to evaluate rules and false positives, not to silently train on unverified submissions.

## 5. The Cross-Portal Evidence Loop

**Stage What happens**

## 1. Submit Public user checks a message or submits a report.

## 2. Extract API normalizes indicators and detects documented rule-based signals.

## 3. Compare Matcher checks prior reports and records exact overlaps.

## 4. Explain Public result shows evidence, uncertainty, related reports and safe next steps.

10\. Review Analyzer queue receives the report according to triage rules.

11\. Decide Authorized reviewer records status, rationale and redactions.

12\. Publish Only an approved safe summary and indicators become public.

13\. Learn Aggregated counts update ScamPulse; provenance and audit history remain.

This loop is the main product story. Two pretty portals that do not share a report lifecycle are just two disconnected mockups.

14\. Screen Map

### Public Portal

- P1 Home: check input, recent reviewed alerts and clear service explanation.
- P2 Check: tabs for message, URL, phone or social handle; privacy notice.
- P3 Analysis Result: risk category, exact evidence, caveat, related reports and next actions.
- P4 Scam Story: phrase-by-phrase persuasion explanation.
- P5 Related Reports: matched clues, report status and differences.
- P6 Report Scam: structured form, redaction preview, consent and receipt.
- P7 Community Intelligence: searchable reports and status filters.
- P8 Damage Control: branch-specific recovery steps and official resource links.
- P9 ScamPulse: trends with time range, source and sample size.
- P10 My Report Status: timeline, correction or appeal.

### Analyzer Portal

- A1 Overview: queue health, workload and data freshness.
- A2 Triage Queue: risk signals, duplicate hints and status filters.
- A3 Case Detail: submitted content, redacted public view, extracted evidence and timeline.
- A4 Scam DNA Compare: side-by-side reports with shared and unique indicators highlighted.
- A5 Relationship Graph: nodes and explainable edges.
- A6 Pattern Radar: repeated phrases/tactics with counts and comparison windows.
- A7 Review & Publish: corroborate, dispute, reject, redact or publish with rationale.
- A8 Audit & Quality: reviewer actions, false-positive feedback and correction history.
15\. Achievable Architecture

Recommended stack: React + Vite + TypeScript, Node.js + Express, PostgreSQL + Prisma. Use a shared component library, but separate portal layouts and authorization boundaries.

- Modules: Authentication/Roles, Check API, Report API, Indicator Extractor, Similarity Matcher, Moderation Workflow, Trend Aggregator and Audit Log.
- Initial matching features: normalized domain/URL, phone number, distinctive phrase, tactic category and time proximity. Keep weights explicit.
- Optional LLM: rewrite already-extracted evidence into simpler language. It must not be the sole source of verdicts or invent matching evidence.
- Candidate tables: User, Report, Indicator, ReportIndicator, MatchEvidence, ReviewDecision, CaseNote, AuditEvent and TrendSnapshot.
- Enforce analyst permissions on the server. Hiding a frontend button is not authorization.
- Seed 20-50 clearly labeled demo records so the project works without live feeds or paid model calls.
- Build deterministic fallback behavior for network/API/model failures.
16\. Explainable Risk Findings

Prefer categories such as Low Signal, Needs Caution or High-Risk Indicators over unsupported certainty. A finding can combine:

- Known indicator matches from a documented dataset.
- URL structure warnings, including lookalike domains or unexpected host patterns.
- Credential, payment, OTP or urgency language in the submitted message.
- Repeated evidence across previously reviewed reports.
- Contradictory or missing signals that reduce confidence.

### Required Result Format

Finding → exact evidence → why it matters → related reports → uncertainty/limitations → recommended next action.

17\. Privacy, Safety and Credibility

- Never ask for or store passwords, OTPs, full card numbers or bank login details.
- Do not automatically open, download or execute submitted URLs.
- Do not publish accusations against named individuals based on unverified reports.
- Separate evidence from inference, and community submissions from analyst-confirmed findings.
- Do not describe a submission spike as a real-world scam surge without supporting evidence.
- Redact personal data before public display; restrict raw evidence and log privileged access.
- Provide correction and appeal mechanisms with an audit trail.
- Inspect licenses, fields, freshness and permitted use before importing any dataset.
18\. 24-Hour Build Plan

**Time Deliverable**

0-2 hours Confirm official challenge criteria, schema, API contracts, team ownership and demo story.

2-6 hours Build navigation, shared design system, public check/report screens and analyzer shell.

6-11 hours Implement report persistence, indicator extraction, rule-based findings and seed data.

11-15 hours Implement Scam DNA matching with exact matched clues and related-report API.

15-18 hours Build analyst case detail, review status workflow and safe public publishing.

18-20 hours Add Scam Story Mode and branch-based Damage Control.

20-22 hours Add graph or ScamPulse only if the core flow is reliable.

22-24 hours Test, deploy, verify public URL, write README, capture screenshots and rehearse pitch.

19\. Priority Matrix

**Priority Build Why**

P0 • Must work Check API, explainable evidence, report submission, related reports, analyst review and safety steps. Proves both portals are one system.

P1 • Differentiator Scam DNA compare, Story Mode, redaction preview and status timeline. Memorable features connected to real behavior.

P2 • Stretch Evidence graph, ScamPulse trends, Telugu/Hinglish explanations. Adds impact only after core functionality works.

Do not fake Live threat feeds, confirmed surge claims, AI accuracy claims or criminal attribution. Unsupported claims damage trust and judging credibility.

20\. Dataset and Demo Strategy

Potential sources to evaluate include the Hugging Face Hinglish/English scam-text dataset, the ealvaradob phishing dataset, the NCSU SMS-phishing dataset, PhishTank and OpenPhish. Treat these as leads, not automatic approvals. Inspect fields, freshness, licenses and usage terms before importing.

### Dataset-To-Feature Mapping: What Each Source Actually Powers

Use the datasets for different jobs. The message dataset helps explain and test suspicious text; the NCSU dataset helps connect campaigns through shared infrastructure. URL feeds provide URL reputation signals, not full message understanding.

**Dataset / source Link Use it for these features What it contributes / limits How to use in SCAMTRACE**

Hinglish & English Scam Text Dataset Open dataset/source

Public Portal: Check a suspicious SMS/message; Scam Story Mode test cases; language-aware example library; positive/negative test set. Text + binary label (benign/scam). Useful for seeded examples and baseline evaluation. The dataset card lists 3,787 examples, but only 35 Hinglish scam and 28 Hinglish benign examples, so do not claim broad Hinglish coverage. Import selected rows into a local SeedMessage table; retain original label, language if available, source URL and import date. Use deterministic indicators/rules first; optional classifier later.

NCSU SMS Phishing Campaign Dataset Open dataset/source

Scam DNA / Connect the Clues; Related Reports; Evidence Graph; Analyzer campaign review; ScamPulse demo trends. Campaigns include URLs, first/last-seen timestamps and message counts; messages include phishing text and destination numbers. Strongest for showing repeated campaign infrastructure. Import phishing_messages.csv and phishing_campaigns.csv into seed tables. Normalize URLs/domains and link messages to campaign IDs. Use shared URL/domain or campaign membership as explainable edges; do not infer a real-world surge from sample counts alone.

PhishTank verified URL database / API Open dataset/source

URL checker: URL reputation lookup; Analyzer evidence panel; corroboration signal for a submitted link. URL-focused reputation source. It does not classify the full SMS or prove that every related message is malicious. API access and limits may vary. For a 24-hour build, prefer a small permitted snapshot or make a backend-only API call with timeout and caching. Store lookup time and source status; gracefully fall back when unavailable.

OpenPhish Community Feed Open dataset/source

URL checker fallback; URL indicator table; optional periodic refresh for Analyzer intelligence. A limited phishing URL feed, not a general-purpose SMS/message dataset. Check current feed terms and update cadence before use. Optional. Import or refresh URLs on the backend, cache results and label source + last-seen/import time. Do not make the demo depend on the feed being reachable.

ealvaradob Phishing Dataset Open dataset/source

### Recommended 24-Hour Implementation Order

1\) Seed a small subset of the Hinglish/English text dataset for message examples and predictable test cases. 2) Seed the NCSU campaign files to power the distinctive Scam DNA connections. 3) Add PhishTank or OpenPhish only as an optional URL corroboration layer after local checks work. 4) Defer the large phishing dataset unless the main workflow is already reliable.

Important: these are different data types, not interchangeable datasets. Text labels support message classification and testing; campaign metadata supports explainable linking; URL feeds support URL reputation. Keep every record tagged as seeded/imported data, and never present seeded records as live community reports or live threat intelligence. Optional URL/website classification experiment; later offline evaluation of phishing URL/site detection. Large dataset; it is not needed for the core public-report-to-analyst workflow and may be costly to download or process during a 24-hour hackathon. Defer unless the core workflow is finished. Use a small documented subset only, and verify fields, license and provenance before import.

- Store source and import date for each imported record or indicator.
- Use synthetic examples for full workflows when licensing or privacy is uncertain.
- Never label synthetic examples as live threat intelligence.
- Test positive and negative examples, including legitimate messages that contain links or urgency.
- Measure basic precision and false positives on a small labeled test set rather than claiming generic AI accuracy.
13\. Judge Demo Script

1\. Open Public Portal and submit a seeded suspicious SMS.

1\. Show three concrete clues and explain why each matters.

1\. Open Scam Story Mode and highlight the urgency and requested action.

1\. Open Related Reports and show two matching indicators plus one meaningful difference.

1\. Switch to Analyzer Portal and open the same report in the review queue.

1\. Use Scam DNA Compare and click a graph edge to reveal its evidence.

1\. Mark the report Under Review or Corroborated, add a rationale and publish a redacted summary.

1\. Return to the public view to show status/provenance change, then open Damage Control for the user's selected situation.

1\. How to Compete Against Teams with Premium AI

- Own the workflow instead of generating more screens. Judges can test behavior; a screenshot cannot prove behavior.
- Make every connection inspectable. A graph with evidence is stronger than a graph that is only decorative.
- Make the two portals share the same underlying case lifecycle.
- Use transparent demo data and reliable deterministic logic so the presentation works without a paid model.
- Spend time on error states, empty states, loading, mobile layout and deployment reliability.
- Prepare one crisp story: suspicious message → clues → connected reports → human review → public warning → tailored action.
- Validate every feature against the official challenge statement and scoring rubric before claiming compliance.
1\. Final Recommendation

Make Scam DNA the flagship innovation and the public-to-analyst feedback loop the central story. Scam Story Mode and Damage Control are the strongest supporting features. Build the graph and ScamPulse only after the end-to-end workflow works.

No idea document can guarantee uniqueness or guarantee a win against every team using Claude Pro. The defensible advantage is a clear evidence-to-action workflow, implemented reliably, tested honestly and demonstrated end to end.
