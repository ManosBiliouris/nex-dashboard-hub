// Mock Data Service - Replace with actual API calls later
import { Asset, Vulnerability, Scan, DashboardStats, ScanStatus } from '../types';

// Mock Assets
export const mockAssets: Asset[] = [
  {
    id: 'ast-001',
    name: 'web-server-01.example.com',
    type: 'web',
    ip: '192.168.1.10',
    domain: 'example.com',
    port: 443,
    service: 'HTTPS',
    location: 'US-East',
    lastSeen: new Date().toISOString(),
    status: 'online',
    riskScore: 78,
    vulnerabilityCount: 12,
    tags: ['production', 'web'],
  },
  {
    id: 'ast-002',
    name: 'api-gateway-01',
    type: 'api',
    ip: '192.168.1.20',
    domain: 'api.example.com',
    port: 8080,
    service: 'REST API',
    location: 'EU-West',
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    status: 'online',
    riskScore: 45,
    vulnerabilityCount: 5,
    tags: ['production', 'api'],
  },
  {
    id: 'ast-003',
    name: 'db-primary-01',
    type: 'database',
    ip: '10.0.1.50',
    port: 5432,
    service: 'PostgreSQL',
    location: 'US-West',
    lastSeen: new Date(Date.now() - 7200000).toISOString(),
    status: 'online',
    riskScore: 92,
    vulnerabilityCount: 24,
    tags: ['production', 'database', 'critical'],
  },
  {
    id: 'ast-004',
    name: 'mail-server-01',
    type: 'server',
    ip: '192.168.2.10',
    domain: 'mail.example.com',
    port: 25,
    service: 'SMTP',
    location: 'US-East',
    lastSeen: new Date(Date.now() - 86400000).toISOString(),
    status: 'offline',
    riskScore: 35,
    vulnerabilityCount: 3,
    tags: ['staging', 'mail'],
  },
];

// Mock Vulnerabilities
export const mockVulnerabilities: Vulnerability[] = [
  {
    id: 'vuln-001',
    cve: 'CVE-2024-1234',
    title: 'SQL Injection in Authentication Module',
    description: 'Critical SQL injection vulnerability allowing unauthorized database access through authentication bypass.',
    severity: 'critical',
    cvssScore: 9.8,
    affectedAssets: ['ast-003'],
    discoveredAt: new Date(Date.now() - 172800000).toISOString(),
    status: 'open',
    source: 'shodan',
    remediation: 'Update authentication module to version 2.1.5 or higher. Implement prepared statements.',
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1234'],
  },
  {
    id: 'vuln-002',
    cve: 'CVE-2024-5678',
    title: 'Exposed Admin Panel',
    description: 'Administrative interface accessible without authentication on port 8080.',
    severity: 'high',
    cvssScore: 8.2,
    affectedAssets: ['ast-002'],
    discoveredAt: new Date(Date.now() - 259200000).toISOString(),
    status: 'in-progress',
    source: 'fofa',
    remediation: 'Implement authentication and restrict access by IP whitelist.',
  },
  {
    id: 'vuln-003',
    title: 'Outdated SSL/TLS Configuration',
    description: 'Server supports deprecated TLS 1.0 and weak cipher suites.',
    severity: 'medium',
    cvssScore: 5.3,
    affectedAssets: ['ast-001', 'ast-004'],
    discoveredAt: new Date(Date.now() - 432000000).toISOString(),
    status: 'open',
    source: 'zoomeye',
    remediation: 'Disable TLS 1.0/1.1 and enable only TLS 1.2+ with strong ciphers.',
  },
  {
    id: 'vuln-004',
    title: 'Default Credentials Detected',
    description: 'System accessible with default admin credentials.',
    severity: 'critical',
    cvssScore: 9.1,
    affectedAssets: ['ast-001'],
    discoveredAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'open',
    source: 'shodan',
    remediation: 'Change default credentials immediately and implement password policy.',
  },
];

// Mock Scans
export const mockScans: Scan[] = [
  {
    id: 'scn-001',
    name: 'Weekly Infrastructure Scan',
    type: 'full',
    status: 'completed',
    targetAssets: ['ast-001', 'ast-002', 'ast-003'],
    source: 'scheduled',
    startedAt: new Date(Date.now() - 7200000).toISOString(),
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    duration: 3600,
    findingsCount: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 12,
      info: 25,
    },
  },
  {
    id: 'scn-002',
    name: 'Shodan Asset Discovery',
    type: 'osint',
    status: 'running',
    targetAssets: [],
    source: 'shodan',
    startedAt: new Date(Date.now() - 1800000).toISOString(),
    duration: 1800,
    progress: 67,
    findingsCount: {
      critical: 0,
      high: 2,
      medium: 4,
      low: 8,
      info: 15,
    },
  },
  {
    id: 'scn-003',
    name: 'Port Scan - Web Servers',
    type: 'port',
    status: 'completed',
    targetAssets: ['ast-001'],
    source: 'manual',
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 84600000).toISOString(),
    duration: 1800,
    findingsCount: {
      critical: 1,
      high: 2,
      medium: 3,
      low: 5,
      info: 10,
    },
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalAssets: 2847,
  activeScans: 156,
  totalVulnerabilities: 384,
  criticalIssues: 24,
  securityScore: 98.2,
  assetsChange: 12.5,
  vulnerabilitiesChange: -8.3,
  scansTrend: [
    { date: '2024-01-01', count: 120 },
    { date: '2024-01-02', count: 135 },
    { date: '2024-01-03', count: 142 },
    { date: '2024-01-04', count: 128 },
    { date: '2024-01-05', count: 156 },
    { date: '2024-01-06', count: 148 },
    { date: '2024-01-07', count: 156 },
  ],
  vulnerabilityTrend: [
    { date: '2024-01-01', critical: 28, high: 45, medium: 62, low: 89 },
    { date: '2024-01-02', critical: 26, high: 43, medium: 58, low: 85 },
    { date: '2024-01-03', critical: 25, high: 41, medium: 55, low: 82 },
    { date: '2024-01-04', critical: 24, high: 39, medium: 52, low: 78 },
    { date: '2024-01-05', critical: 24, high: 38, medium: 50, low: 75 },
    { date: '2024-01-06', critical: 23, high: 36, medium: 48, low: 73 },
    { date: '2024-01-07', critical: 24, high: 35, medium: 46, low: 70 },
  ],
};

// Service functions (ready for API integration)
export const getAssets = async (): Promise<Asset[]> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAssets), 500);
  });
};

export const getVulnerabilities = async (): Promise<Vulnerability[]> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockVulnerabilities), 500);
  });
};

export const getScans = async (): Promise<Scan[]> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockScans), 500);
  });
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboardStats), 500);
  });
};
