import "../styles/pages.css";

const Scans = () => {
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
          <button className="nex-btn-secondary">All Scans</button>
          <button className="nex-btn-secondary">Active</button>
          <button className="nex-btn-secondary">Completed</button>
        </div>
      </div>

      <div className="nex-card">
        <div className="nex-empty-state large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M12 6v6l4 2" strokeWidth="2"/>
          </svg>
          <h3>No Scans Configured</h3>
          <p>Create your first security scan to identify vulnerabilities</p>
        </div>
      </div>
    </div>
  );
};

export default Scans;
