import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Asset, Vulnerability } from "../types";

import "../styles/pages.css";
import "../styles/tables.css";

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState<Asset | null>(null);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const assetRes = await fetch(
          `http://127.0.0.1:8000/api/mock/asset?id=${id}`
        );
        const assetData = await assetRes.json();
        setAsset(assetData.asset);

        const vulnRes = await fetch(
          `http://127.0.0.1:8000/api/mock/vulnerabilities?asset_id=${id}`
        );
        const vulnData = await vulnRes.json();
        setVulnerabilities(vulnData.vulnerabilities);
      } catch (error) {
        console.error("AssetDetails Error:", error);
      }
      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading || !asset) {
    return (
      <div className="nex-page">
        <div className="nex-loading">Loading asset data...</div>
      </div>
    );
  }

  return (
    <div className="nex-page">
      {/* Header */}
      <div className="nex-page-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            className="nex-btn-secondary"
            onClick={() => navigate("/assets")}
          >
            ← Back
          </button>

          <div>
            <h2 className="nex-page-heading">{asset.name}</h2>
            <p className="nex-page-description">
              Detailed asset information and security analysis
            </p>
          </div>
        </div>

        <span className={`nex-status ${asset.status}`}>
          {asset.status.toUpperCase()}
        </span>
      </div>

      {/* Risk Assessment */}
      <div
        className="nex-card"
        style={{ padding: "24px", marginBottom: "32px" }}
      >
        <h3 className="nex-card-title">Risk Assessment</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "rgba(255, 255, 255)",
            }}
          >
            {asset.riskScore}
          </span>

          <div className="nex-count normal">
            {vulnerabilities.length} Vulnerabilities
          </div>
        </div>
        <div className="nex-risk-score">
          <div
            className="nex-risk-fill medium"
            style={{ width: `${asset.riskScore}%` }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          <span>Low Risk</span>
          <span>High Risk</span>
        </div>
      </div>

      {/* Overview + Network + Last Seen */}
      <div className="nex-content-grid">
        <div className="nex-card">
          <h3 className="nex-card-title">Asset Information</h3>

          <table className="nex-table no-hover">
            <tbody>
              <tr>
                <td>ID:</td>
                <td className="nex-mono">{asset.id}</td>
              </tr>
              <tr>
                <td>Type:</td>
                <td>{asset.type.toUpperCase()}</td>
              </tr>
              <tr>
                <td>IP Address:</td>
                <td className="nex-mono">{asset.ip}</td>
              </tr>
              <tr>
                <td>Port:</td>
                <td className="nex-mono">{asset.port}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="nex-card">
          <h3 className="nex-card-title">Network Information</h3>

          <table className="nex-table no-hover">
            <tbody>
              {asset.domain && (
                <tr>
                  <td>Domain:</td>
                  <td>{asset.domain}</td>
                </tr>
              )}

              <tr>
                <td>Service:</td>
                <td>{asset.service || "Unknown"}</td>
              </tr>

              {asset.location && (
                <tr>
                  <td>Location:</td>
                  <td>{asset.location}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="nex-card">
          <h3 className="nex-card-title">Last Activity</h3>

          <table className="nex-table no-hover">
            <tbody>
              <tr>
                <td>Last Seen:</td>
                <td>{new Date(asset.lastSeen).toLocaleString()}</td>
              </tr>

              {asset.tags?.length > 0 && (
                <tr>
                  <td>Tags:</td>
                  <td>
                    {asset.tags.map((t) => (
                      <span key={t} className="nex-badge">
                        {t}
                      </span>
                    ))}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="nex-card">
        <h3 className="nex-card-title">Vulnerabilities</h3>

        {vulnerabilities.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No vulnerabilities found.</p>
        ) : (
          <table className="nex-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Severity</th>
                <th>CVSS</th>
                <th>Status</th>
                <th>Discovered</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilities.map((v) => (
                <tr key={v.id}>
                  <td>{v.title}</td>

                  <td>
                    <span className={`nex-badge ${v.severity}`}>
                      {v.severity.toUpperCase()}
                    </span>
                  </td>

                  <td>{v.cvssScore}</td>

                  <td>{v.status}</td>

                  <td>{new Date(v.discoveredAt).toLocaleDateString()}</td>
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
