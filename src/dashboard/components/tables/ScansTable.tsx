import { Scan } from "../../types";
import "../../styles/tables.css";

interface Props {
  scans: Scan[];
}

const ScansTable = ({ scans }: Props) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "running":
        return "status-running";
      case "completed":
        return "status-completed";
      case "scheduled":
        return "status-scheduled";
      case "failed":
        return "status-failed";
      default:
        return "";
    }
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
            <tr key={scan.id}>
              {/* Scan Name */}
              <td>
                <div className="nex-cell-primary">{scan.name}</div>
                <div className="nex-cell-secondary">{scan.targets} targets</div>
              </td>

              {/* Type */}
              <td>
                <span className="nex-badge">{scan.type}</span>
              </td>

              {/* Status */}
              <td>
                <span className={`nex-status ${getStatusClass(scan.status)}`}>
                  {scan.status}
                </span>
              </td>

              {/* Source */}
              <td className="nex-cell-primary">{scan.source}</td>

              {/* Progress */}
              <td>
                {scan.status === "running" ? (
                  <div className="nex-progress-bar">
                    <div
                      className="nex-progress-fill"
                      style={{ width: `${scan.progress}%` }}
                    >
                      {scan.progress}%
                    </div>
                  </div>
                ) : (
                  "-"
                )}
              </td>

              {/* Findings */}
              <td>
                <div className="nex-findings">
                  <span className="sev-critical">{scan.findings.critical}</span>
                  <span className="sev-high">{scan.findings.high}</span>
                  <span className="sev-medium">{scan.findings.medium}</span>
                  <span className="sev-low">{scan.findings.low}</span>
                </div>
              </td>

              {/* Duration */}
              <td>{scan.duration}</td>

              {/* Started */}
              <td>
                {new Date(scan.startedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
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
