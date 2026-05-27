import { useEffect, useState } from "react";
import { Scan } from "../types";
import ScansTable from "../components/tables/ScansTable";
import "../styles/pages.css";

interface ScanHistoryItem {
  id: string;
  original_query: string;
  assets_found: number;
  shodan_total: number;
  startedAt: string;
}

const Scans = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [scanning, setScanning] = useState(false);

  const loadHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/scan/history");
      const data: ScanHistoryItem[] = await res.json();

      const formatted: Scan[] = data.map((s) => ({
        id: s.id,
        name: s.original_query,
        type: "OSINT",
        status: "completed",
        source: "LLM AGENT",
        progress: 100,
        findings: {
          critical: 0,
          high: Math.floor(s.assets_found * 0.1),
          medium: Math.floor(s.assets_found * 0.3),
          low: Math.floor(s.assets_found * 0.6),
        },
        duration: "< 1m",
        targets: s.assets_found,
        startedAt: s.startedAt,
      }));

      setScans(formatted);
    } catch (error) {
      console.error("Error loading scan history:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadHistory();
      setLoading(false);
    };
    init();
  }, []);

  const runScan = async () => {
    if (!query.trim()) return;
    setScanning(true);

    const tempId = crypto.randomUUID();
    const runningScan: Scan = {
      id: tempId,
      name: query,
      type: "OSINT",
      status: "running",
      source: "LLM AGENT",
      progress: 10,
      findings: { critical: 0, high: 0, medium: 0, low: 0 },
      duration: "...",
      targets: 0,
      startedAt: new Date().toISOString(),
    };

    setScans((prev) => [runningScan, ...prev]);

    let progress = 10;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.floor(Math.random() * 15) + 5, 90);
      setScans((prev) =>
        prev.map((s) => (s.id === tempId ? { ...s, progress } : s))
      );
    }, 800);

    try {
      const res = await fetch("http://127.0.0.1:8000/scan/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: query }),
      });
      const data = await res.json();
      clearInterval(interval);

      const total = data.total_assets || 0;
      const completedScan: Scan = {
        id: tempId,
        name: query,
        type: "OSINT",
        status: "completed",
        source: "LLM AGENT",
        progress: 100,
        findings: {
          critical: 0,
          high: Math.floor(total * 0.1),
          medium: Math.floor(total * 0.3),
          low: Math.floor(total * 0.6),
        },
        duration: "< 1m",
        targets: data.assets_found || 0,
        startedAt: new Date().toISOString(),
      };

      setScans((prev) =>
        prev.map((s) => (s.id === tempId ? completedScan : s))
      );

      // Reload full history
      await loadHistory();
      setQuery("");
    } catch (error) {
      clearInterval(interval);
      console.error("Scan error:", error);
      setScans((prev) =>
        prev.map((s) =>
          s.id === tempId ? { ...s, status: "failed", progress: 0 } : s
        )
      );
    }

    setScanning(false);
  };

  const filteredScans = scans.filter((scan) => {
    if (filter === "active") return scan.status === "running";
    if (filter === "completed") return scan.status === "completed";
    return true;
  });

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Security Scans</h2>
        <p className="nex-page-description">
          Schedule and review security scanning operations
        </p>
      </div>

      <div className="nex-card" style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          className="nex-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g. "εκτεθειμένοι RDP servers στην Ελλάδα"'
          style={{ flex: "1" }}
          onKeyDown={(e) => e.key === "Enter" && runScan()}
        />
        <button className="nex-btn-primary" onClick={runScan} disabled={scanning}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <polygon points="5 3 19 12 5 21 5 3" strokeWidth="2" />
          </svg>
          {scanning ? "Scanning..." : "Start Scan"}
        </button>
      </div>

      <div className="nex-toolbar">
        <div className="nex-filters">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              className={`nex-btn-secondary ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? `All Scans (${scans.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="nex-btn-secondary" onClick={loadHistory}>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="nex-card">
          <div className="nex-loading">Loading scans...</div>
        </div>
      ) : filteredScans.length > 0 ? (
        <ScansTable scans={filteredScans} />
      ) : (
        <div className="nex-card">
          <div className="nex-empty-state large">
            <h3>No Scans Found</h3>
            <p>Run your first scan above</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scans;