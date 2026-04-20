import { useState } from "react";
import { Job, JobStatus } from "../types";

interface Props {
  onAdd: (job: Job) => void;
}

export default function JobForm({ onAdd }: Props) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !role) return;

    const newJob: Job = {
      id: Date.now().toString(),
      company,
      role,
      status,
      date: new Date().toISOString().split("T")[0],
    };

    onAdd(newJob);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as JobStatus)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button type="submit">Add Job</button>
    </form>
  );
}