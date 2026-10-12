import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Portal Pages (Protect)
import HomePage from "./pages/HomePage";
import CheckPage from "./pages/CheckPage";
import ReportPage from "./pages/ReportPage";
import CommunityPage from "./pages/CommunityPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import DamageControlPage from "./pages/DamageControlPage";
import ScamPulsePage from "./pages/ScamPulsePage";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Analyst Portal Pages (Intelligence Desk)
import AnalystLayout from "./components/AnalystLayout";
import AnalystOverview from "./pages/analyst/AnalystOverview";
import AnalystQueuePage from "./pages/analyst/AnalystQueuePage";
import AnalystCasePage from "./pages/analyst/AnalystCasePage";
import AnalystDNAPage from "./pages/analyst/AnalystDNAPage";
import AnalystGraphPage from "./pages/analyst/AnalystGraphPage";
import AnalystRadarPage from "./pages/analyst/AnalystRadarPage";
import AnalystAuditPage from "./pages/analyst/AnalystAuditPage";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "396900478562-4ls0klbt9kqe2kns0iddnn8tvdg21sl0.apps.googleusercontent.com";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ─── Portal A: SCAMTRACE Protect (Public) ─── */}
            <Route path="/" element={<HomePage />} />
            <Route path="/check" element={<CheckPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/reports/:id" element={<ReportDetailPage />} />
            <Route path="/damage-control" element={<DamageControlPage />} />
            <Route path="/pulse" element={<ScamPulsePage />} />

            {/* ─── Authentication Routes ─── */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            {/* ─── Portal B: SCAMTRACE Intelligence Desk (Restricted Analyst) ─── */}
            <Route
              path="/analyst"
              element={
                <ProtectedRoute requiredRoles={["ANALYST", "ADMIN"]}>
                  <AnalystLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AnalystOverview />} />
              <Route path="queue" element={<AnalystQueuePage />} />
              <Route path="cases/:id" element={<AnalystCasePage />} />
              <Route path="dna" element={<AnalystDNAPage />} />
              <Route path="graph" element={<AnalystGraphPage />} />
              <Route path="radar" element={<AnalystRadarPage />} />
              <Route path="audit" element={<AnalystAuditPage />} />
            </Route>

            {/* ─── Fallback ─── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
