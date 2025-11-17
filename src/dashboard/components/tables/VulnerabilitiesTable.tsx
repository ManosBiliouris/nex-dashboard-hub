import { Vulnerability } from '../../types';
import '../../styles/tables.css';

interface Props {
  vulnerabilities: Vulnerability[];
  onVulnerabilityClick?: (vuln: Vulnerability) => void;
}

const VulnerabilitiesTable = ({ vulnerabilities, onVulnerabilityClick }: Props) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeWidth="2" />
          </svg>
        );
      case 'high':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth="2" />
          </svg>
        );
      case 'medium':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <div className="nex-table-container">
      <table className="nex-table">
        <thead>
          <tr>
            <th>Severity</th>
            <th>Title</th>
            <th>CVE</th>
            <th>CVSS</th>
            <th>Affected Assets</th>
            <th>Source</th>
            <th>Status</th>
            <th>Discovered</th>
          </tr>
        </thead>
        <tbody>
          {vulnerabilities.map((vuln) => (
            <tr 
              key={vuln.id}
              onClick={() => onVulnerabilityClick?.(vuln)}
              className={onVulnerabilityClick ? 'clickable' : ''}
            >
              <td>
                <span className={`nex-severity ${vuln.severity}`}>
                  {getSeverityIcon(vuln.severity)}
                  <span>{vuln.severity}</span>
                </span>
              </td>
              <td>
                <div className="nex-cell-primary">{vuln.title}</div>
                <div className="nex-cell-secondary nex-truncate">
                  {vuln.description}
                </div>
              </td>
              <td className="nex-mono">
                {vuln.cve || '-'}
              </td>
              <td>
                <span className={`nex-cvss ${vuln.cvssScore >= 9 ? 'critical' : vuln.cvssScore >= 7 ? 'high' : vuln.cvssScore >= 4 ? 'medium' : 'low'}`}>
                  {vuln.cvssScore.toFixed(1)}
                </span>
              </td>
              <td>
                <span className="nex-count">
                  {vuln.affectedAssets.length}
                </span>
              </td>
              <td>
                <span className="nex-source">{vuln.source}</span>
              </td>
              <td>
                <span className={`nex-status-vuln ${vuln.status}`}>
                  {vuln.status}
                </span>
              </td>
              <td className="nex-date">
                {new Date(vuln.discoveredAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VulnerabilitiesTable;
