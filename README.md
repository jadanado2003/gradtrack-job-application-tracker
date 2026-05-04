# GradTrack 📋

> A clean, feature-rich tracker for graduate job applications — built with React, TypeScript, and Vite.

![GradTrack Screenshot](./public/screenshot.png)

## ✨ Features

| Feature | Details |
|---|---|
| **Add applications** | Log company, role, status, location, deadline, and notes |
| **Edit inline** | Update any field directly on the card |
| **Delete with confirmation** | Prevents accidental removal |
| **Status badges** | Applied · Interview · Offer · Rejected — colour-coded at a glance |
| **Stats dashboard** | Live count of applications per stage |
| **Search** | Filter by company, role, or location |
| **Filter by status** | Quickly view applications at any stage |
| **Sort** | By date added, company name, or status |
| **Deadline tracking** | Highlights deadlines that are approaching or overdue |
| **Export to CSV** | Download all your data in one click |
| **Dark / Light mode** | Respects system preference, toggleable manually |
| **Persistent storage** | Data is saved to `localStorage` — no backend needed |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jadanado2003/gradtrack-job-application-tracker.git
cd gradtrack-job-application-tracker

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## 🛠 Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety throughout
- **Vite** — Fast bundler and dev server
- **CSS Custom Properties** — Design token system, no extra dependencies
- **localStorage** — Client-side persistence, zero backend

## 📁 Project Structure

```
src/
├── hooks/
│   └── useJobs.ts          # Core state logic: add, update, delete, export, stats
├── components/
│   ├── StatsBar.tsx         # Application count by status
│   ├── JobForm.tsx          # Add new application form with validation
│   ├── Controls.tsx         # Search, filter, sort controls
│   ├── JobCard.tsx          # Individual application card with inline editing
│   ├── JobList.tsx          # Filtered + sorted list with empty states
│   └── ConfirmModal.tsx     # Delete confirmation dialog
├── types.ts                 # Shared TypeScript interfaces
├── App.tsx                  # Root component, theme management
├── App.css                  # All component styles
└── index.css                # Global design tokens + reset
```

## 🎨 Design Decisions

- **No UI library** — custom CSS gives full control over the aesthetic and keeps the bundle lean
- **`crypto.randomUUID()`** — more robust than `Date.now()` for generating IDs
- **Custom `useJobs` hook** — separates all data logic from the UI layer
- **Lazy localStorage initialiser** — avoids reading from storage on every render
- **Optimistic UI** — updates feel instant; no loading states needed

## 📄 Licence

Copyright (c) 2026 Jad Nader. All rights reserved.

This project is publicly available for portfolio and review purposes only. No permission is granted to copy, modify, distribute, or reuse this code without written permission.
