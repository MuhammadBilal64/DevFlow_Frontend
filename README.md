# ⚡ DevFlow Frontend

<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/workflow.svg" width="100" alt="DevFlow Logo" />
</p>

<h3 align="center">Modern Developer Workflow Management & Collaboration Platform</h3>

<p align="center">
  A sleek, high-performance web interface built with React 19, Vite, and Tailwind CSS v4. Designed for software teams to seamlessly manage workspaces, projects, tasks, automated workflows, and real-time notifications.
</p>

<p align="center">
  <a href="#-key-features"><strong>Explore Features »</strong></a>
  ·
  <a href="#-getting-started"><strong>Quick Start Guide</strong></a>
  ·
  <a href="#-tech-stack"><strong>Tech Stack</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.1.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/SignalR-WebSockets-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt="SignalR" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running Locally](#running-locally)
- [Available Scripts](#-available-scripts)
- [Backend Integration & SignalR](#-backend-integration--signalr)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

**DevFlow Frontend** is the official single-page application (SPA) for the DevFlow developer ecosystem. It delivers a fast, responsive, and intuitive user experience for managing software engineering workflows. Built on **React 19** and powered by **Vite** for ultra-fast HMR and building, the frontend communicates with the **DevFlow ASP.NET Core Web API** via RESTful endpoints and real-time SignalR WebSockets.

---

## ✨ Key Features

### 🔑 Authentication & Authorization
- **JWT Authentication**: Secure login and registration with automated token storage and refresh handling.
- **Route Protection**: Public, Guest-only, and Protected route wrappers.
- **Role-Based Access Control (RBAC)**: Role validation across Platform, Workspace, and Project levels (`Admin`, `Manager`, `Member`, `Owner`).

### 🏢 Workspace Management
- Create, manage, and switch between multi-tenant workspaces.
- Team member invitations and role management.
- Granular permission boundaries for shared assets.

### 📊 Project & Task Management
- Kanban Board & List representations of tasks.
- Priority management (`Low`, `Medium`, `High`) and status flows (`Todo`, `InProgress`, `Completed`).
- Real-time search, filtering, and tag assignment.

### ⚡ Automated Workflows
- Custom workflow triggers and action definitions.
- Visual status tracking for continuous integration & automated process flows.

### 🔔 Real-time Notifications
- Integrated SignalR WebSocket client (`@microsoft/signalr`) for instant push updates.
- Live alerts for task assignments, status changes, and workflow completion.

### 🎨 Modern & Responsive Design
- Clean, aesthetic UI built with **Tailwind CSS v4** and **Lucide Icons**.
- Fully responsive layout optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Modern UI library with concurrent rendering features |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Next-generation frontend tooling & dev server |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework for modern UI |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) | Declarative client-side routing |
| **HTTP Client** | [Axios](https://axios-http.com/) | Promise-based HTTP client with token interceptors |
| **WebSockets** | [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr) | Real-time WebSocket hub connection library |
| **Icons** | [Lucide React](https://lucide.dev/) | Beautiful & consistent open-source icon pack |
| **Linting** | [ESLint 10](https://eslint.org/) | Code quality and formatting validation |

---

## 📁 Project Architecture & Directory Structure

```text
devflow-frontend/
├── public/                  # Static assets
├── src/
│   ├── api/                 # Axios configuration & global interceptors
│   ├── assets/              # Images, SVGs, and brand assets
│   ├── components/          # Reusable UI components
│   │   ├── auth/            # Auth forms and modal components
│   │   ├── common/          # Buttons, Cards, Inputs, Loaders, Navbar, Sidebar
│   │   ├── dashboard/       # Dashboard analytics widgets
│   │   ├── projects/        # Project cards and modal components
│   │   ├── tasks/           # Task boards, cards, and detail view
│   │   ├── workflows/       # Workflow builders and execution logs
│   │   └── workspaces/      # Workspace selector and team modals
│   ├── constants/           # Global constants & enums
│   ├── context/             # React Context (AuthContext, NotificationContext)
│   ├── hooks/               # Custom React hooks (e.g. useSignalRNotification)
│   ├── layouts/             # App layouts (MainLayout, AuthLayout)
│   ├── pages/               # Route page components (Auth, Workspaces, Projects, Tasks, etc.)
│   ├── routes/              # Route definitions & security wrappers (ProtectedRoute, GuestRoute)
│   ├── services/            # API service layer (authService, projectService, taskService, etc.)
│   ├── utils/               # Helper utilities and formatters
│   ├── App.jsx              # Main Root Application Component
│   ├── main.jsx             # React DOM entry point
│   └── index.css            # Global CSS & Tailwind CSS import rules
├── .env.example             # Template environment variables
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML template
├── package.json             # Dependencies and npm scripts
└── vite.config.js           # Vite server & build configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **DevFlow Backend API**: Running locally or hosted on a remote server

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MuhammadBilal64/DevFlow_Frontend.git
   cd DevFlow_Frontend/devflow-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Setup

1. Copy `.env.example` to create `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your environment variables in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

### Running Locally

Start the Vite development server with HMR:
```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173`

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches Vite dev server at `http://localhost:5173` |
| `npm run build` | Compiles and optimizes assets into `dist/` for production |
| `npm run preview` | Serves the production build locally for verification |
| `npm run lint` | Runs ESLint to check for syntax and style issues |

---

## 🔌 Backend Integration & SignalR

The frontend connects seamlessly with the ASP.NET Core backend.

- **API Base URL**: `http://localhost:5000` (or as configured in `.env`)
- **SignalR Hub Endpoint**: `http://localhost:5000/notificationHub`
- **Authentication Header**: Automatic `Bearer <JWT_TOKEN>` injection via Axios interceptors.
- **Response Envelope**: Expects standard `ApiResponse<T>` objects:
  ```json
  {
    "success": true,
    "message": "Operation completed successfully",
    "data": { }
  }
  ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request for review.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
