import "../styles/pages.css";

const Dashboard = () => {
  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Dashboard Overview</h2>
        <p className="nex-page-description">Monitor your security posture in real-time</p>
      </div>

      <div className="nex-stats-grid">
        <div className="nex-stat-card">
          <div className="nex-stat-icon critical">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
            </svg>
          </div>
          <div className="nex-stat-content">
            <div className="nex-stat-value">24</div>
            <div className="nex-stat-label">Critical Issues</div>
          </div>
        </div>

        <div className="nex-stat-card">
          <div className="nex-stat-icon warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth="2"/>
              <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2"/>
            </svg>
          </div>
          <div className="nex-stat-content">
            <div className="nex-stat-value">156</div>
            <div className="nex-stat-label">Active Scans</div>
          </div>
        </div>

        <div className="nex-stat-card">
          <div className="nex-stat-icon success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeWidth="2"/>
            </svg>
          </div>
          <div className="nex-stat-content">
            <div className="nex-stat-value">2,847</div>
            <div className="nex-stat-label">Total Assets</div>
          </div>
        </div>

        <div className="nex-stat-card">
          <div className="nex-stat-icon info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeWidth="2"/>
            </svg>
          </div>
          <div className="nex-stat-content">
            <div className="nex-stat-value">98.2%</div>
            <div className="nex-stat-label">Security Score</div>
          </div>
        </div>
      </div>

      <div className="nex-content-grid">
        <div className="nex-card">
          <h3 className="nex-card-title">Recent Vulnerabilities</h3>
          <div className="nex-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
            </svg>
            <p>No recent vulnerabilities detected</p>
          </div>
        </div>

        <div className="nex-card">
          <h3 className="nex-card-title">Scan Activity</h3>
          <div className="nex-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 6v6l4 2" strokeWidth="2"/>
            </svg>
            <p>No active scans running</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
