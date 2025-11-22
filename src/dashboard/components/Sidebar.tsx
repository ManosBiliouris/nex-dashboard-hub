import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="nex-sidebar">
      <div className="nex-sidebar-header">
        <div className="nex-logo">
          <div className="nex-logo-icon">N</div>
          <span className="nex-logo-text">NEX</span>
        </div>
      </div>

      <nav className="nex-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nex-nav-item active" : "nex-nav-item"
          }
        >
          <svg
            className="nex-nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/assets"
          className={({ isActive }) =>
            isActive ? "nex-nav-item active" : "nex-nav-item"
          }
        >
          <svg
            className="nex-nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              strokeWidth="2"
            />
          </svg>
          <span>Assets</span>
        </NavLink>

        <NavLink
          to="/scans"
          className={({ isActive }) =>
            isActive ? "nex-nav-item active" : "nex-nav-item"
          }
        >
          <svg
            className="nex-nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path d="M12 6v6l4 2" strokeWidth="2" />
          </svg>
          <span>Scans</span>
        </NavLink>

        <NavLink
          to="/vulnerabilities"
          className={({ isActive }) =>
            isActive ? "nex-nav-item active" : "nex-nav-item"
          }
        >
          <svg
            className="nex-nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              strokeWidth="2"
            />
            <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Vulnerabilities</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nex-nav-item active" : "nex-nav-item"
          }
        >
          <svg
            className="nex-nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="3" strokeWidth="2" />
            <path
              d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"
              strokeWidth="2"
            />
          </svg>
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="nex-sidebar-footer">
        <div className="nex-user">
          <div className="nex-user-avatar">A</div>
          <div className="nex-user-info">
            <div className="nex-user-name">Admin</div>
            <div className="nex-user-role">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
