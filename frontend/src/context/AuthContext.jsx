import { createContext, useState, useEffect } from "react";
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logout,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("st_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveAuthSession = (userData, token) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("st_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("st_user");
    }
    if (token && token !== "undefined" && token !== "null") {
      localStorage.setItem("st_token", token);
      localStorage.setItem("accessToken", token);
    }
  };

  const clearAuthSession = () => {
    setUser(null);
    localStorage.removeItem("st_user");
    localStorage.removeItem("st_token");
    localStorage.removeItem("accessToken");
  };

  // ─── Google Login ──────────────────────────────────────────
  const loginGoogle = async (credential) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogle(credential);
      if (res.success) {
        saveAuthSession(res.user, res.accessToken);
        return res;
      } else {
        setError(res.message || "Google login failed");
        return res;
      }
    } catch (err) {
      setError(err.message || "Google login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ─── Email Login ───────────────────────────────────────────
  const loginEmail = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithEmail(email, password);
      if (res.success) {
        saveAuthSession(res.user, res.accessToken);
        return res;
      } else {
        setError(res.message || "Login failed");
        return res;
      }
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ─── Register ─────────────────────────────────────────────
  const registerEmail = async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerWithEmail(firstName, lastName, email, password);
      if (res.success) {
        saveAuthSession(res.user, res.accessToken);
        return res;
      } else {
        setError(res.message || "Registration failed");
        return res;
      }
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ─── Logout ───────────────────────────────────────────────
  const logoutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
    } catch (_) {
      // ignore server errors during logout
    } finally {
      clearAuthSession();
      setLoading(false);
    }
  };

  // ─── Revalidate on mount ───────────────────────────────────
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("st_token") || localStorage.getItem("accessToken");
      if (!token || token === "undefined" || token === "null") {
        setLoading(false);
        return;
      }
      try {
        const res = await getCurrentUser();
        if (res && res.success && res.user) {
          const role = res.user.role || "PUBLIC";
          const updated = { ...res.user, role };
          saveAuthSession(updated);
        } else {
          clearAuthSession();
        }
      } catch (err) {
        if (err.status === 401 || err.status === 403) {
          clearAuthSession();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const isAnalyst = Boolean(
    user && (user.role === "ANALYST" || user.role === "ADMIN")
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAnalyst,
        loginGoogle,
        loginEmail,
        registerEmail,
        logoutUser,
        setError,
        saveAuthSession,
        clearAuthSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
