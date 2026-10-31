"use client";

import { useMemo, useState } from "react";
import dashboardConfig from "@/config/itask-dashboard.json";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Plus,
  Download,
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Eye,
  Pencil,
  CalendarDays,
  X,
  ArrowUpDown,
} from "lucide-react";

type ProjectStatus =
  | "Not Started"
  | "In Progress"
  | "On Hold"
  | "Completed";

type ProjectPriority = "Low" | "Medium" | "High";

type Project = {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate: string;
  dueDate: string;
};

const initialProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "iTASK Platform Development",
    description: "Build the organizational work management platform.",
    owner: "Nikitha",
    status: "In Progress",
    priority: "High",
    progress: 65,
    startDate: "2026-10-01",
    dueDate: "2026-11-15",
  },
  {
    id: "PRJ-002",
    name: "Government Services Portal",
    description: "Design workflows for public sector activities.",
    owner: "Nikitha",
    status: "In Progress",
    priority: "High",
    progress: 45,
    startDate: "2026-10-05",
    dueDate: "2026-11-20",
  },
  {
    id: "PRJ-003",
    name: "CRM Process Research",
    description: "Document sales and customer relationship workflows.",
    owner: "Nikitha",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    startDate: "2026-09-15",
    dueDate: "2026-10-15",
  },
  {
    id: "PRJ-004",
    name: "Campaign Management UI",
    description: "Prepare the campaign workflow interface.",
    owner: "Nikitha",
    status: "On Hold",
    priority: "Medium",
    progress: 30,
    startDate: "2026-10-10",
    dueDate: "2026-10-25",
  },
  {
    id: "PRJ-005",
    name: "Knowledge Sharing Portal",
    description: "Organize internal learning materials and resources.",
    owner: "Nikitha",
    status: "Not Started",
    priority: "Low",
    progress: 0,
    startDate: "2026-10-28",
    dueDate: "2026-11-30",
  },
];

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isOverdue(project: Project) {
  return (
    project.status !== "Completed" &&
    new Date(`${project.dueDate}T23:59:59`) < new Date()
  );
}

function downloadCsv(projects: Project[]) {
  const headers = [
    "Project ID",
    "Project Name",
    "Owner",
    "Status",
    "Priority",
    "Progress",
    "Start Date",
    "Due Date",
  ];

  const rows = projects.map((project) => [
    project.id,
    project.name,
    project.owner,
    project.status,
    project.priority,
    `${project.progress}%`,
    project.startDate,
    project.dueDate,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "owned-projects.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export default function ViewOwnedProjects() {
    const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [sortByDueDate, setSortByDueDate] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "Nikitha",
    status: "Not Started" as ProjectStatus,
    priority: "Medium" as ProjectPriority,
    progress: 0,
    startDate: "2026-10-29",
    dueDate: "2026-11-30",
  });

  function openCreateForm() {
    setEditingProjectId(null);
    setFormData({
      name: "",
      description: "",
      owner: "Nikitha",
      status: "Not Started",
      priority: "Medium",
      progress: 0,
      startDate: new Date().toISOString().slice(0, 10),
      dueDate: "2026-11-30",
    });
    setIsFormOpen(true);
  }

  function openEditForm(project: Project) {
    setEditingProjectId(project.id);
    setFormData({
      name: project.name,
      description: project.description,
      owner: project.owner,
      status: project.status,
      priority: project.priority,
      progress: project.progress,
      startDate: project.startDate,
      dueDate: project.dueDate,
    });
    setIsFormOpen(true);
  }

  function saveProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.dueDate < formData.startDate) {
      window.alert("Due date cannot be earlier than the start date.");
      return;
    }

    if (editingProjectId) {
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === editingProjectId
            ? { ...project, ...formData }
            : project,
        ),
      );
    } else {
      const nextNumber =
        projects.reduce((highest, project) => {
          const number = Number(project.id.replace("PRJ-", ""));
          return Number.isNaN(number) ? highest : Math.max(highest, number);
        }, 0) + 1;

      const newProject: Project = {
        id: `PRJ-${String(nextNumber).padStart(3, "0")}`,
        ...formData,
      };
      setProjects((currentProjects) => [...currentProjects, newProject]);
    }

    setIsFormOpen(false);
  }

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.id.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        project.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All Priorities" ||
        project.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    if (sortByDueDate) {
      result.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    }

    return result;
  }, [projects, search, statusFilter, priorityFilter, sortByDueDate]);

  const totalProjects = projects.length;
  const inProgress = projects.filter(
    (project) => project.status === "In Progress",
  ).length;
  const completed = projects.filter(
    (project) => project.status === "Completed",
  ).length;
  const overdue = projects.filter(isOverdue).length;

  return (
    <div className="owned-projects">
      <div className="owned-projects-toolbar">
  <p className="projects-overline">PROJECT OVERVIEW</p>

  <div className="projects-toolbar-actions">
    <button
      type="button"
      className="projects-secondary-button"
      onClick={() => downloadCsv(filteredProjects)}
    >
      <Download size={16} />
      Export
    </button>

    <button
  type="button"
  className="projects-primary-button"
  onClick={() => router.push("/modules/PTR/CP?role=owner")}
>
  <Plus size={17} />
  Create Project
</button>
  </div>
</div>

      <div className="project-summary-grid">
        <article className="project-summary-card">
          <div className="summary-card-top">
            <span>Total Projects</span>
            <span className="summary-icon summary-icon-blue">
              <FolderKanban size={19} />
            </span>
          </div>
          <strong>{totalProjects}</strong>
          <p>Projects you own</p>
        </article>

        <article className="project-summary-card">
          <div className="summary-card-top">
            <span>In Progress</span>
            <span className="summary-icon summary-icon-orange">
              <Clock3 size={19} />
            </span>
          </div>
          <strong>{inProgress}</strong>
          <p>Currently underway</p>
        </article>

        <article className="project-summary-card">
          <div className="summary-card-top">
            <span>Completed</span>
            <span className="summary-icon summary-icon-green">
              <CheckCircle2 size={19} />
            </span>
          </div>
          <strong>{completed}</strong>
          <p>Successfully finished</p>
        </article>

        <article className="project-summary-card">
          <div className="summary-card-top">
            <span>Overdue</span>
            <span className="summary-icon summary-icon-red">
              <AlertCircle size={19} />
            </span>
          </div>
          <strong>{overdue}</strong>
          <p>Need attention</p>
        </article>
      </div>

      <section className="projects-table-card">
        <div className="projects-table-heading">
          <div>
            <h2>All Projects</h2>
            <p>
              Showing {filteredProjects.length} of {totalProjects} projects
            </p>
          </div>
          <span className="projects-list-label">OWNED BY YOU</span>
        </div>

        <div className="projects-filters">
          <label className="projects-search">
            <Search size={17} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option>All Statuses</option>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            aria-label="Filter by priority"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            type="button"
            className={`projects-sort-button ${sortByDueDate ? "is-active" : ""}`}
            onClick={() => setSortByDueDate((value) => !value)}
            title="Toggle due date sorting"
          >
            <ArrowUpDown size={16} />
            Due date
          </button>
        </div>

        <div className="projects-table-scroll">
          <table className="projects-table">
            <thead>
              <tr>
                <th>PROJECT</th>
                <th>STATUS</th>
                <th>PRIORITY</th>
                <th>PROGRESS</th>
                <th>START DATE</th>
                <th>DUE DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="project-name-cell">
                      <span className="project-mini-icon">
                        <FolderKanban size={18} />
                      </span>
                      <div>
                        <button
                          type="button"
                          className="project-name-button"
                          onClick={() => setSelectedProject(project)}
                        >
                          {project.name}
                        </button>
                        <span className="project-id">{project.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`project-status status-${project.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      <span className="status-dot" />
                      {project.status}
                    </span>
                    {isOverdue(project) && (
                      <span className="overdue-label">Overdue</span>
                    )}
                  </td>

                  <td>
                    <span
                      className={`project-priority priority-${project.priority.toLowerCase()}`}
                    >
                      {project.priority}
                    </span>
                  </td>

                  <td>
                    <div className="project-progress-cell">
                      <div className="project-progress-track">
                        <span style={{ width: `${project.progress}%` }} />
                      </div>
                      <span>{project.progress}%</span>
                    </div>
                  </td>

                  <td>
                    <span className="project-date">
                      <CalendarDays size={14} />
                      {formatDate(project.startDate)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`project-date ${isOverdue(project) ? "project-date-overdue" : ""}`}
                    >
                      {formatDate(project.dueDate)}
                    </span>
                  </td>

                  <td>
                    <div className="project-row-actions">
                      <button
                        type="button"
                        className="project-icon-button"
                        title="View project details"
                        aria-label={`View ${project.name}`}
                        onClick={() => router.push("/modules/PTR/VPD?role=owner")}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        className="project-icon-button"
                        title="Edit project"
                        aria-label={`Edit ${project.name}`}
                         onClick={() => router.push("/modules/PTR/UP?role=owner")}
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="projects-empty-state">
                      <Search size={25} />
                      <strong>No projects found</strong>
                      <p>Try changing your search or filter options.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("All Statuses");
                          setPriorityFilter("All Priorities");
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="projects-table-footer">
          <span>
            Showing {filteredProjects.length} of {totalProjects} projects
          </span>
          <span>Sample data · Backend not connected</span>
        </div>
      </section>

      {isFormOpen && (
        <div
          className="project-modal-backdrop"
          onClick={() => setIsFormOpen(false)}
        >
          <section
            className="project-detail-modal project-form-modal project-edit-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-form-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-modal-heading">
              <div>
                <span className="project-id">
                  {editingProjectId ?? "NEW PROJECT"}
                </span>
                <h2 id="project-form-title">
                  {editingProjectId ? "Edit Project" : "Create Project"}
                </h2>
              </div>
              <button
                type="button"
                className="project-icon-button"
                aria-label="Close project form"
                onClick={() => setIsFormOpen(false)}
              >
                <X size={19} />
              </button>
            </div>

            <form className="project-form" onSubmit={saveProject}>
              <label>
                Project name <span aria-hidden="true">*</span>
                <input
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  placeholder="Enter project name"
                />
              </label>

              <label>
                Description
                <textarea
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({ ...formData, description: event.target.value })
                  }
                  placeholder="Briefly describe the project"
                  rows={3}
                />
              </label>

              <label>
                Owner <span aria-hidden="true">*</span>
                <input
                  required
                  value={formData.owner}
                  onChange={(event) =>
                    setFormData({ ...formData, owner: event.target.value })
                  }
                />
              </label>

              <div className="project-form-two-columns">
                <label>
                  Status
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({ ...formData, status: event.target.value as ProjectStatus })
                    }
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>On Hold</option>
                    <option>Completed</option>
                  </select>
                </label>
                <label>
                  Priority
                  <select
                    value={formData.priority}
                    onChange={(event) =>
                      setFormData({ ...formData, priority: event.target.value as ProjectPriority })
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </label>
              </div>

              <label>
                Progress ({formData.progress}%)
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.progress}
                  onChange={(event) =>
                    setFormData({ ...formData, progress: Number(event.target.value) })
                  }
                />
              </label>

              <div className="project-form-two-columns">
                <label>
                  Start date <span aria-hidden="true">*</span>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(event) =>
                      setFormData({ ...formData, startDate: event.target.value })
                    }
                  />
                </label>
                <label>
                  Due date <span aria-hidden="true">*</span>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    min={formData.startDate}
                    onChange={(event) =>
                      setFormData({ ...formData, dueDate: event.target.value })
                    }
                  />
                </label>
              </div>

              <div className="project-modal-footer">
                <button
                  type="button"
                  className="projects-secondary-button"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="projects-primary-button">
                  {editingProjectId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <section
            className="project-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-modal-heading">
              <div>
                <span className="project-id">{selectedProject.id}</span>
                <h2 id="project-detail-title">{selectedProject.name}</h2>
              </div>
              <button
                type="button"
                className="project-icon-button"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
              >
                <X size={19} />
              </button>
            </div>

            <p className="project-modal-description">
              {selectedProject.description}
            </p>

            <div className="project-detail-grid">
              <div>
                <span>Owner</span>
                <strong>{selectedProject.owner}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedProject.status}</strong>
              </div>
              <div>
                <span>Priority</span>
                <strong>{selectedProject.priority}</strong>
              </div>
              <div>
                <span>Progress</span>
                <strong>{selectedProject.progress}%</strong>
              </div>
              <div>
                <span>Start date</span>
                <strong>{formatDate(selectedProject.startDate)}</strong>
              </div>
              <div>
                <span>Due date</span>
                <strong>{formatDate(selectedProject.dueDate)}</strong>
              </div>
            </div>

            <div className="project-modal-footer">
              <button
                type="button"
                className="projects-secondary-button"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
              <Link
                href="/modules/PTR/VPD?role=owner"
                className="projects-primary-button"
              >
                View Project Details
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}