"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

import Header from "@/components/layout/Header";

import ViewOwnedProjects from "@/components/modules/ViewOwnedProjects";
import CreateProject from "@/components/modules/CreateProject";
import UpdateProject from "@/components/modules/UpdateProject";
import ViewProjectDetails from "@/components/modules/ViewProjectDetails";
import ManageProjectMembers from "@/components/modules/ManageProjectMembers";
import ViewProjectTasks from "@/components/modules/ViewProjectTasks";

import type { ModuleConfig, RoleCode } from "@/config/itask-config";

type ModuleLayoutProps = {
  role: "owner" | "reviewer" | "contributor";
  roleCode: RoleCode;
  module: ModuleConfig;
  selectedTransactionCode?: string;
};

export default function ModuleLayout({
  role,
  roleCode,
  module,
  selectedTransactionCode,
}: ModuleLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const router = useRouter();

  const selectedTransaction =
    module.transactions.find(
      (transaction) => transaction.code === selectedTransactionCode,
    ) ?? module.transactions[0];

  function selectTransaction(transactionCode: string) {
    router.push(
      `/modules/${module.code}/${transactionCode}?role=${role}`,
    );
  }

  const isOwnerProjectTracker =
    role === "owner" && module.code === "PTR";

  const isViewOwnedProjects =
    isOwnerProjectTracker && selectedTransaction?.code === "VOP";

  const isCreateProject =
    isOwnerProjectTracker && selectedTransaction?.code === "CP";

  const isUpdateProject =
    isOwnerProjectTracker && selectedTransaction?.code === "UP";

  const isViewProjectDetails =
    isOwnerProjectTracker && selectedTransaction?.code === "VPD";

  const isManageProjectMembers =
    isOwnerProjectTracker && selectedTransaction?.code === "MPM";

  return (
    <main className="module-workspace">
      <Header currentRole={role} />

      <div className="module-layout">
        {/* SIDEBAR */}
        <aside
          className={`module-sidebar ${
            sidebarExpanded
              ? "sidebar-expanded"
              : "sidebar-collapsed"
          }`}
        >
          <div className="sidebar-top">
            <button
              type="button"
              className="sidebar-toggle"
              onClick={() =>
                setSidebarExpanded((expanded) => !expanded)
              }
              aria-label={
                sidebarExpanded
                  ? "Collapse sidebar"
                  : "Expand sidebar"
              }
              title={
                sidebarExpanded
                  ? "Collapse sidebar"
                  : "Expand sidebar"
              }
            >
              {sidebarExpanded ? (
                <PanelLeftClose size={19} />
              ) : (
                <PanelLeftOpen size={19} />
              )}
            </button>

            {sidebarExpanded && (
              <span className="sidebar-section-label">
                MODULE MENU
              </span>
            )}
          </div>

          {sidebarExpanded && (
            <>
              <div className="sidebar-module-heading">
                <span className="sidebar-module-code">
                  {module.code}
                </span>

                <h2>{module.name}</h2>
              </div>

              <nav
                className="transaction-navigation"
                aria-label="Transactions"
              >
                {module.transactions.map((transaction) => {
                  const isActive =
                    transaction.code === selectedTransaction?.code;

                  return (
                    <button
                      key={transaction.code}
                      type="button"
                      className={`transaction-link ${
                        isActive
                          ? "transaction-link-active"
                          : ""
                      }`}
                      onClick={() =>
                        selectTransaction(transaction.code)
                      }
                      title={transaction.name}
                    >
                      <ChevronRight
                        size={16}
                        className="transaction-chevron"
                      />

                      <span>{transaction.name}</span>
                    </button>
                  );
                })}
              </nav>
            </>
          )}

          {!sidebarExpanded && (
            <nav className="collapsed-transaction-navigation">
              {module.transactions.map((transaction) => (
                <button
                  key={transaction.code}
                  type="button"
                  className={`collapsed-transaction-link ${
                    transaction.code === selectedTransaction?.code
                      ? "transaction-link-active"
                      : ""
                  }`}
                  title={transaction.name}
                  aria-label={transaction.name}
                  onClick={() =>
                    selectTransaction(transaction.code)
                  }
                >
                  <ChevronRight size={18} />
                </button>
              ))}
            </nav>
          )}

          {sidebarExpanded && (
            <Link
              href={`/${role}`}
              className="sidebar-back-link"
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Link>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <section className="module-content">
          {/* Hide the extra heading on the Create Project page */}
          {!isCreateProject &&
  !isUpdateProject &&
  !isViewProjectDetails &&
  !isManageProjectMembers && (
            
            <div className="module-content-heading">
              <div>
                <p className="eyebrow">
                  {role.toUpperCase()} / {module.code}
                </p>

                <h1>
                  {selectedTransaction?.name ?? module.name}
                </h1>

                {!isViewOwnedProjects && (
                  <p className="module-content-subtitle">
                    {selectedTransaction
                      ? `Manage ${selectedTransaction.name.toLowerCase()} within ${module.name}.`
                      : `Explore activities in ${module.name}.`}
                  </p>
                )}
              </div>

              <button
  type="button"
  className="content-menu-button"
  onClick={() =>
    setSidebarExpanded((expanded) => !expanded)
  }
  aria-label="Toggle transaction sidebar"
  title="Toggle transaction sidebar"
>
  <Menu size={19} />
</button>
            </div>
          )}

          {/* TRANSACTION COMPONENTS */}
          {isViewOwnedProjects ? (
            <ViewOwnedProjects />
          ) : isCreateProject ? (
            <CreateProject />
          ) : isUpdateProject ? (
            <UpdateProject />
          ) : isViewProjectDetails ? (
            <ViewProjectDetails />
          ) : isManageProjectMembers ? (
            <ManageProjectMembers />
          ) : (
            <div className="transaction-content-card">
              <div className="transaction-content-topline">
                <span className="transaction-code">
                  {selectedTransaction?.code}
                </span>

                <span className="transaction-action">
                  {selectedTransaction?.action}
                </span>
              </div>

              <h2>{selectedTransaction?.name}</h2>

              <p>
                This is the workspace for the selected transaction.
                Its specific functionality will be implemented
                according to the activity tracker.
              </p>

              <div className="transaction-placeholder">
                <span className="placeholder-icon">
                  <Menu size={22} />
                </span>

                <span>
                  Transaction content will appear here.
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}