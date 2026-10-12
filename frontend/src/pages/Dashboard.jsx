import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060b14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
        fontFamily: "Inter, sans-serif",
        color: "#e2e8f0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, margin: "0 0 8px" }}>
          🛡️ ScamTrace Dashboard
        </h1>
        <p style={{ color: "rgba(226,232,240,0.5)", margin: 0 }}>
          Welcome, {user?.firstName || user?.email}!
        </p>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 24px",
          background: "linear-gradient(135deg, #00d4ff, #0066cc)",
          border: "none",
          borderRadius: 10,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Logout
      </button>
    </div>
  );
}
