import { useState, useEffect } from "react";
import "./App.css";
import { useJobs } from "./hooks/useJobs";
import StatsBar from "./components/StatsBar";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

export default function App() {
  const { jobs, addJob, updateJob, deleteJob, exportCSV, stats } = useJobs();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("gradtrack_theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("gradtrack_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-logo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
              </svg>
            </div>
            <div>
              <h1 className="brand-name">GradTrack</h1>
              <p className="brand-tagline">Graduate job application tracker</p>
            </div>
          </div>

          <div className="header-controls">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <StatsBar stats={stats} onExport={exportCSV} />
        <JobForm onAdd={addJob} />
        <JobList jobs={jobs} onUpdate={updateJob} onDelete={deleteJob} />
      </main>

      <footer className="footer">
        <p>Built with React + TypeScript · <a href="https://github.com" target="_blank" rel="noreferrer">View on GitHub</a></p>
      </footer>
    </div>
  );
}
