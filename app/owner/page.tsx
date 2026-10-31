import Link from "next/link";
import {
  FolderKanban,
  ListTodo,
  UsersRound,
  Bell,
  ChartNoAxesCombined,
  ArrowUpRight,
} from "lucide-react";

import Header from "@/components/layout/Header";

const ownerModules = [
  {
    code: "PTR",
    title: "Project Tracker",
    description: "Manage projects, details, and project members.",
    icon: FolderKanban,
    href: "/modules/PTR/VOP?role=owner",
  },
  {
    code: "TMG",
    title: "Task Management",
    description: "Create, assign, and manage project tasks.",
    icon: ListTodo,
    href: "/modules/TMG/VPT?role=owner",
  },
  {
    code: "TMT",
    title: "Team Tracker",
    description: "Review team workload, progress, and project risks.",
    icon: UsersRound,
    href: "/modules/TMT/VTW?role=owner",
  },
  {
    code: "NTF",
    title: "Notification",
    description: "View notifications and project alerts.",
    icon: Bell,
    href: "/modules/NTF/VN?role=owner",
  },
  {
    code: "RPT",
    title: "Report",
    description: "Access project, task, and team reports.",
    icon: ChartNoAxesCombined,
    href: "/modules/RPT/VPRT?role=owner",
  },
];

export default function OwnerDashboard() {
  return (
    <main>
      <Header currentRole="owner" />

      <section className="dashboard-container">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">WORKSPACE / OWNER</p>
            <h1>Owner Dashboard</h1>
            <p className="dashboard-subtitle">
              Manage projects, tasks, and team activities from one place.
            </p>
          </div>
        </div>

        <div className="module-grid">
          {ownerModules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.code}
                href={module.href}
                className="module-card"
              >
                <div className="module-card-top">
                  <span className="module-icon">
                    <Icon size={23} strokeWidth={1.8} />
                  </span>

                  <ArrowUpRight
                    className="module-arrow"
                    size={19}
                    aria-hidden="true"
                  />
                </div>

                <h2>{module.title}</h2>
                <p>{module.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}