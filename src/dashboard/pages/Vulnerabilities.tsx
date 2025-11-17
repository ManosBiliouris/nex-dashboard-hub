import "../styles/pages.css";

const Vulnerabilities = () => {
  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Vulnerabilities</h2>
        <p className="nex-page-description">Track and remediate security vulnerabilities</p>
      </div>

      <div className="nex-toolbar">
        <div className="nex-filters">
          <button className="nex-btn-secondary active">All</button>
          <button className="nex-btn-secondary">Critical</button>
          <button className="nex-btn-secondary">High</button>
          <button className="nex-btn-secondary">Medium</button>
          <button className="nex-btn-secondary">Low</button>
        </div>
        <div className="nex-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" strokeWidth="2"/>
          </svg>
          <input type="text" placeholder="Search vulnerabilities..." />
        </div>
      </div>

      <div className="nex-card">
        <div className="nex-empty-state large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" strokeWidth="2"/>
          </svg>
          <h3>No Vulnerabilities Detected</h3>
          <p>Your systems are secure. Run scans to check for new vulnerabilities.</p>
        </div>
      </div>
    </div>
  );
};

export default Vulnerabilities;
