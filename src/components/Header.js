"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const user = session?.user;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-books", label: "All Books" },
    { href: "/my-profile", label: "My Profile" },
  ];

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-linear-to-r from-base-200/95 via-base-100/95 to-base-200/95 backdrop-blur-xl shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto navbar px-4">
        {/* Left — Logo + Mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden hover:bg-primary/10"
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
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"}
                />
              </svg>
            </button>
            {menuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200/95 backdrop-blur-xl rounded-box z-10 mt-3 w-56 p-3 shadow-xl border border-white/10"
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-lg font-medium ${
                        pathname === link.href
                          ? "bg-primary/15 text-primary"
                          : "hover:bg-primary/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link href="/" className="flex items-center gap-1 text-2xl font-extrabold tracking-tight px-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              BookHive
            </span>
          </Link>
        </div>

        {/* Center — Nav links (desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-primary/15 text-primary shadow-sm shadow-primary/10"
                      : "text-base-content/70 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Auth */}
        <div className="navbar-end gap-3">
          {isPending ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-base-300/50 rounded-full pl-1 pr-3 py-1">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content w-7 rounded-full">
                    <span className="text-xs font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-error btn-outline rounded-lg gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm rounded-lg shadow-md shadow-primary/20">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
