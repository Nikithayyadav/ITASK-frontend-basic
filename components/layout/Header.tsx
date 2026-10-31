"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  UserRound,
  ChevronDown,
  Check,
} from "lucide-react";

type Role = "owner" | "reviewer" | "contributor";

const roles: { label: string; value: Role }[] = [
  { label: "Owner", value: "owner" },
  { label: "Reviewer", value: "reviewer" },
  { label: "Contributor", value: "contributor" },
];

type HeaderProps = {
  currentRole: Role;
};

export default function Header({ currentRole }: HeaderProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function changeRole(role: Role) {
    setDropdownOpen(false);
    router.push(`/${role}`);
  }

  return (
    <header className="app-header">
      <div className="header-brand">
        <a href="/owner" className="brand-name" aria-label="BIZTAB home">
          BIZTAB<span className="brand-dot">.</span>
        </a>

        <span className="brand-divider" />

        <span className="workspace-name">iTASK Workspace</span>
      </div>

      <div className="header-actions">
        <label className="header-search">
          <Search size={17} aria-hidden="true" />

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>

        <div className="profile-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="profile-menu-trigger"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="Open profile and role menu"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
          >
            <UserRound size={19} />

            <ChevronDown
              size={15}
              className={`profile-chevron ${
                dropdownOpen ? "profile-chevron-open" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="profile-menu" role="menu">
              <div className="profile-menu-heading">
                <span className="profile-menu-title">Workspace role</span>
                <span className="profile-menu-subtitle">
                  Switch your current view
                </span>
              </div>

              <div className="profile-menu-divider" />

              {roles.map((role) => {
                const isActive = role.value === currentRole;

                return (
                  <button
                    key={role.value}
                    type="button"
                    role="menuitem"
                    className={`profile-menu-item ${
                      isActive ? "profile-menu-item-active" : ""
                    }`}
                    onClick={() => changeRole(role.value)}
                  >
                    <span>{role.label}</span>

                    {isActive && (
                      <Check size={17} aria-label="Current role" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}