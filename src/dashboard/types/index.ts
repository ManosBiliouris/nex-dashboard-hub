// Core Types for NEX Security Platform

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type ScanStatus = 'running' | 'completed' | 'failed' | 'scheduled';
export type AssetType = 'web' | 'api' | 'database' | 'server' | 'network' | 'other';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  ip: string;
  domain?: string;
  port: number;
  service?: string;
  location?: string;
  lastSeen: string;
  status: 'online' | 'offline' | 'unknown';
  riskScore: number; // 0-100
  vulnerabilityCount: number;
  tags?: string[];
}

export interface Vulnerability {
  id: string;
  cve?: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  cvssScore: number;
  affectedAssets: string[]; // asset IDs
  discoveredAt: string;
  status: 'open' | 'in-progress' | 'resolved' | 'false-positive';
  source: string; // FOFA, Shodan, ZoomEye, etc.
  remediation?: string;
  references?: string[];
}

export interface Scan {
  id: string;
  name: string;
  type: 'port' | 'vulnerability' | 'osint' | 'full';
  status: ScanStatus;
  targetAssets: string[]; // asset IDs
  source: 'shodan' | 'fofa' | 'zoomeye' | 'manual' | 'scheduled';
  startedAt: string;
  completedAt?: string;
  duration?: number; // in seconds
  findingsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  progress?: number; // 0-100
}

export interface DashboardStats {
  totalAssets: number;
  activeScans: number;
  totalVulnerabilities: number;
  criticalIssues: number;
  securityScore: number;
  assetsChange: number; // percentage
  vulnerabilitiesChange: number; // percentage
  scansTrend: Array<{ date: string; count: number }>;
  vulnerabilityTrend: Array<{ date: string; critical: number; high: number; medium: number; low: number }>;
}

export interface OSINTSource {
  name: 'shodan' | 'fofa' | 'zoomeye';
  enabled: boolean;
  lastSync?: string;
  status: 'active' | 'error' | 'disabled';
}
