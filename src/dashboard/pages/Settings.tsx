import { useState } from "react";
import "../styles/pages.css";

interface ApiKeys {
  shodan: string;
  zoomeye: string;
  fofa_email: string;
  fofa_key: string;
  groq: string;
}

const Settings = () => {
  const [keys, setKeys] = useState<ApiKeys>({
    shodan: "••••••••••••••••",
    zoomeye: "••••••••••••••••",
    fofa_email: "••••••••••••••••",
    fofa_key: "••••••••••••••••",
    groq: "••••••••••••••••",
  });

  const [show, setShow] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [sources, setSources] = useState({
    shodan: true,
    zoomeye: false,
    fofa: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleShow = (key: string) => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const apiKeyFields = [
    { key: "shodan", label: "Shodan API Key", description: "Required for host discovery and search" },
    { key: "zoomeye", label: "ZoomEye API Key", description: "For ZoomEye OSINT scanning" },
    { key: "fofa_email", label: "FOFA Email", description: "Your FOFA account email" },
    { key: "fofa_key", label: "FOFA API Key", description: "For FOFA search queries" },
    { key: "groq", label: "Groq API Key", description: "Powers the LLM Agent (query translation)" },
  ];

  return (
    <div className="nex-page">
      <div className="nex-page-header">
        <h2 className="nex-page-heading">Settings</h2>
        <p className="nex-page-description">Configure your security dashboard preferences</p>
      </div>

      <div className="nex-settings-grid">

        {/* API Keys */}
        <div className="nex-card">
          <h3 className="nex-card-title">API Keys</h3>
          <div className="nex-settings-section">
            {apiKeyFields.map((field) => (
              <div className="nex-setting-item" key={field.key}>
                <div className="nex-setting-info">
                  <div className="nex-setting-label">{field.label}</div>
                  <div className="nex-setting-description">{field.description}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    type={show[field.key] ? "text" : "password"}
                    className="nex-input"
                    value={keys[field.key as keyof ApiKeys]}
                    onChange={(e) => setKeys((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    style={{ width: "220px" }}
                  />
                  <button
                    className="nex-btn-secondary"
                    onClick={() => toggleShow(field.key)}
                    style={{ padding: "0.4rem 0.75rem" }}
                  >
                    {show[field.key] ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OSINT Sources */}
        <div className="nex-card">
          <h3 className="nex-card-title">OSINT Sources</h3>
          <div className="nex-settings-section">
            {Object.entries(sources).map(([source, enabled]) => (
              <div className="nex-setting-item" key={source}>
                <div className="nex-setting-info">
                  <div className="nex-setting-label" style={{ textTransform: "capitalize" }}>
                    {source}
                  </div>
                  <div className="nex-setting-description">
                    {source === "shodan" && "Real-time host and service discovery"}
                    {source === "zoomeye" && "Chinese OSINT search engine"}
                    {source === "fofa" && "FOFA cyber asset search platform"}
                  </div>
                </div>
                <label className="nex-toggle">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => setSources((prev) => ({ ...prev, [source]: !prev[source] }))}
                  />
                  <span className="nex-toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* General */}
        <div className="nex-card">
          <h3 className="nex-card-title">General Settings</h3>
          <div className="nex-settings-section">
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">Dashboard Name</div>
                <div className="nex-setting-description">Customize your dashboard display name</div>
              </div>
              <input type="text" className="nex-input" defaultValue="NEX Security" />
            </div>
            <div className="nex-setting-item">
              <div className="nex-setting-info">
                <div className="nex-setting-label">Time Zone</div>
                <div className="nex-setting-description">Set your preferred time zone</div>
              </div>
              <select className="nex-input">
                <option>UTC+2 (Greece)</option>
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
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

      </div>

      <div className="nex-settings-footer">
        <button className="nex-btn-primary" onClick={handleSave}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
        <button className="nex-btn-secondary">Reset to Defaults</button>
      </div>
    </div>
  );
};

export default Settings;