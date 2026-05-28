import { useState } from "react";
import "../styles/layout.css";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleExportCSV = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/assets/");
      const assets = await res.json();
      const headers = ["id", "ip", "port", "org", "service", "risk_score", "risk_level", "status"];
      const rows = assets.map((a: Record<string, unknown>) =>
        headers.map((h) => a[h] ?? "").join(",")
      );
      const csv = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "assets.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export failed", e);
    }
    setMenuOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
    setMenuOpen(false);
  };

  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("assets")) return "Assets";
    if (location.pathname.includes("scans")) return "Security Scans";
    if (location.pathname.includes("vulnerabilities")) return "Vulnerabilities";
    if (location.pathname.includes("settings")) return "Settings";
    return "Security Dashboard";
  };

  return (
    <header className="nex-topbar">
      <div className="nex-topbar-left">
        <h1 className="nex-page-title">{getTitle()}</h1>
      </div>
      <div className="nex-topbar-right" style={{ position: "relative" }}>

        {/* Three dots menu */}
        <button
          className="nex-topbar-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          title="Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="1" strokeWidth="2"/>
            <circle cx="12" cy="5" r="1" strokeWidth="2"/>
            <circle cx="12" cy="19" r="1" strokeWidth="2"/>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div style={{
            position: "absolute",
            top: "48px",
            right: "0",
            background: "rgba(10,14,26,0.98)",
            border: "1px solid rgba(0,255,255,0.2)",
            borderRadius: "8px",
            padding: "8px",
            minWidth: "200px",
            zIndex: 1000,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
          }}>
            <button
              onClick={handleRefresh}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", padding: "10px 12px", background: "none",
                border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer",
                borderRadius: "6px", fontSize: "14px", textAlign: "left"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,217,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23 4 23 10 17 10" strokeWidth="2"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" strokeWidth="2"/>
              </svg>
              Refresh Dashboard
            </button>

            <button
              onClick={handleExportCSV}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", padding: "10px 12px", background: "none",
                border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer",
                borderRadius: "6px", fontSize: "14px", textAlign: "left"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,217,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2"/>
                <polyline points="7 10 12 15 17 10" strokeWidth="2"/>
                <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2"/>
              </svg>
              Export Assets CSV
            </button>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "4px 0" }} />

            <button
              onClick={() => { window.location.href = "/dashboard"; setMenuOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                width: "100%", padding: "10px 12px", background: "none",
                border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer",
                borderRadius: "6px", fontSize: "14px", textAlign: "left"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,217,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2"/>
                <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2"/>
              </svg>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;