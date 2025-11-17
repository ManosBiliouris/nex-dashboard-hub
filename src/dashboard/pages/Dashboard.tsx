import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/mockData";
import { DashboardStats } from "../types";
import VulnerabilityChart from "../components/charts/VulnerabilityChart";
import ScanTrendChart from "../components/charts/ScanTrendChart";
import "../styles/pages.css";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="nex-page">
        <div className="nex-loading">Loading dashboard data...</div>
      </div>
    );
  }

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
            <div className="nex-stat-value">{stats.criticalIssues}</div>
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
            <div className="nex-stat-value">{stats.activeScans}</div>
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
            <div className="nex-stat-value">{stats.totalAssets.toLocaleString()}</div>
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
            <div className="nex-stat-value">{stats.securityScore}%</div>
            <div className="nex-stat-label">Security Score</div>
          </div>
        </div>
      </div>

      <div className="nex-content-grid">
        <div className="nex-card">
          <h3 className="nex-card-title">Vulnerability Trends</h3>
          <VulnerabilityChart data={stats.vulnerabilityTrend} />
        </div>

        <div className="nex-card">
          <h3 className="nex-card-title">Scan Activity</h3>
          <ScanTrendChart data={stats.scansTrend} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
