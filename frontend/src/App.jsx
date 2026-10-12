import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute, { AdminRoute } from "./components/ProtectedRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import SocialCheckPage from "./pages/SocialCheckPage";
import AppCheckPage from "./pages/AppCheckPage";
import BrandMonitorPage from "./pages/BrandMonitorPage";
import CheckPage from "./pages/CheckPage";
import ReportPage from "./pages/ReportPage";
import CommunityPage from "./pages/CommunityPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import DamageControlPage from "./pages/DamageControlPage";
import ScamPulsePage from "./pages/ScamPulsePage";
import LogoCheckPage from "./pages/LogoCheckPage";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Portal Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./components/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "396900478562-4ls0klbt9kqe2kns0iddnn8tvdg21sl0.apps.googleusercontent.com";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ─── Public Portal Routes ─── */}
            <Route path="/" element={<HomePage />} />
            <Route path="/social-check" element={<SocialCheckPage />} />
            <Route path="/app-check" element={<AppCheckPage />} />
            <Route path="/logo-check" element={<LogoCheckPage />} />
            <Route path="/brand-monitor" element={<BrandMonitorPage />} />
            <Route path="/check" element={<CheckPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/reports/:id" element={<ReportDetailPage />} />
            <Route path="/damage-control" element={<DamageControlPage />} />
            <Route path="/pulse" element={<ScamPulsePage />} />

            {/* ─── Authentication Routes (Direct to Admin Portal) ─── */}
            <Route path="/login" element={<Navigate to="/admin/login" replace />} />
            <Route path="/register" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            {/* ─── Admin Portal Routes (Protected) ─── */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
            </Route>

            {/* ─── Legacy Analyst Route Redirect ─── */}
            <Route path="/analyst/*" element={<Navigate to="/admin/login" replace />} />

            {/* ─── Fallback ─── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
