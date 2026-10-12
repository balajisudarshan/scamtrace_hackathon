const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Helper to get authorization header from local storage token
 */
export const getAuthToken = () => {
  return localStorage.getItem("st_token") || localStorage.getItem("accessToken") || "";
};

/**
 * Universal request wrapper with error normalization & JSON handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: "include", // send HttpOnly cookies if set
  };

  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  let res;
  try {
    res = await fetch(url, config);
  } catch (err) {
    throw new Error(`Network connection error: ${err.message}. Is backend running at ${API_BASE}?`);
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
    analyze: ({ type, content }) =>
      request("/api/check", { method: "POST", body: { type, content } }),
    analyzeImage: (formData) => {
      const url = `${API_BASE}/api/check/image`;
      const token = getAuthToken();
      return fetch(url, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to analyze screenshot");
        return data;
      });
    },
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

  // ─── Admin / Analyst Portal ───
  admin: {
    getStats: () => request("/api/admin/stats", { method: "GET" }),
    getQueue: ({ status = "RECEIVED", page = 1, limit = 20 } = {}) => {
      const query = new URLSearchParams({ status, page: String(page), limit: String(limit) });
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

  // ─── Brand Intelligence ───
  brand: {
    demo: () => request("/api/brand/demo", { method: "GET" }),
    checkName: (candidate, brand) => {
      const q = new URLSearchParams({ candidate, brand }).toString();
      return request(`/api/brand/name-check?${q}`, { method: "GET" });
    },
    scan: ({ brand, url, content }) =>
      request("/api/brand/scan", { method: "POST", body: { brand, url, content } }),
  },
};

export default api;
