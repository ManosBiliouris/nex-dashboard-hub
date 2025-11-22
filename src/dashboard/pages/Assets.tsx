import { useEffect, useState } from "react";
import { Asset } from "../types";
import AssetsTable from "../components/tables/AssetsTable";
import "../styles/pages.css";
import { useNavigate } from "react-router-dom";

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [city, setCity] = useState<string>("Ioannina");
  const navigate = useNavigate();

  // ---------------------------------------
  // LOAD ASSETS (Mock City Scan)
  // ---------------------------------------
  const loadAssets = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/mock/scan?city=${city}`
      );

      const data = await res.json();

      // Backend returns: { city: "...", assets: [...] }
      const formatted: Asset[] = data.assets.map((d: Asset) => ({
        id: d.id,
        name: d.name,
        type: d.type,
        ip: d.ip,
        domain: d.domain,
        port: d.port,
        service: d.service,
        location: d.location,
        status: d.status,
        riskScore: d.riskScore,
        vulnerabilityCount: d.vulnerabilityCount,
        lastSeen: d.lastSeen,
        tags: d.tags,
      }));

      setAssets(formatted);
    } catch (error) {
      console.error("API error:", error);
    }

    setLoading(false);
  };

  // Load once on page load
  useEffect(() => {
    loadAssets();
  }, []);

  // ---------------------------------------
  // FILTER LOGIC
  // ---------------------------------------
  const filteredAssets = assets.filter((asset) => {
    if (filter === "all") return true;
    if (filter === "online") return asset.status === "online";
    if (filter === "offline") return asset.status === "offline";
    if (filter === "high-risk") return asset.riskScore >= 70;
    return true;
  });

  return (
    <div className="nex-page">
      {/* HEADER */}
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Assets</h2>
        <p className="nex-page-description">
          Manage and monitor all your digital assets
        </p>
      </div>

      {/* SCAN CITY INPUT */}
      <div
        className="nex-card"
        style={{
          padding: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <input
          className="nex-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city to scan (mock)"
          style={{ flex: "1" }}
        />

        <button className="nex-btn-primary" onClick={loadAssets}>
          Scan City
        </button>
      </div>

      {/* FILTERS */}
      <div className="nex-toolbar">
        <div className="nex-filters">
          <button
            className={`nex-btn-secondary ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Assets ({assets.length})
          </button>

          <button
            className={`nex-btn-secondary ${
              filter === "online" ? "active" : ""
            }`}
            onClick={() => setFilter("online")}
          >
            Online
          </button>

          <button
            className={`nex-btn-secondary ${
              filter === "offline" ? "active" : ""
            }`}
            onClick={() => setFilter("offline")}
          >
            Offline
          </button>

          <button
            className={`nex-btn-secondary ${
              filter === "high-risk" ? "active" : ""
            }`}
            onClick={() => setFilter("high-risk")}
          >
            High Risk
          </button>
        </div>
      </div>

      {/* TABLE OR EMPTY */}
      {loading ? (
        <div className="nex-card">
          <div className="nex-loading">Loading assets...</div>
        </div>
      ) : filteredAssets.length > 0 ? (
        <AssetsTable
          assets={filteredAssets}
          onAssetClick={(asset) => navigate(`/assets/${asset.id}`)}
        />
      ) : (
        <div className="nex-card">
          <div className="nex-empty-state large">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                strokeWidth="2"
              />
            </svg>
            <h3>No Assets Found</h3>
            <p>No assets match the current filter</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;
