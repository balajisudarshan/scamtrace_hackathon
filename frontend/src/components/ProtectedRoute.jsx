import { Navigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function ProtectedRoute({ children, requiredRoles = null }) {
  const { user, loading, loginEmail } = useAuth();

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: "100vh", background: "#0B1020" }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return (
      <div
        className="flex-center"
        style={{
          minHeight: "100vh",
          background: "#0B1020",
          color: "#F8FAFC",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            background: "#11182B",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 16,
            padding: 32,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.15)",
              color: "#EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <ShieldAlert size={30} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            Restricted Access
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            The SCAMTRACE Intelligence Desk requires authorized <strong>Analyst</strong> or{" "}
            <strong>Admin</strong> credentials. Your current account role is{" "}
            <code style={{ background: "#1E293B", padding: "2px 6px", borderRadius: 4 }}>
              {user.role || "PUBLIC"}
            </code>
            .
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={async () => {
                try {
                  await loginEmail("analyst@scamtrace.dev", "analyst123");
                } catch (_) {}
              }}
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span>⚡ Switch to Analyst Mode</span>
            </button>
            <Link
              to="/"
              className="btn btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <ArrowLeft size={16} /> Return to Public Protect
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
