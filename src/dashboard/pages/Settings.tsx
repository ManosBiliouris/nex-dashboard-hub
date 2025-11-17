import "../styles/pages.css";

const Settings = () => {
  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Settings</h2>
        <p className="nex-page-description">Configure your security dashboard preferences</p>
      </div>

      <div className="nex-settings-grid">
        <div className="nex-card">
          <h3 className="nex-card-title">General Settings</h3>
          <div className="nex-settings-section">
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">Dashboard Name</div>
                <div className="nex-setting-description">Customize your dashboard display name</div>
              </div>
              <input type="text" className="nex-input" value="NEX Security" readOnly />
            </div>
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">Time Zone</div>
                <div className="nex-setting-description">Set your preferred time zone</div>
              </div>
              <select className="nex-input">
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="nex-card">
          <h3 className="nex-card-title">Notifications</h3>
          <div className="nex-settings-section">
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">Email Alerts</div>
                <div className="nex-setting-description">Receive email notifications for critical events</div>
              </div>
              <label className="nex-toggle">
                <input type="checkbox" defaultChecked />
                <span className="nex-toggle-slider"></span>
              </label>
            </div>
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">Scan Reports</div>
                <div className="nex-setting-description">Get weekly scan summary reports</div>
              </div>
              <label className="nex-toggle">
                <input type="checkbox" defaultChecked />
                <span className="nex-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="nex-card">
          <h3 className="nex-card-title">Security</h3>
          <div className="nex-settings-section">
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">Two-Factor Authentication</div>
                <div className="nex-setting-description">Add an extra layer of security</div>
              </div>
              <button className="nex-btn-secondary">Enable</button>
            </div>
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">API Keys</div>
                <div className="nex-setting-description">Manage your API access keys</div>
              </div>
              <button className="nex-btn-secondary">Manage</button>
            </div>
          </div>
        </div>
      </div>

      <div className="nex-settings-footer">
        <button className="nex-btn-primary">Save Changes</button>
        <button className="nex-btn-secondary">Reset to Defaults</button>
      </div>
    </div>
  );
};

export default Settings;
