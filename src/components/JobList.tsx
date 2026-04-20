import { Job } from "../types";

interface Props {
  jobs: Job[];
  onDelete: (id: string) => void;
}

export default function JobList({ jobs, onDelete }: Props) {
  return (
    <div className="list">
      {jobs.length === 0 && <p>No applications yet.</p>}

      {jobs.map((job) => (
        <div key={job.id} className="card">
          <h3>{job.company}</h3>
          <p>{job.role}</p>
          <p>Status: {job.status}</p>
          <p>Date: {job.date}</p>
          <button onClick={() => onDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}