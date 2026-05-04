import { useState } from "react";
import type { FormEvent } from "react";
import type { Job, JobStatus } from "../types";

interface Props {
  onAdd: (data: Omit<Job, "id" | "date">) => void;
}

interface FormErrors {
  company?: string;
  role?: string;
}

const statusOptions: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function JobForm({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!company.trim()) newErrors.company = "Company name is required";
    if (!role.trim()) newErrors.role = "Role title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd({
      company: company.trim(),
      role: role.trim(),
      status,
      location: location.trim() || undefined,
      deadline: deadline || undefined,
      notes: notes.trim() || undefined,
    });

    // Reset form
    setCompany("");
    setRole("");
    setStatus("Applied");
    setLocation("");
    setDeadline("");
    setNotes("");
    setErrors({});
    setIsOpen(false);
  };

  const handleCancel = () => {
    setCompany("");
    setRole("");
    setStatus("Applied");
    setLocation("");
    setDeadline("");
    setNotes("");
    setErrors({});
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button className="btn btn-primary add-job-btn" onClick={() => setIsOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add Application
      </button>
    );
  }

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title">New Application</h2>
        <button className="btn-icon" onClick={handleCancel} aria-label="Close form">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Company */}
          <div className={`field ${errors.company ? "field-error" : ""}`}>
            <label htmlFor="company">Company *</label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Anthropic"
              value={company}
              onChange={(e) => { setCompany(e.target.value); if (errors.company) setErrors(p => ({ ...p, company: undefined })); }}
            />
            {errors.company && <span className="error-msg">{errors.company}</span>}
          </div>

          {/* Role */}
          <div className={`field ${errors.role ? "field-error" : ""}`}>
            <label htmlFor="role">Role *</label>
            <input
              id="role"
              type="text"
              placeholder="e.g. Software Engineer"
              value={role}
              onChange={(e) => { setRole(e.target.value); if (errors.role) setErrors(p => ({ ...p, role: undefined })); }}
            />
            {errors.role && <span className="error-msg">{errors.role}</span>}
          </div>

          {/* Status */}
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value as JobStatus)}>
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Location */}
          <div className="field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g. London, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Deadline */}
          <div className="field">
            <label htmlFor="deadline">Application Deadline</label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="field">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            placeholder="Interview prep, contacts, follow-up dates..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">Add Application</button>
        </div>
      </form>
    </div>
  );
}
