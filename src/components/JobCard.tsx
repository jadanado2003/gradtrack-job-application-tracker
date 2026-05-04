import { useState } from "react";
import type { Job, JobStatus } from "../types";

interface Props {
  job: Job;
  onUpdate: (id: string, updates: Partial<Omit<Job, "id" | "date">>) => void;
  onDelete: (id: string) => void;
}

const STATUS_COLORS: Record<JobStatus, string> = {
  Applied: "badge-applied",
  Interview: "badge-interview",
  Offer: "badge-offer",
  Rejected: "badge-rejected",
};

const STATUS_OPTIONS: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function isDeadlineSoon(deadline?: string): boolean {
  if (!deadline) return false;
  const d = new Date(deadline + "T00:00:00");
  const today = new Date();
  const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

function isDeadlinePassed(deadline?: string): boolean {
  if (!deadline) return false;
  const d = new Date(deadline + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}

export default function JobCard({ job, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Edit state
  const [company, setCompany] = useState(job.company);
  const [role, setRole] = useState(job.role);
  const [status, setStatus] = useState<JobStatus>(job.status);
  const [location, setLocation] = useState(job.location ?? "");
  const [deadline, setDeadline] = useState(job.deadline ?? "");
  const [notes, setNotes] = useState(job.notes ?? "");

  const handleSave = () => {
    if (!company.trim() || !role.trim()) return;
    onUpdate(job.id, {
      company: company.trim(),
      role: role.trim(),
      status,
      location: location.trim() || undefined,
      deadline: deadline || undefined,
      notes: notes.trim() || undefined,
    });
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setLocation(job.location ?? "");
    setDeadline(job.deadline ?? "");
    setNotes(job.notes ?? "");
    setEditing(false);
  };

  const deadlineSoon = isDeadlineSoon(job.deadline);
  const deadlinePassed = isDeadlinePassed(job.deadline);

  if (editing) {
    return (
      <div className="card card-editing">
        <div className="card-edit-grid">
          <input
            className="edit-input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
          />
          <input
            className="edit-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />
          <input
            className="edit-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <input
            className="edit-input"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <select
            className="edit-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
          >
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <textarea
          className="edit-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes..."
          rows={3}
        />
        <div className="card-edit-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleCancelEdit}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-main">
        <div className="card-info">
          <div className="card-title-row">
            <h3 className="card-company">{job.company}</h3>
            <span className={`badge ${STATUS_COLORS[job.status]}`}>{job.status}</span>
          </div>
          <p className="card-role">{job.role}</p>

          <div className="card-meta">
            {job.location && (
              <span className="meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {job.location}
              </span>
            )}
            <span className="meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Applied {formatDate(job.date)}
            </span>
            {job.deadline && (
              <span className={`meta-item ${deadlinePassed ? "meta-danger" : deadlineSoon ? "meta-warning" : ""}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {deadlinePassed ? "Deadline passed" : `Due ${formatDate(job.deadline)}`}
              </span>
            )}
          </div>
        </div>

        <div className="card-actions">
          {job.notes && (
            <button
              className="btn-icon"
              onClick={() => setExpanded(!expanded)}
              title="Toggle notes"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          )}
          <button className="btn-icon" onClick={() => setEditing(true)} title="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="btn-icon btn-icon-danger" onClick={() => onDelete(job.id)} title="Delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
            </svg>
          </button>
        </div>
      </div>

      {expanded && job.notes && (
        <div className="card-notes">
          <p>{job.notes}</p>
        </div>
      )}
    </div>
  );
}
