"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Pencil,
  UserRoundPlus,
  CalendarDays,
  ListTodo,
  CircleCheck,
  Clock3,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

type TaskStatus = "Not Started" | "In Progress" | "Completed" | "Overdue";
type TaskPriority = "High" | "Medium" | "Low";

type Task = {
  id: string;
  name: string;
  project: string;
  assignee: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
};

const initialTasks: Task[] = [
  {
    id: "TSK-001",
    name: "Design dashboard layout",
    project: "iTASK Platform Development",
    assignee: "Nikitha",
    priority: "High",
    dueDate: "2026-11-02",
    status: "In Progress",
  },
  {
    id: "TSK-002",
    name: "Develop project creation form",
    project: "iTASK Platform Development",
    assignee: "Akshay",
    priority: "High",
    dueDate: "2026-11-04",
    status: "In Progress",
  },
  {
    id: "TSK-003",
    name: "Prepare user documentation",
    project: "iTASK Platform Development",
    assignee: "Sadhvika",
    priority: "Medium",
    dueDate: "2026-11-06",
    status: "Not Started",
  },
  {
    id: "TSK-004",
    name: "Review authentication screens",
    project: "Portal Enhancement",
    assignee: "Sathvik",
    priority: "Medium",
    dueDate: "2026-10-27",
    status: "Overdue",
  },
  {
    id: "TSK-005",
    name: "Complete responsive layouts",
    project: "Portal Enhancement",
    assignee: "Malavika",
    priority: "Low",
    dueDate: "2026-11-08",
    status: "Completed",
  },
  {
    id: "TSK-006",
    name: "Validate task navigation",
    project: "iTASK Platform Development",
    assignee: "Suchith",
    priority: "High",
    dueDate: "2026-11-03",
    status: "Not Started",
  },
];

export default function ViewProjectTasks() {
  const [tasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.id.toLowerCase().includes(query) ||
        task.name.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query) ||
        task.project.toLowerCase().includes(query);

      const matchesProject =
        projectFilter === "All Projects" ||
        task.project === projectFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All Priorities" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesProject &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tasks, search, projectFilter, statusFilter, priorityFilter]);

  const totalTasks = tasks.length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const completed = tasks.filter(
    (task) => task.status === "Completed",
  ).length;
  const overdue = tasks.filter(
    (task) => task.status === "Overdue",
  ).length;

  function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="task-ui-page">
      <div className="task-ui-heading">
        <div>
          <span className="task-ui-eyebrow">
            TASK MANAGEMENT / OVERVIEW
          </span>
          <h2>Project Tasks</h2>
          <p>
            Track tasks, check progress, and review upcoming deadlines
            across your projects.
          </p>
        </div>

        <div className="task-ui-heading-badge">
          <ListTodo size={17} />
          Task Overview
        </div>
      </div>

      <div className="task-ui-summary-grid">
        <article className="task-ui-summary-card">
          <div className="task-ui-summary-top">
            <span>Total Tasks</span>
            <span className="task-ui-icon task-ui-icon-blue">
              <ListTodo size={19} />
            </span>
          </div>
          <strong>{totalTasks.toString().padStart(2, "0")}</strong>
          <small>Across all projects</small>
        </article>

        <article className="task-ui-summary-card">
          <div className="task-ui-summary-top">
            <span>In Progress</span>
            <span className="task-ui-icon task-ui-icon-orange">
              <Clock3 size={19} />
            </span>
          </div>
          <strong>{inProgress.toString().padStart(2, "0")}</strong>
          <small>Currently being worked on</small>
        </article>

        <article className="task-ui-summary-card">
          <div className="task-ui-summary-top">
            <span>Completed</span>
            <span className="task-ui-icon task-ui-icon-green">
              <CircleCheck size={19} />
            </span>
          </div>
          <strong>{completed.toString().padStart(2, "0")}</strong>
          <small>Finished tasks</small>
        </article>

        <article className="task-ui-summary-card">
          <div className="task-ui-summary-top">
            <span>Overdue</span>
            <span className="task-ui-icon task-ui-icon-red">
              <AlertCircle size={19} />
            </span>
          </div>
          <strong>{overdue.toString().padStart(2, "0")}</strong>
          <small>Past their due date</small>
        </article>
      </div>

      <section className="task-ui-table-card">
        <div className="task-ui-table-heading">
          <div>
            <h3>All Tasks</h3>
            <p>Browse and filter tasks across your projects.</p>
          </div>

          <span className="task-ui-result-count">
            {filteredTasks.length} tasks
          </span>
        </div>

        <div className="task-ui-filter-bar">
          <label className="task-ui-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search tasks, projects, assignees..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="task-ui-select">
            <Filter size={15} />
            <select
              value={projectFilter}
              onChange={(event) => setProjectFilter(event.target.value)}
            >
              <option>All Projects</option>
              <option>iTASK Platform Development</option>
              <option>Portal Enhancement</option>
            </select>
            <ChevronDown size={15} />
          </label>

          <label className="task-ui-select">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All Statuses</option>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
            <ChevronDown size={15} />
          </label>

          <label className="task-ui-select">
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown size={15} />
          </label>
        </div>

        <div className="task-ui-table-wrapper">
          <table className="task-ui-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="task-ui-task-cell">
                      <span className="task-ui-task-id">
                        {task.id}
                      </span>
                      <strong>{task.name}</strong>
                    </div>
                  </td>

                  <td>
                    <span className="task-ui-project-name">
                      {task.project}
                    </span>
                  </td>

                  <td>
                    <div className="task-ui-assignee">
                      <span className="task-ui-avatar">
                        {task.assignee.charAt(0)}
                      </span>
                      {task.assignee}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`task-ui-priority task-ui-priority-${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td>
                    <span className="task-ui-date">
                      <CalendarDays size={14} />
                      {formatDate(task.dueDate)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`task-ui-status task-ui-status-${task.status.toLowerCase().replaceAll(" ", "-")}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>
                    <div className="task-ui-actions">
                      <button
                        type="button"
                        title="View task"
                        aria-label={`View ${task.name}`}
                        onClick={() =>
                          window.alert(
                            `Demo only: View details for ${task.id}`,
                          )
                        }
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        title="Edit task"
                        aria-label={`Edit ${task.name}`}
                        onClick={() =>
                          window.alert(
                            `Demo only: Edit ${task.id}`,
                          )
                        }
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        title="Assign task"
                        aria-label={`Assign ${task.name}`}
                        onClick={() =>
                          window.alert(
                            `Demo only: Assign ${task.id}`,
                          )
                        }
                      >
                        <UserRoundPlus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="task-ui-empty">
                      <Search size={24} />
                      <strong>No tasks found</strong>
                      <span>
                        Try changing your search or filters.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="task-ui-table-footer">
          Showing {filteredTasks.length} of {totalTasks} demo tasks
        </div>
      </section>
    </div>
  );
}