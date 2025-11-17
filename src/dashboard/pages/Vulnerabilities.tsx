import { useEffect, useState } from "react";
import { getVulnerabilities } from "../services/mockData";
import { Vulnerability } from "../types";
import VulnerabilitiesTable from "../components/tables/VulnerabilitiesTable";
import "../styles/pages.css";

const Vulnerabilities = () => {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const loadVulnerabilities = async () => {
      setLoading(true);
      const data = await getVulnerabilities();
      setVulnerabilities(data);
      setLoading(false);
    };
    loadVulnerabilities();
  }, []);

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    if (filter === 'all') return true;
    return vuln.severity === filter;
  });

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Vulnerabilities</h2>
        <p className="nex-page-description">Track and remediate security vulnerabilities</p>
      </div>

      <div className="nex-toolbar">
        <div className="nex-filters">
          <button 
            className={`nex-btn-secondary ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'critical' ? 'active' : ''}`}
            onClick={() => setFilter('critical')}
          >
            Critical
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'high' ? 'active' : ''}`}
            onClick={() => setFilter('high')}
          >
            High
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'medium' ? 'active' : ''}`}
            onClick={() => setFilter('medium')}
          >
            Medium
          </button>
          <button 
            className={`nex-btn-secondary ${filter === 'low' ? 'active' : ''}`}
            onClick={() => setFilter('low')}
          >
            Low
          </button>
        </div>
      </div>

      {loading ? (
        <div className="nex-card">
          <div className="nex-loading">Loading vulnerabilities...</div>
        </div>
      ) : filteredVulnerabilities.length > 0 ? (
        <VulnerabilitiesTable vulnerabilities={filteredVulnerabilities} />
      ) : (
        <div className="nex-card">
          <div className="nex-empty-state large">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4" strokeWidth="2"/>
            </svg>
            <h3>No Vulnerabilities Found</h3>
            <p>No vulnerabilities match the current filter</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vulnerabilities;
