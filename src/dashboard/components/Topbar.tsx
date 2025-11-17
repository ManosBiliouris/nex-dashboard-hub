import "../styles/layout.css";

const Topbar = () => {
  return (
    <header className="nex-topbar">
      <div className="nex-topbar-left">
        <h1 className="nex-page-title">Security Dashboard</h1>
      </div>
      <div className="nex-topbar-right">
        <button className="nex-topbar-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2"/>
          </svg>
        </button>
        <button className="nex-topbar-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="1" strokeWidth="2"/>
            <circle cx="12" cy="5" r="1" strokeWidth="2"/>
            <circle cx="12" cy="19" r="1" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
