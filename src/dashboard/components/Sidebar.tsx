import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"connected" | "disconnected">("disconnected");
  const [lastScan, setLastScan] = useState<string>("-");
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalVulns, setTotalVulns] = useState(0);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const [assetsRes, vulnsRes, scanRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/assets/"),
          fetch("http://127.0.0.1:8000/vulnerabilities/"),
          fetch("http://127.0.0.1:8000/scan/last"),
        ]);
        const assets = await assetsRes.json();
        const vulns = await vulnsRes.json();
        const scan = await scanRes.json();
        setBackendStatus("connected");
        setTotalAssets(assets.length);
        setTotalVulns(vulns.length);
        if (scan.startedAt) {
          setLastScan(new Date(scan.startedAt).toLocaleString("el-GR", {
            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
          }));
        }
      } catch {
        setBackendStatus("disconnected");
      }
    };
    checkBackend();
  }, []);

  return (
    <aside className="nex-sidebar">
      <div className="nex-sidebar-header">
        <div className="nex-logo">
          <div className="nex-logo-icon">N</div>
          <span className="nex-logo-text">NEX</span>
        </div>
      </div>

      <nav className="nex-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nex-nav-item active" : "nex-nav-item"}>
          <svg className="nex-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/assets" className={({ isActive }) => isActive ? "nex-nav-item active" : "nex-nav-item"}>
          <svg className="nex-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeWidth="2"/>
          </svg>
          <span>Assets</span>
        </NavLink>

        <NavLink to="/scans" className={({ isActive }) => isActive ? "nex-nav-item active" : "nex-nav-item"}>
          <svg className="nex-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 6v6l4 2" strokeWidth="2" />
          </svg>
          <span>Scans</span>
        </NavLink>

        <NavLink to="/vulnerabilities" className={({ isActive }) => isActive ? "nex-nav-item active" : "nex-nav-item"}>
          <svg className="nex-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
            <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Vulnerabilities</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => isActive ? "nex-nav-item active" : "nex-nav-item"}>
          <svg className="nex-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3" strokeWidth="2" />
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" strokeWidth="2"/>
          </svg>
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="nex-sidebar-footer" style={{ position: "relative" }}>
        {/* System Info Popup */}
        {showInfo && (
          <div style={{
            position: "absolute",
            bottom: "150px",
            left: "12px",
            right: "12px",
            background: "rgba(10,14,26,0.98)",
            border: "1px solid rgba(0,255,255,0.2)",
            borderRadius: "10px",
            padding: "16px",
            zIndex: 1000,
            boxShadow: "0 -8px 24px rgba(0,0,0,0.4)"
          }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "12px" }}>
              System Status
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Backend</span>
                <span style={{ color: backendStatus === "connected" ? "#22c55e" : "#ef4444" }}>
                  ● {backendStatus === "connected" ? "Connected" : "Disconnected"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Total Assets</span>
                <span style={{ color: "#00d9ff" }}>{totalAssets}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Vulnerabilities</span>
                <span style={{ color: "#f97316" }}>{totalVulns}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Last Scan</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>{lastScan}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Version</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>v1.0.0</span>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "12px", paddingTop: "12px" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  width: "100%", padding: "8px", background: "rgba(0,217,255,0.1)",
                  border: "1px solid rgba(0,217,255,0.3)", borderRadius: "6px",
                  color: "#00d9ff", cursor: "pointer", fontSize: "12px", fontWeight: 600
                }}
              >
                🔄 Refresh App
              </button>
            </div>
          </div>
        )}

        {/* User Button */}
        <div
          className="nex-user"
          onClick={() => setShowInfo(!showInfo)}
          style={{ cursor: "pointer", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
            <div className="nex-user-avatar">A</div>
            <div className="nex-user-info" style={{ flex: 1 }}>
              <div className="nex-user-name">Admin</div>
              <div className="nex-user-role">Administrator</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)">
              <polyline points={showInfo ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} strokeWidth="2"/>
            </svg>
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", paddingLeft: "2px", lineHeight: "1.6" }}>
            <div>NEX Platform v1.0.0</div>
            <div>Backend: 127.0.0.1:8000</div>
            <div style={{ color: backendStatus === "connected" ? "rgba(0,217,255,0.6)" : "rgba(239,68,68,0.6)" }}>
              ● {backendStatus === "connected" ? "Connected" : "Disconnected"}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;