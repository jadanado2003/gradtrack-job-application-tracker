import type { StatusFilter, SortField, SortOrder } from "../types";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  statusFilter: StatusFilter;
  onStatusFilter: (v: StatusFilter) => void;
  sortField: SortField;
  onSortField: (v: SortField) => void;
  sortOrder: SortOrder;
  onSortOrder: (v: SortOrder) => void;
  total: number;
  filtered: number;
}

const STATUS_FILTERS: StatusFilter[] = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function Controls({
  search, onSearch,
  statusFilter, onStatusFilter,
  sortField, onSortField,
  sortOrder, onSortOrder,
  total, filtered,
}: Props) {
  return (
    <div className="controls">
      <div className="controls-top">
        <div className="search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => onSearch("")} aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        <div className="sort-controls">
          <select
            className="sort-select"
            value={sortField}
            onChange={(e) => onSortField(e.target.value as SortField)}
          >
            <option value="date">Sort by Date</option>
            <option value="company">Sort by Company</option>
            <option value="status">Sort by Status</option>
          </select>
          <button
            className="sort-order-btn"
            onClick={() => onSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            title={sortOrder === "asc" ? "Ascending" : "Descending"}
          >
            {sortOrder === "asc" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="filter-pills">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            className={`pill ${statusFilter === s ? `pill-active pill-${s.toLowerCase()}` : ""}`}
            onClick={() => onStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {total > 0 && (
        <p className="results-count">
          {filtered === total ? `${total} application${total !== 1 ? "s" : ""}` : `${filtered} of ${total} applications`}
        </p>
      )}
    </div>
  );
}
