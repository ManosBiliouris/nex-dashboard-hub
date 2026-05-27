import { useEffect, useState } from "react";
import { Vulnerability } from "../types";
import VulnerabilitiesTable from "../components/tables/VulnerabilitiesTable";
import "../styles/pages.css";

interface RawVulnerability {
  id: string;
  cve?: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  cvssScore?: number;
  asset_id: string;
  status: "open" | "in-progress" | "resolved" | "false-positive";
  source: string;
  remediation?: string;
}

const Vulnerabilities = () => {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const loadVulnerabilities = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/vulnerabilities/");
      const data: RawVulnerability[] = await res.json();

      const formatted: Vulnerability[] = data.map((v) => ({
        id: v.id,
        cve: v.cve,
        title: v.title,
        description: v.description,
        severity: v.severity,
        cvssScore: v.cvssScore ?? 0,
        affectedAssets: [v.asset_id],
        discoveredAt: new Date().toISOString(),
        status: v.status,
        source: v.source,
        remediation: v.remediation,
      }));

      setVulnerabilities(formatted);
    } catch (error) {
      console.error("Error loading vulnerabilities:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVulnerabilities();
  }, []);

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    if (filter === "all") return true;
    return vuln.severity === filter;
  });

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Vulnerabilities</h2>
        <p className="nex-page-description">Track and remediate security vulnerabilities</p>
      </div>

      <div className="nex-toolbar">
        <button className="nex-btn-secondary" onClick={loadVulnerabilities}>
          Refresh
        </button>
        <div className="nex-filters">
          {["all", "critical", "high", "medium", "low"].map((f) => (
            <button
              key={f}
              className={`nex-btn-secondary ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="nex-card"><div className="nex-loading">Loading vulnerabilities...</div></div>
      ) : filteredVulnerabilities.length > 0 ? (
        <VulnerabilitiesTable vulnerabilities={filteredVulnerabilities} />
      ) : (
        <div className="nex-card">
          <div className="nex-empty-state large">
            <h3>No Vulnerabilities Found</h3>
            <p>Run a scan first to detect vulnerabilities</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vulnerabilities;