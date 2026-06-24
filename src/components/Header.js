"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // TODO: Replace with real auth state in Step 3
  const user = null;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-books", label: "All Books" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <header className="navbar bg-base-200/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50">
      {/* Left — Logo + Mobile menu button */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {menuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-base-content hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold tracking-tight">
          <span className="text-primary">Book</span>
          <span className="text-accent">Hive</span>
        </Link>
      </div>

      {/* Center — Nav links (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-base-content hover:text-primary font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right — Auth buttons */}
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <span className="text-sm text-base-content/70 hidden sm:inline">
              {user.name}
            </span>
            <button className="btn btn-outline btn-error btn-sm">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
