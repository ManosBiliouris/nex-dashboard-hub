import { useEffect, useState } from "react";
import { Scan } from "../types";
import ScansTable from "../components/tables/ScansTable";
import "../styles/pages.css";

const Scans = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/mock/scans");
      const data = await res.json();
      setScans(data.scans);
      setLoading(false);
    };

    load();
  }, []);

  const filteredScans = scans.filter((scan) => {
    if (filter === "active") return scan.status === "running";
    if (filter === "completed") return scan.status === "completed";
    return true;
  });

  const startMockScan = () => {
    const newId = crypto.randomUUID();

    const newScan: Scan = {
      id: newId,
      name: "Manual Scan",
      type: "FULL",
      status: "running",
      source: "MANUAL",
      progress: Math.floor(Math.random() * 20) + 5, // 5–25%
      findings: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
      duration: "0m",
      targets: 1,
      startedAt: new Date().toISOString(),
    };

    // Add scan at the top
    setScans((prev) => [newScan, ...prev]);

    // Start auto progress
    autoProgressScan(newId);
  };

  const autoProgressScan = (scanId: string) => {
    const interval = setInterval(() => {
      setScans((prev) =>
        prev.map((scan) => {
          if (scan.id !== scanId) return scan;

          // Continue increasing until 100%
          const nextProgress =
            scan.progress + Math.floor(Math.random() * 10) + 5;

          if (nextProgress >= 100) {
            clearInterval(interval);
            return {
              ...scan,
              progress: 100,
              status: "completed",
              findings: {
                critical: Math.floor(Math.random() * 2),
                high: Math.floor(Math.random() * 4),
                medium: Math.floor(Math.random() * 5),
                low: Math.floor(Math.random() * 4),
              },
              duration: `${Math.floor(Math.random() * 1)}h ${Math.floor(
                Math.random() * 59
              )}m`,
            };
          }

          return { ...scan, progress: nextProgress };
        })
      );
    }, 1000);
  };

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Security Scans</h2>
        <p className="nex-page-description">
          Schedule and review security scanning operations
        </p>
      </div>

      {/* Toolbar */}
      <div className="nex-toolbar">
        <button className="nex-btn-primary" onClick={startMockScan}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" strokeWidth="2" />
          </svg>
          Start Scan
        </button>

        <div className="nex-filters">
          <button
            className={`nex-btn-secondary ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Scans
          </button>
          <button
            className={`nex-btn-secondary ${
              filter === "active" ? "active" : ""
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`nex-btn-secondary ${
              filter === "completed" ? "active" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="nex-card">
          <div className="nex-loading">Loading scans...</div>
        </div>
      ) : (
        <ScansTable scans={filteredScans} />
      )}
    </div>
  );
};

export default Scans;
