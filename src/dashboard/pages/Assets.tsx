import { useEffect, useState } from "react";
import { getAssets } from "../services/mockData";
import { Asset } from "../types";
import AssetsTable from "../components/tables/AssetsTable";
import "../styles/pages.css";

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true);
      const data = await getAssets();
      setAssets(data);
      setLoading(false);
    };
    loadAssets();
  }, []);

  const filteredAssets = assets.filter(asset => {
    if (filter === 'all') return true;
    if (filter === 'online') return asset.status === 'online';
    if (filter === 'offline') return asset.status === 'offline';
    if (filter === 'high-risk') return asset.riskScore >= 70;
    return true;
  });

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Assets</h2>
        <p className="nex-page-description">Manage and monitor all your digital assets</p>
      </div>

      <div className="nex-toolbar">
        <div className="nex-filters">
          <button 
            className={`nex-btn-secondary ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Assets ({assets.length})
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'online' ? 'active' : ''}`}
            onClick={() => setFilter('online')}
          >
            Online
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'offline' ? 'active' : ''}`}
            onClick={() => setFilter('offline')}
          >
            Offline
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'high-risk' ? 'active' : ''}`}
            onClick={() => setFilter('high-risk')}
          >
            High Risk
          </button>
        </div>
        <button className="nex-btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2"/>
            <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2"/>
          </svg>
          Add Asset
        </button>
      </div>

      {loading ? (
        <div className="nex-card">
          <div className="nex-loading">Loading assets...</div>
        </div>
      ) : filteredAssets.length > 0 ? (
        <AssetsTable assets={filteredAssets} />
      ) : (
        <div className="nex-card">
          <div className="nex-empty-state large">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeWidth="2"/>
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
