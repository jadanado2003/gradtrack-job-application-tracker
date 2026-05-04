import { useState, useMemo } from "react";
import type { Job, StatusFilter, SortField, SortOrder } from "../types";
import JobCard from "./JobCard";
import Controls from "./Controls";
import ConfirmModal from "./ConfirmModal";

interface Props {
  jobs: Job[];
  onUpdate: (id: string, updates: Partial<Omit<Job, "id" | "date">>) => void;
  onDelete: (id: string) => void;
}

const STATUS_ORDER: Record<string, number> = {
  Interview: 0, Applied: 1, Offer: 2, Rejected: 3,
};

export default function JobList({ jobs, onUpdate, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (statusFilter !== "All") {
      result = result.filter((j) => j.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.company.toLowerCase().includes(q) ||
          j.role.toLowerCase().includes(q) ||
          (j.location ?? "").toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") {
        cmp = a.date.localeCompare(b.date);
      } else if (sortField === "company") {
        cmp = a.company.localeCompare(b.company);
      } else if (sortField === "status") {
        cmp = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [jobs, search, statusFilter, sortField, sortOrder]);

  const handleDeleteRequest = (id: string) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (pendingDeleteId) {
      onDelete(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  const pendingJob = jobs.find((j) => j.id === pendingDeleteId);

  return (
    <>
      <Controls
        search={search} onSearch={setSearch}
        statusFilter={statusFilter} onStatusFilter={setStatusFilter}
        sortField={sortField} onSortField={setSortField}
        sortOrder={sortOrder} onSortOrder={setSortOrder}
        total={jobs.length} filtered={filteredJobs.length}
      />

      {jobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h3>No applications yet</h3>
          <p>Hit the button above to log your first application.</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3>No results found</h3>
          <p>Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="job-list">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onUpdate={onUpdate}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={pendingDeleteId !== null}
        title="Delete application?"
        message={
          pendingJob
            ? `Remove ${pendingJob.role} at ${pendingJob.company}? This can't be undone.`
            : "This can't be undone."
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDeleteId(null)}
      />
    </>
  );
}
