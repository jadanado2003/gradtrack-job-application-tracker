export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  date: string;
}