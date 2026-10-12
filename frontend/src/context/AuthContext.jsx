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
    const saved = localStorage.getItem("st_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── Google Login ──────────────────────────────────────────
  const loginGoogle = async (credential) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogle(credential);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem("st_user", JSON.stringify(res.user));
        localStorage.setItem("st_token", res.accessToken);
      } else {
        setError(res.message || "Google login failed");
      }
      return res;
    } catch (err) {
      setError(err.message || "Google login failed");
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
        setUser(res.user);
        localStorage.setItem("st_user", JSON.stringify(res.user));
        localStorage.setItem("st_token", res.accessToken);
      } else {
        setError(res.message || "Login failed");
      }
      return res;
    } catch (err) {
      setError(err.message || "Login failed");
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
        setUser(res.user);
        localStorage.setItem("st_user", JSON.stringify(res.user));
        localStorage.setItem("st_token", res.accessToken);
      } else {
        setError(res.message || "Registration failed");
      }
      return res;
    } catch (err) {
      setError(err.message || "Registration failed");
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
      setUser(null);
      localStorage.removeItem("st_user");
      localStorage.removeItem("st_token");
    } catch (err) {
      setError(err.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // ─── Revalidate on mount ───────────────────────────────────
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res && res.success && res.user) {
          setUser(res.user);
          localStorage.setItem("st_user", JSON.stringify(res.user));
        } else {
          setUser(null);
          localStorage.removeItem("st_user");
          localStorage.removeItem("st_token");
        }
      } catch {
        setUser(null);
        localStorage.removeItem("st_user");
        localStorage.removeItem("st_token");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, loginGoogle, loginEmail, registerEmail, logoutUser, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
