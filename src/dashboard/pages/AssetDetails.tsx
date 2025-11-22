import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Asset } from "../types";
import "../styles/asset-details.css";

const AssetDetails = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAsset = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/mock/asset?id=${id}`
        );
        const data = await res.json();
        setAsset(data.asset);
      } catch (error) {
        console.error("Failed to load asset:", error);
      }
      setLoading(false);
    };

    loadAsset();
  }, [id]);

  if (loading) {
    return (
      <div className="nex-page">
        <div className="nex-card">
          <div className="nex-loading">Loading asset...</div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="nex-page">
        <div className="nex-card">
          <h3>Asset not found</h3>
          <Link className="nex-btn-secondary" to="/assets">
            Back to Assets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-asset-title">{asset.name}</h2>
        <p className="nex-asset-subtitle">Detailed security information</p>
      </div>

      <div className="nex-asset-card">
        <h3 className="nex-section-title">Asset Overview</h3>

        <div className="nex-asset-grid">
          <div className="nex-asset-field">
            <p>
              <b>ID:</b> {asset.id}
            </p>
            <p>
              <b>Type:</b> {asset.type}
            </p>
            <p>
              <b>Status:</b> {asset.status}
            </p>
            <p>
              <b>Risk Score:</b> {asset.riskScore}
            </p>
          </div>

          <div className="nex-asset-field">
            <p>
              <b>IP Address:</b> {asset.ip}
            </p>
            <p>
              <b>Port:</b> {asset.port}
            </p>
            <p>
              <b>Service:</b> {asset.service}
            </p>
            <p>
              <b>Last Seen:</b> {new Date(asset.lastSeen).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <Link className="nex-btn-secondary nex-back-btn" to="/assets">
        ← Back to Assets
      </Link>
    </div>
  );
};

export default AssetDetails;
