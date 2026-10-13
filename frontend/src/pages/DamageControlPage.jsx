import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  LifeBuoy,
  MessageSquare,
  ExternalLink,
  KeyRound,
  ShieldAlert,
  Smartphone,
  CreditCard,
  CheckCircle2,
  AlertOctagon,
  PhoneCall,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function DamageControlPage() {
  const [selectedScenario, setSelectedScenario] = useState("message_only");
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (stepKey) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const scenarios = [
    {
      id: "message_only",
      title: "Received a suspicious message only",
      subtitle: "Did not click any link, call, or reply.",
      icon: MessageSquare,
      riskLevel: "LOW",
      urgency: "Preventative",
      summary: "You are currently safe. No interaction occurred that compromises your device or accounts.",
      steps: [
        {
          id: "m1",
          title: "Do not tap any links or reply",
          desc: "Scammers monitor active replies to mark phone numbers as valid targets for future spam campaigns.",
        },
        {
          id: "m2",
          title: "Block and report the sender",
          desc: "Use your messaging app (SMS/WhatsApp) to block and report the contact directly.",
        },
        {
          id: "m3",
          title: "Forward to SCAMTRACE or 1909 (Do Not Disturb)",
          desc: "In India, you can report unsolicited spam SMS to 1909 or submit to SCAMTRACE community intelligence.",
        },
      ],
    },
    {
      id: "clicked_link",
      title: "Clicked a link but entered no details",
      subtitle: "Visited the page, but closed it immediately.",
      icon: ExternalLink,
      riskLevel: "MEDIUM",
      urgency: "Moderate Caution",
      summary: "Your accounts are intact, but the website may have logged your IP or attempted background scripts.",
      steps: [
        {
          id: "c1",
          title: "Close all tabs and browser sessions",
          desc: "Exit the page immediately. Do not interact with popups claiming your phone has viruses.",
        },
        {
          id: "c2",
          title: "Clear browser cache and cookies",
          desc: "Open browser settings and clear browsing data for the last hour to purge persistent tracking cookies.",
        },
        {
          id: "c3",
          title: "Check browser downloads",
          desc: "Ensure no background file (e.g., .apk, .exe, or .dmg) was silently downloaded. If found, delete immediately without opening.",
        },
      ],
    },
    {
      id: "entered_credentials",
      title: "Entered account credentials / passwords",
      subtitle: "Submitted bank login, email password, or card number.",
      icon: KeyRound,
      riskLevel: "HIGH",
      urgency: "Immediate Action Required",
      summary: "The scammer now possesses your login details and will attempt access within minutes.",
      steps: [
        {
          id: "e1",
          title: "Immediately reset your password on the REAL official site",
          desc: "Open a fresh browser tab and visit the authentic website directly (e.g., onlinesbi.sbi or gmail.com). Change your password immediately.",
        },
        {
          id: "e2",
          title: "Force logout all active sessions",
          desc: "In security settings, select 'Log out of all devices' or 'Revoke active sessions'.",
        },
        {
          id: "e3",
          title: "Change passwords on other accounts sharing this password",
          desc: "If you reuse this password on email, social media, or other banking portals, change them immediately.",
        },
        {
          id: "e4",
          title: "Enable Multi-Factor Authentication (2FA)",
          desc: "Switch to an Authenticator App (Google Authenticator) rather than SMS where possible.",
        },
      ],
    },
    {
      id: "shared_otp",
      title: "Shared an OTP with the caller / form",
      subtitle: "Provided an SMS OTP, Aadhaar code, or UPI PIN.",
      icon: ShieldAlert,
      riskLevel: "CRITICAL",
      urgency: "Emergency",
      summary: "An unauthorized transaction or account takeover is likely underway right now.",
      steps: [
        {
          id: "o1",
          title: "Call your bank's 24/7 fraud helpline immediately",
          desc: "Ask the representative to FREEZE net banking, debit cards, and UPI transfers immediately.",
        },
        {
          id: "o2",
          title: "Check your transaction SMS feed",
          desc: "Note down transaction reference numbers (UTR, transaction ID) of any unauthorized debits.",
        },
        {
          id: "o3",
          title: "Dial 1930 (National Cyber Crime Helpline)",
          desc: "In India, call 1930 within the 'Golden Hour' (first 2-3 hours) so nodal officers can coordinate to freeze the beneficiary account.",
        },
      ],
    },
    {
      id: "installed_app",
      title: "Installed an APK or screen-sharing app",
      subtitle: "Downloaded AnyDesk, TeamViewer, RustDesk, or an unknown .apk.",
      icon: Smartphone,
      riskLevel: "CRITICAL",
      urgency: "Emergency",
      summary: "The attacker has remote control or SMS-forwarding malware installed on your phone.",
      steps: [
        {
          id: "i1",
          title: "Turn off Wi-Fi and mobile data IMMEDIATELY",
          desc: "Toggle Airplane Mode on right now to sever the attacker's active remote connection.",
        },
        {
          id: "i2",
          title: "Uninstall the remote access or suspicious application",
          desc: "Go to Settings > Apps, find AnyDesk, TeamViewer QuickSupport, or recently downloaded APKs, and tap Uninstall.",
        },
        {
          id: "i3",
          title: "Revoke Accessibility and Device Admin permissions",
          desc: "Check Settings > Accessibility and remove unknown services.",
        },
        {
          id: "i4",
          title: "Consider a full Factory Reset if malware persists",
          desc: "Back up only essential photos/contacts, then factory reset your device to guarantee elimination of rootkits.",
        },
      ],
    },
    {
      id: "transferred_money",
      title: "Transferred money or made a payment",
      subtitle: "Sent money via UPI, IMPS, RTGS, or credit card.",
      icon: CreditCard,
      riskLevel: "CRITICAL",
      urgency: "Emergency Response",
      summary: "Every minute counts. Cyber nodal officers can freeze recipient wallets if alerted promptly.",
      steps: [
        {
          id: "t1",
          title: "Call 1930 immediately (National Cyber Crime Reporting Portal)",
          desc: "Provide your account number, transaction UTR, beneficiary account/UPI ID, and timestamp.",
        },
        {
          id: "t2",
          title: "Notify your originating bank & beneficiary bank",
          desc: "File a formal written complaint with your home branch and ask for a Chargeback / Lien placement.",
        },
        {
          id: "t3",
          title: "File an official complaint on cybercrime.gov.in",
          desc: "Attach screenshots of chats, payment receipts, and caller numbers to receive a formal FIR acknowledge number.",
        },
      ],
    },
  ];

  const current = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "40px 20px 80px", maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, marginBottom: 8 }}>
            <LifeBuoy size={14} />
            <span>EMERGENCY SAFETY PROTOCOL</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Damage Control Navigator
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 720 }}>
            Stay calm. Select exactly what happened to receive prioritized, step-by-step containment instructions.
            Never share passwords or OTPs with anyone.
          </p>
        </div>

        {/* ─── Emergency Hotlines Banner ─── */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(185, 28, 28, 0.05) 100%)",
            border: "1px solid var(--risk-high-border)",
            borderRadius: "var(--radius-lg)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                background: "var(--risk-high-bg)",
                color: "var(--risk-high)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneCall size={20} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                National Cyber Crime Helpline: Dial 1930
              </div>
              <div style={{ fontSize: 12, color: "var(--risk-high)" }}>
                Available 24x7 across India for immediate financial fraud lien & freeze assistance.
              </div>
            </div>
          </div>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            style={{
              borderColor: "var(--risk-high-border)",
              color: "var(--risk-high)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>Visit cybercrime.gov.in</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* ─── Scenario Selector Pills ─── */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase" }}>
            Step 1: What happened?
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 12,
            }}
          >
            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const active = selectedScenario === sc.id;
              return (
                <div
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc.id)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    background: active ? "var(--surface-card)" : "var(--surface-elevated)",
                    border: active ? "1px solid var(--accent)" : "1px solid var(--surface-border)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      background: active ? "rgba(59, 130, 246, 0.15)" : "var(--surface-card)",
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: active ? "var(--accent)" : "var(--text-primary)" }}>
                      {sc.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                      {sc.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Step 2: Prioritized Action Plan ─── */}
        <div
          className="card"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--surface-border-strong)",
            padding: 24,
          }}
        >
          {/* Scenario Overview */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  background:
                    current.riskLevel === "CRITICAL" || current.riskLevel === "HIGH"
                      ? "var(--risk-high-bg)"
                      : "var(--accent-glow)",
                  color:
                    current.riskLevel === "CRITICAL" || current.riskLevel === "HIGH"
                      ? "var(--risk-high)"
                      : "var(--accent)",
                  marginBottom: 8,
                  display: "inline-block",
                }}
              >
                Urgency: {current.urgency}
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>
                {current.title}
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>
                {current.summary}
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Prioritized Steps to Take Immediately:
            </div>

            {current.steps.map((st, idx) => {
              const checked = Boolean(completedSteps[`${current.id}_${st.id}`]);
              return (
                <div
                  key={st.id}
                  onClick={() => toggleStep(`${current.id}_${st.id}`)}
                  style={{
                    padding: "16px 18px",
                    borderRadius: "var(--radius-md)",
                    background: checked ? "rgba(16, 185, 129, 0.06)" : "var(--bg-subtle)",
                    border: checked
                      ? "1px solid rgba(16, 185, 129, 0.3)"
                      : "1px solid var(--surface-border)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "6px",
                      border: checked ? "1px solid var(--risk-low)" : "1px solid var(--surface-border-strong)",
                      background: checked ? "var(--risk-low)" : "transparent",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {checked && <CheckCircle2 size={14} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: checked ? "var(--risk-low)" : "var(--text-primary)",
                        textDecoration: checked ? "line-through" : "none",
                        marginBottom: 4,
                      }}
                    >
                      {idx + 1}. {st.title}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid var(--surface-border)",
              fontSize: 12,
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            <strong>Disclaimer:</strong> This guidance represents general containment procedures and is not
            a substitute for official law enforcement or your financial institution's authorized security instructions.
            SCAMTRACE does not provide legal representation.
          </div>
        </div>
      </main>
    </div>
  );
}
