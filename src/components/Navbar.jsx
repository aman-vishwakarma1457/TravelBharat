import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  UserRound,
} from "lucide-react";
import Logo from "./Logo";

const links = [
  ["Home", "/"],
  ["Explore", "/explore"],
  ["States", "/states"],
  ["Categories", "/category/heritage"],
  ["About", "/about"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;

    return localStorage.getItem("tb-theme") === "dark";
  });

  const navigate = useNavigate();

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);

    localStorage.setItem(
      "tb-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  // Close mobile menu when screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/95">
      <div className="container-page flex h-[68px] items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label="TravelBharat home"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative py-6 text-sm font-semibold transition ${
                  isActive
                    ? "text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-orange-500"
                    : "text-navy-900 hover:text-orange-500 dark:text-slate-200"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => navigate("/search")}
            className="grid h-10 w-10 place-items-center rounded-full p-2.5 text-navy-900 transition hover:bg-orange-50 hover:text-orange-500 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <Search size={19} />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            aria-label={
              dark ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={() => setDark((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full p-2.5 text-navy-900 transition hover:bg-orange-50 hover:text-orange-500 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Admin */}
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/15 transition hover:bg-orange-600"
          >
            Admin Panel
          </button>

          {/* User Icon */}
          <div
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-navy-900 dark:bg-white/10 dark:text-white"
            aria-hidden="true"
          >
            <UserRound size={18} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl text-navy-900 transition hover:bg-orange-50 dark:text-white dark:hover:bg-white/10 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-navy-950 md:hidden"
        >
          <nav
            className="grid gap-2"
            aria-label="Mobile navigation"
          >
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400"
                      : "text-navy-900 hover:bg-orange-50 hover:text-orange-500 dark:text-white dark:hover:bg-white/10"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile Search */}
            <button
              type="button"
              onClick={() => handleNavigation("/search")}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-navy-900 transition hover:bg-orange-50 hover:text-orange-500 dark:text-white dark:hover:bg-white/10"
            >
              <Search size={17} />
              Search
            </button>

            {/* Mobile Theme */}
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-navy-900 transition hover:bg-orange-50 hover:text-orange-500 dark:text-white dark:hover:bg-white/10"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Mobile Admin */}
            <button
              type="button"
              onClick={() => handleNavigation("/admin")}
              className="btn-primary mt-2 w-full"
            >
              Admin Panel
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}