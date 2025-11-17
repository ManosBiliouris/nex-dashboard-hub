import { Scan } from '../../types';
import '../../styles/tables.css';

interface Props {
  scans: Scan[];
  onScanClick?: (scan: Scan) => void;
}

const ScansTable = ({ scans, onScanClick }: Props) => {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="nex-table-container">
      <table className="nex-table">
        <thead>
          <tr>
            <th>Scan Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Source</th>
            <th>Progress</th>
            <th>Findings</th>
            <th>Duration</th>
            <th>Started</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((scan) => (
            <tr 
              key={scan.id}
              onClick={() => onScanClick?.(scan)}
              className={onScanClick ? 'clickable' : ''}
            >
              <td>
                <div className="nex-cell-primary">{scan.name}</div>
                <div className="nex-cell-secondary">
                  {scan.targetAssets.length} target{scan.targetAssets.length !== 1 ? 's' : ''}
                </div>
              </td>
              <td>
                <span className={`nex-badge ${scan.type}`}>
                  {scan.type}
                </span>
              </td>
              <td>
                <span className={`nex-scan-status ${scan.status}`}>
                  {scan.status === 'running' && (
                    <svg className="nex-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="2" />
                    </svg>
                  )}
                  <span>{scan.status}</span>
                </span>
              </td>
              <td>
                <span className="nex-source">{scan.source}</span>
              </td>
              <td>
                {scan.status === 'running' && scan.progress !== undefined ? (
                  <div className="nex-progress-bar">
                    <div 
                      className="nex-progress-fill"
                      style={{ width: `${scan.progress}%` }}
                    />
                    <span className="nex-progress-text">{scan.progress}%</span>
                  </div>
                ) : (
                  <span className="nex-text-muted">-</span>
                )}
              </td>
              <td>
                <div className="nex-findings">
                  {scan.findingsCount.critical > 0 && (
                    <span className="nex-finding-badge critical">
                      {scan.findingsCount.critical}
                    </span>
                  )}
                  {scan.findingsCount.high > 0 && (
                    <span className="nex-finding-badge high">
                      {scan.findingsCount.high}
                    </span>
                  )}
                  {scan.findingsCount.medium > 0 && (
                    <span className="nex-finding-badge medium">
                      {scan.findingsCount.medium}
                    </span>
                  )}
                  {Object.values(scan.findingsCount).every(v => v === 0) && (
                    <span className="nex-text-muted">-</span>
                  )}
                </div>
              </td>
              <td className="nex-mono">
                {formatDuration(scan.duration)}
              </td>
              <td className="nex-date">
                {new Date(scan.startedAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScansTable;
