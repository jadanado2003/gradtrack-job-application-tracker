import { useEffect, useState } from "react";
import type { Job } from "../types";

const STORAGE_KEY = "gradtrack_jobs_v2";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (data: Omit<Job, "id" | "date">) => {
    const newJob: Job = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJob = (id: string, updates: Partial<Omit<Job, "id" | "date">>) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updates } : job))
    );
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const exportCSV = () => {
    const headers = ["Company", "Role", "Status", "Location", "Date Applied", "Deadline", "Notes"];
    const rows = jobs.map((j) => [
      `"${j.company}"`,
      `"${j.role}"`,
      j.status,
      `"${j.location ?? ""}"`,
      j.date,
      j.deadline ?? "",
      `"${(j.notes ?? "").replace(/"/g, "'")}"`,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gradtrack_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interview: jobs.filter((j) => j.status === "Interview").length,
    offer: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  return { jobs, addJob, updateJob, deleteJob, exportCSV, stats };
}
