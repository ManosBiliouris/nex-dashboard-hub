import { useMemo } from 'react';
import '../../styles/charts.css';

interface ScanData {
  date: string;
  count: number;
}

interface Props {
  data: ScanData[];
}

const ScanTrendChart = ({ data }: Props) => {
  const maxValue = useMemo(() => Math.max(...data.map(d => d.count)), [data]);
  const minValue = useMemo(() => Math.min(...data.map(d => d.count)), [data]);

  const points = useMemo(() => {
    const width = 100;
    const height = 100;
    const padding = 5;

    return data.map((item, index) => {
      const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
      const normalizedValue = (item.count - minValue) / (maxValue - minValue);
      const y = height - padding - (normalizedValue * (height - 2 * padding));
      return { x, y, count: item.count };
    });
  }, [data, maxValue, minValue]);

  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [points]);

  return (
    <div className="nex-chart">
      <svg viewBox="0 0 100 100" className="nex-line-chart">
        <defs>
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 217, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 217, 255, 0.05)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="5"
            y1={y}
            x2="95"
            y2={y}
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="0.2"
          />
        ))}

        {/* Area under line */}
        <path
          d={`${pathD} L ${points[points.length - 1]?.x || 0} 100 L ${points[0]?.x || 0} 100 Z`}
          fill="url(#scanGradient)"
        />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#00d9ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#00d9ff"
              className="nex-chart-point"
            />
            <title>{`${data[index].date}: ${point.count} scans`}</title>
          </g>
        ))}
      </svg>

      <div className="nex-chart-x-labels">
        {data.map((item, index) => (
          <div key={index} className="nex-chart-label">
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanTrendChart;
