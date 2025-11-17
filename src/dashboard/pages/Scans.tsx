import { useEffect, useState } from "react";
import { getScans } from "../services/mockData";
import { Scan } from "../types";
import ScansTable from "../components/tables/ScansTable";
import "../styles/pages.css";

const Scans = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const loadScans = async () => {
      setLoading(true);
      const data = await getScans();
      setScans(data);
      setLoading(false);
    };
    loadScans();
  }, []);

  const filteredScans = scans.filter(scan => {
    if (filter === 'all') return true;
    if (filter === 'active') return scan.status === 'running';
    if (filter === 'completed') return scan.status === 'completed';
    return true;
  });

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Security Scans</h2>
        <p className="nex-page-description">Schedule and review security scanning operations</p>
      </div>

      <div className="nex-toolbar">
        <button className="nex-btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" strokeWidth="2"/>
          </svg>
          Start Scan
        </button>
        <div className="nex-filters">
          <button 
            className={`nex-btn-secondary ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Scans
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 6v6l4 2" strokeWidth="2"/>
            </svg>
            <h3>No Scans Found</h3>
            <p>No scans match the current filter</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scans;
