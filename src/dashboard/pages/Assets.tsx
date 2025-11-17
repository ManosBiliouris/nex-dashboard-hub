import "../styles/pages.css";

const Assets = () => {
  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Assets</h2>
        <p className="nex-page-description">Manage and monitor all your digital assets</p>
      </div>

      <div className="nex-toolbar">
        <button className="nex-btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2"/>
            <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2"/>
          </svg>
          Add Asset
        </button>
        <div className="nex-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" strokeWidth="2"/>
          </svg>
          <input type="text" placeholder="Search assets..." />
        </div>
      </div>

      <div className="nex-card">
        <div className="nex-empty-state large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeWidth="2"/>
          </svg>
          <h3>No Assets Found</h3>
          <p>Start by adding your first asset to begin monitoring</p>
        </div>
      </div>
    </div>
  );
};

export default Assets;
