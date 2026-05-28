import { useState, useEffect } from "react";
import "../styles/pages.css";

interface ApiKeys {
  shodan: string;
  zoomeye: string;
  fofa_email: string;
  fofa_key: string;
  groq: string;
}

type KeyStatus = "idle" | "testing" | "valid" | "invalid";

const DEFAULT_KEYS: ApiKeys = {
  shodan: "",
  zoomeye: "",
  fofa_email: "",
  fofa_key: "",
  groq: "",
};

const Settings = () => {
  const [keys, setKeys] = useState<ApiKeys>(DEFAULT_KEYS);
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, KeyStatus>>({});
  const [sources, setSources] = useState({
    shodan: true,
    zoomeye: false,
    fofa: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("nex_api_keys");
    if (stored) {
      setKeys(JSON.parse(stored));
    }
    const storedSources = localStorage.getItem("nex_sources");
    if (storedSources) {
      setSources(JSON.parse(storedSources));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("nex_api_keys", JSON.stringify(keys));
    localStorage.setItem("nex_sources", JSON.stringify(sources));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    localStorage.removeItem("nex_api_keys");
    localStorage.removeItem("nex_sources");
    setKeys(DEFAULT_KEYS);
    setSources({ shodan: true, zoomeye: false, fofa: false });
    setStatuses({});
  };

  const toggleShow = (key: string) => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const testConnection = async (source: string) => {
    setStatuses((prev) => ({ ...prev, [source]: "testing" }));
    try {
      const keyValue = source === "fofa_key"
        ? keys.fofa_key
        : source === "zoomeye"
        ? keys.zoomeye
        : source === "groq"
        ? keys.groq
        : keys.shodan;

      const res = await fetch(`http://127.0.0.1:8000/credentials/test/${source}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: keyValue,
          email: source === "fofa_key" ? keys.fofa_email : undefined
        })
      });
      const data = await res.json();
      setStatuses((prev) => ({ ...prev, [source]: data.valid ? "valid" : "invalid" }));
    } catch {
      setStatuses((prev) => ({ ...prev, [source]: "invalid" }));
    }
  };

  const getStatusBadge = (key: string) => {
    const status = statuses[key];
    if (!status || status === "idle") return null;
    if (status === "testing") return (
      <span style={{ fontSize: "11px", color: "#eab308" }}>⏳ Testing...</span>
    );
    if (status === "valid") return (
      <span style={{ fontSize: "11px", color: "#22c55e" }}>✅ Valid</span>
    );
    return <span style={{ fontSize: "11px", color: "#ef4444" }}>❌ Invalid</span>;
  };

  const apiKeyFields = [
    { key: "shodan", label: "Shodan API Key", description: "Required for host discovery and search", testKey: "shodan" },
    { key: "zoomeye", label: "ZoomEye API Key", description: "For ZoomEye OSINT scanning", testKey: "zoomeye" },
    { key: "fofa_email", label: "FOFA Email", description: "Your FOFA account email", testKey: null },
    { key: "fofa_key", label: "FOFA API Key", description: "For FOFA search queries", testKey: "fofa_key" },
    { key: "groq", label: "Groq API Key", description: "Powers the LLM Agent (query translation)", testKey: "groq" },
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
                  {getStatusBadge(field.key)}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <input
                    type={show[field.key] ? "text" : "password"}
                    className="nex-input"
                    value={keys[field.key as keyof ApiKeys]}
                    onChange={(e) => setKeys((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder="Enter API key..."
                    style={{ width: "200px" }}
                  />
                  <button
                    className="nex-btn-secondary"
                    onClick={() => toggleShow(field.key)}
                    style={{ padding: "0.4rem 0.75rem" }}
                  >
                    {show[field.key] ? "Hide" : "Show"}
                  </button>
                  {field.testKey && (
                    <button
                      className="nex-btn-secondary"
                      onClick={() => testConnection(field.testKey!)}
                      style={{ padding: "0.4rem 0.75rem", color: "#00d9ff", borderColor: "rgba(0,217,255,0.3)" }}
                    >
                      Test
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OSINT Sources */}
        <div className="nex-card">
          <h3 className="nex-card-title">OSINT Sources</h3>
          <div className="nex-settings-section">
            {(Object.entries(sources) as [string, boolean][]).map(([source, enabled]) => (
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
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    className="nex-btn-secondary"
                    onClick={() => testConnection(source)}
                    style={{ padding: "0.4rem 0.75rem", fontSize: "12px", color: "#00d9ff", borderColor: "rgba(0,217,255,0.3)" }}
                  >
                    {statuses[source] === "testing" ? "..." : "Test"}
                  </button>
                  {getStatusBadge(source)}
                  <label className="nex-toggle">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => setSources((prev) => ({ ...prev, [source]: !prev[source] }))}
                    />
                    <span className="nex-toggle-slider"></span>
                  </label>
                </div>
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
        <button className="nex-btn-secondary" onClick={handleReset}>
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;