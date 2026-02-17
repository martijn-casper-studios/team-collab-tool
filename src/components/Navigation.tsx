"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/Avatar";

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { href: "/dashboard", label: "Team" },
    { href: "/chat", label: "Ask AI" },
    { href: "/compare", label: "Compare" },
  ];

  const userSlug = user?.teamMember?.id;

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[var(--accent)] rounded flex items-center justify-center">
              <span className="text-white font-mono text-xs font-bold">TC</span>
            </div>
            <span className="font-serif text-lg text-[var(--fg)]">Team Collab</span>
          </Link>

          <div className="flex items-center gap-0">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`label-mono px-4 py-2 transition-editorial ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm hover:bg-[var(--accent-light)] transition-editorial"
              >
                <Avatar
                  name={user.name}
                  avatar={user.teamMember?.avatar}
                  size="sm"
                />
                <span className="text-sm text-[var(--fg)]">
                  {user.name}
                </span>
                <svg
                  className={`w-3 h-3 text-[var(--muted)] transition-editorial ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-sm shadow-lg border border-[var(--border)] py-1 z-50">
                  {user.hasProfile && userSlug && (
                    <Link
                      href={`/team/${userSlug}`}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[var(--fg)] hover:bg-[var(--accent-light)] transition-editorial"
                    >
                      View Profile
                    </Link>
                  )}
                  <Link
                    href="/onboarding"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[var(--fg)] hover:bg-[var(--accent-light)] transition-editorial"
                  >
                    {user.hasProfile ? "Retake Assessment" : "Take Assessment"}
                  </Link>
                  {user.hasProfile && (
                    <Link
                      href="/insights"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[var(--fg)] hover:bg-[var(--accent-light)] transition-editorial"
                    >
                      My Insights
                    </Link>
                  )}
                  <div className="border-t border-[var(--border)] my-1" />
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--accent-light)] transition-editorial"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
