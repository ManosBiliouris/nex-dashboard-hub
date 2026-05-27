import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pages.css";
import "../styles/tables.css";

interface AssetDetail {
  id: string;
  ip: string;
  port: number;
  org: string;
  service: string;
  status: "online" | "offline" | "unknown";
  risk_score: number;
  risk_level: string;
  source: string;
  vulnerabilityCount: number;
}

interface VulnDetail {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  source: string;
}

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<AssetDetail | null>(null);
  const [vulns, setVulns] = useState<VulnDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const assetRes = await fetch(`http://127.0.0.1:8000/assets/${id}`);
        const assetData: AssetDetail = await assetRes.json();
        setAsset(assetData);

        const vulnRes = await fetch("http://127.0.0.1:8000/vulnerabilities/");
        const vulnData: VulnDetail[] = await vulnRes.json();
        setVulns(vulnData.filter((v) => v.id.includes(id ?? "")));
      } catch (error) {
        console.error("AssetDetails Error:", error);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) {
    return <div className="nex-page"><div className="nex-loading">Loading asset data...</div></div>;
  }

  if (!asset || "error" in (asset as object)) {
    return (
      <div className="nex-page">
        <div className="nex-page-header">
          <button className="nex-btn-secondary" onClick={() => navigate("/assets")}>← Back</button>
        </div>
        <div className="nex-card">
          <div className="nex-empty-state large">
            <h3>Asset Not Found</h3>
            <p>This asset may no longer exist. Run a new scan.</p>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    if (level === "critical") return "#ef4444";
    if (level === "high") return "#f97316";
    if (level === "medium") return "#eab308";
    return "#22c55e";
  };

  return (
    <div className="nex-page">
      <div className="nex-page-header" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button className="nex-btn-secondary" onClick={() => navigate("/assets")}>
          ← Back
        </button>
        <div>
          <h2 className="nex-page-heading">{asset.org || asset.ip}</h2>
          <p className="nex-page-description">{asset.ip}:{asset.port} — {asset.service}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="nex-stats-grid" style={{ marginBottom: "1.5rem" }}>
        <div className="nex-stat-card">
          <div className="nex-stat-content">
            <div className="nex-stat-value" style={{ color: getRiskColor(asset.risk_level) }}>
              {asset.risk_score}
            </div>
            <div className="nex-stat-label">Risk Score</div>
          </div>
        </div>
        <div className="nex-stat-card">
          <div className="nex-stat-content">
            <div className="nex-stat-value" style={{ color: getRiskColor(asset.risk_level), textTransform: "capitalize" }}>
              {asset.risk_level}
            </div>
            <div className="nex-stat-label">Risk Level</div>
          </div>
        </div>
        <div className="nex-stat-card">
          <div className="nex-stat-content">
            <div className="nex-stat-value">{asset.port}</div>
            <div className="nex-stat-label">Port</div>
          </div>
        </div>
        <div className="nex-stat-card">
          <div className="nex-stat-content">
            <div className="nex-stat-value" style={{ fontSize: "1rem", textTransform: "uppercase" }}>
              {asset.source}
            </div>
            <div className="nex-stat-label">Source</div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="nex-card" style={{ marginBottom: "1.5rem", padding: "1.5rem" }}>
        <h3 className="nex-card-title">Asset Information</h3>
        <table className="nex-table" style={{ marginTop: "1rem" }}>
          <tbody>
            <tr><td style={{ color: "var(--text-muted)" }}>IP Address</td><td className="nex-mono">{asset.ip}</td></tr>
            <tr><td style={{ color: "var(--text-muted)" }}>Port</td><td className="nex-mono">{asset.port}</td></tr>
            <tr><td style={{ color: "var(--text-muted)" }}>Service</td><td>{asset.service || "-"}</td></tr>
            <tr><td style={{ color: "var(--text-muted)" }}>Organization</td><td>{asset.org || "-"}</td></tr>
            <tr><td style={{ color: "var(--text-muted)" }}>Status</td><td><span className={`nex-status status-${asset.status}`}>{asset.status}</span></td></tr>
            <tr><td style={{ color: "var(--text-muted)" }}>Discovered via</td><td style={{ textTransform: "uppercase" }}>{asset.source}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Vulnerabilities */}
      <div className="nex-card" style={{ padding: "1.5rem" }}>
        <h3 className="nex-card-title">Vulnerabilities ({vulns.length})</h3>
        {vulns.length === 0 ? (
          <div className="nex-empty-state" style={{ padding: "2rem" }}>
            <p>No vulnerabilities detected for this asset.</p>
          </div>
        ) : (
          <table className="nex-table" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {vulns.map((v) => (
                <tr key={v.id}>
                  <td>{v.title}</td>
                  <td><span className={`nex-badge ${v.severity}`}>{v.severity}</span></td>
                  <td><span className={`nex-status`}>{v.status}</span></td>
                  <td>{v.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssetDetails;