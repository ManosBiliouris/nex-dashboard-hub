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

interface MLPrediction {
  predicted_risk: string;
  compromise_probability: number;
  confidence: number;
  probabilities: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<AssetDetail | null>(null);
  const [vulns, setVulns] = useState<VulnDetail[]>([]);
  const [mlPrediction, setMlPrediction] = useState<MLPrediction | null>(null);
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

        const mlRes = await fetch(`http://127.0.0.1:8000/ml/predict/${id}`);
        const mlData = await mlRes.json();
        if (mlData.ml_prediction) {
          setMlPrediction(mlData.ml_prediction);
        }
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

      {/* Asset Information */}
      <div className="nex-card" style={{ marginBottom: "1.5rem", padding: "1.5rem" }}>
        <h3 className="nex-card-title">Asset Information</h3>
        <table className="nex-table" style={{ marginTop: "1rem" }}>
          <tbody>
            <tr><td style={{ color: "rgba(255,255,255,0.55)" }}>IP Address</td><td className="nex-mono">{asset.ip}</td></tr>
            <tr><td style={{ color: "rgba(255,255,255,0.55)" }}>Port</td><td className="nex-mono">{asset.port}</td></tr>
            <tr><td style={{ color: "rgba(255,255,255,0.55)" }}>Service</td><td>{asset.service || "-"}</td></tr>
            <tr><td style={{ color: "rgba(255,255,255,0.55)" }}>Organization</td><td>{asset.org || "-"}</td></tr>
            <tr><td style={{ color: "rgba(255,255,255,0.55)" }}>Status</td><td><span className={`nex-status status-${asset.status}`}>{asset.status}</span></td></tr>
            <tr><td style={{ color: "rgba(255,255,255,0.55)" }}>Discovered via</td><td style={{ textTransform: "uppercase" }}>{asset.source}</td></tr>
          </tbody>
        </table>
      </div>

      {/* ML Prediction */}
      {mlPrediction && (
        <div className="nex-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 className="nex-card-title">🤖 ML Risk Prediction</h3>
          <div className="nex-stats-grid" style={{ marginTop: "1rem" }}>
            <div className="nex-stat-card">
              <div className="nex-stat-content">
                <div className="nex-stat-value" style={{ color: getRiskColor(mlPrediction.predicted_risk), textTransform: "capitalize" }}>
                  {mlPrediction.predicted_risk}
                </div>
                <div className="nex-stat-label">Predicted Risk</div>
              </div>
            </div>
            <div className="nex-stat-card">
              <div className="nex-stat-content">
                <div className="nex-stat-value" style={{ color: mlPrediction.compromise_probability > 50 ? "#ef4444" : "#eab308" }}>
                  {mlPrediction.compromise_probability}%
                </div>
                <div className="nex-stat-label">Compromise Probability</div>
              </div>
            </div>
            <div className="nex-stat-card">
              <div className="nex-stat-content">
                <div className="nex-stat-value">{mlPrediction.confidence}%</div>
                <div className="nex-stat-label">Model Confidence</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "12px" }}>Risk Distribution</div>
            {Object.entries(mlPrediction.probabilities).map(([level, prob]) => (
              <div key={level} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "60px", fontSize: "12px", color: "rgba(255,255,255,0.6)", textTransform: "capitalize" }}>{level}</div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "8px" }}>
                  <div style={{
                    width: `${prob}%`,
                    height: "100%",
                    borderRadius: "4px",
                    background: level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e",
                    transition: "width 0.3s ease"
                  }} />
                </div>
                <div style={{ width: "40px", fontSize: "12px", color: "rgba(255,255,255,0.6)", textAlign: "right" }}>{prob}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  <td><span className="nex-status">{v.status}</span></td>
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