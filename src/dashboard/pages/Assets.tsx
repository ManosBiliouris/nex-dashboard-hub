import { useEffect, useState } from "react";
import { Asset } from "../types";
import AssetsTable from "../components/tables/AssetsTable";
import "../styles/pages.css";
import { useNavigate } from "react-router-dom";

interface RawAsset {
  id: string;
  ip: string;
  port: number;
  org: string;
  service: string;
  status: "online" | "offline" | "unknown";
  risk_score: number;
  risk_level: string;
  vulnerabilityCount: number;
  source: string;
}

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/assets/");
      const data: RawAsset[] = await res.json();

      const formatted: Asset[] = data.map((d) => ({
        id: d.id,
        name: d.org || d.ip,
        type: "server",
        ip: d.ip,
        port: d.port,
        service: d.service,
        status: d.status,
        riskScore: d.risk_score,
        vulnerabilityCount: d.vulnerabilityCount,
        lastSeen: new Date().toISOString(),
        tags: [d.source, d.risk_level],
      }));

      setAssets(formatted);
    } catch (error) {
      console.error("API error:", error);
    }
    setLoading(false);
  };

  const runScan = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      await fetch("http://127.0.0.1:8000/scan/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: query }),
      });
      await loadAssets();
    } catch (error) {
      console.error("Scan error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const filteredAssets = assets.filter((asset) => {
    const matchesFilter =
      filter === "online" ? asset.status === "online" :
      filter === "offline" ? asset.status === "offline" :
      filter === "high-risk" ? asset.riskScore >= 50 :
      true;

    const matchesSearch = search.trim() === "" || 
      asset.name?.toLowerCase().includes(search.toLowerCase()) ||
      asset.ip?.toLowerCase().includes(search.toLowerCase()) ||
      asset.service?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Assets</h2>
        <p className="nex-page-description">
          Manage and monitor all your digital assets
        </p>
      </div>

      <div className="nex-card" style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          className="nex-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g. "εκτεθειμένοι Redis servers στην Ελλάδα"'
          style={{ flex: "1" }}
          onKeyDown={(e) => e.key === "Enter" && runScan()}
        />
        <button className="nex-btn-primary" onClick={runScan} disabled={loading}>
          {loading ? "Scanning..." : "Run Scan"}
        </button>
        <button className="nex-btn-secondary" onClick={loadAssets}>
          Refresh
        </button>
      </div>

      <div className="nex-toolbar">
        <input
          className="nex-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, IP, service..."
          style={{ width: "300px" }}
        />
        <div className="nex-filters">
          {["all", "online", "offline", "high-risk"].map((f) => (
            <button
              key={f}
              className={`nex-btn-secondary ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? `All Assets (${assets.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="nex-card"><div className="nex-loading">Loading assets...</div></div>
      ) : filteredAssets.length > 0 ? (
        <AssetsTable assets={filteredAssets} onAssetClick={(asset) => navigate(`/assets/${asset.id}`)} />
      ) : (
        <div className="nex-card">
          <div className="nex-empty-state large">
            <h3>No Assets Found</h3>
            <p>Run a scan to discover assets</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;