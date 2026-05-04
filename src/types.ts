export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  date: string;
  deadline?: string;
  location?: string;
  notes?: string;
}

export type SortField = "date" | "company" | "status";
export type SortOrder = "asc" | "desc";
export type StatusFilter = JobStatus | "All";
