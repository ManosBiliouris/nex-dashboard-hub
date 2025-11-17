import { Asset } from '../../types';
import '../../styles/tables.css';

interface Props {
  assets: Asset[];
  onAssetClick?: (asset: Asset) => void;
}

const AssetsTable = ({ assets, onAssetClick }: Props) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  };

  return (
    <div className="nex-table-container">
      <table className="nex-table">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Type</th>
            <th>IP Address</th>
            <th>Port</th>
            <th>Service</th>
            <th>Status</th>
            <th>Risk Score</th>
            <th>Vulnerabilities</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr 
              key={asset.id} 
              onClick={() => onAssetClick?.(asset)}
              className={onAssetClick ? 'clickable' : ''}
            >
              <td>
                <div className="nex-cell-primary">{asset.name}</div>
                {asset.domain && (
                  <div className="nex-cell-secondary">{asset.domain}</div>
                )}
              </td>
              <td>
                <span className={`nex-badge ${asset.type}`}>
                  {asset.type.toUpperCase()}
                </span>
              </td>
              <td className="nex-mono">{asset.ip}</td>
              <td className="nex-mono">{asset.port}</td>
              <td>{asset.service || '-'}</td>
              <td>
                <span className={`nex-status ${asset.status}`}>
                  {asset.status}
                </span>
              </td>
              <td>
                <div className="nex-risk-score">
                  <span className={`nex-risk-value ${getRiskColor(asset.riskScore)}`}>
                    {asset.riskScore}
                  </span>
                  <div className="nex-risk-bar">
                    <div 
                      className={`nex-risk-fill ${getRiskColor(asset.riskScore)}`}
                      style={{ width: `${asset.riskScore}%` }}
                    />
                  </div>
                </div>
              </td>
              <td>
                <span className={`nex-count ${asset.vulnerabilityCount > 10 ? 'high' : 'normal'}`}>
                  {asset.vulnerabilityCount}
                </span>
              </td>
              <td className="nex-date">
                {new Date(asset.lastSeen).toLocaleString('en-US', {
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

export default AssetsTable;
