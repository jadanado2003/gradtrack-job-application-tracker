import { useEffect, useState } from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import type { Job } from "./types";

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("jobs");

    if (saved) {
      setJobs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job: Job) => {
    setJobs((prevJobs) => [job, ...prevJobs]);
  };

  const deleteJob = (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  return (
    <div className="container">
      <h1>GradTrack</h1>
      <p className="subtitle">Track your graduate job applications</p>

      <JobForm onAdd={addJob} />
      <JobList jobs={jobs} onDelete={deleteJob} />
    </div>
  );
}

export default App;