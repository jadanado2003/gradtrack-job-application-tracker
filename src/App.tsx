import { useState, useEffect } from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import { Job } from "./types";

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div className="container">
      <h1>GradTrack</h1>
      <p className="subtitle">Track your job applications</p>

      <JobForm onAdd={addJob} />
      <JobList jobs={jobs} onDelete={deleteJob} />
    </div>
  );
}

export default App;