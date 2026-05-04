interface Stats {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

interface Props {
  stats: Stats;
  onExport: () => void;
}

const statItems = [
  { key: "total", label: "Total", colorClass: "stat-total" },
  { key: "applied", label: "Applied", colorClass: "stat-applied" },
  { key: "interview", label: "Interview", colorClass: "stat-interview" },
  { key: "offer", label: "Offer", colorClass: "stat-offer" },
  { key: "rejected", label: "Rejected", colorClass: "stat-rejected" },
] as const;

export default function StatsBar({ stats, onExport }: Props) {
  return (
    <div className="stats-bar">
      <div className="stats-grid">
        {statItems.map(({ key, label, colorClass }) => (
          <div key={key} className={`stat-card ${colorClass}`}>
            <span className="stat-number">{stats[key]}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>
      {stats.total > 0 && (
        <button className="btn btn-ghost export-btn" onClick={onExport}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Export CSV
        </button>
      )}
    </div>
  );
}
