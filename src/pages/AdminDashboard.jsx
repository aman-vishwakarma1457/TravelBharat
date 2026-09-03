import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Map,
  Tags,
  ClipboardCheck,
  Settings,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  Menu,
  X,
  AlertTriangle,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { destinations as seed } from "../data/destinations";
import { states } from "../data/states";
import { categories } from "../data/categories";

// ============================================================
// CONSTANTS
// ============================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85";

const initial = seed.map((destination, index) => ({
  ...destination,

  status:
    index % 5 === 0
      ? "Pending Review"
      : index % 7 === 0
        ? "Draft"
        : "Verified",

  lastUpdated: `2026-${String(
    (index % 9) + 1
  ).padStart(2, "0")}-${String(
    (index % 25) + 1
  ).padStart(2, "0")}`,
}));

const blank = {
  name: "",
  state: "Rajasthan",
  city: "Jaipur",
  category: "Heritage",
  description: "",
  historicalSignificance: "",
  bestTimeToVisit: "October – March",
  entryFee: "Free",
  timings: "Daylight hours",
  location: "",
  bestSeason: "Winter",
  popularity: 75,
  images: [FALLBACK_IMAGE],
};

// ============================================================
// IMAGE HELPER
// ============================================================

function getDestinationImage(destination) {
  if (Array.isArray(destination?.images)) {
    const validImage = destination.images.find(
      (image) =>
        typeof image === "string" &&
        image.trim().length > 0
    );

    if (validImage) {
      return validImage;
    }
  }

  if (
    typeof destination?.image === "string" &&
    destination.image.trim()
  ) {
    return destination.image;
  }

  return FALLBACK_IMAGE;
}

function handleImageError(event) {
  if (
    event.currentTarget.dataset.fallbackApplied ===
    "true"
  ) {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = FALLBACK_IMAGE;
}

// ============================================================
// MAIN ADMIN DASHBOARD
// ============================================================

export default function AdminDashboard() {
  // ----------------------------------------------------------
  // URL QUERY PARAMS
  // ----------------------------------------------------------

  const [searchParams, setSearchParams] =
    useSearchParams();

  const requestedView =
    searchParams.get("view");

  // ----------------------------------------------------------
  // ITEMS
  // ----------------------------------------------------------

  const [items, setItems] = useState(() => {
    try {
      const stored =
        localStorage.getItem(
          "tb-admin-items"
        );

      return stored
        ? JSON.parse(stored)
        : initial;
    } catch {
      return initial;
    }
  });

  // ----------------------------------------------------------
  // VIEW
  // IMPORTANT:
  // /admin?view=destinations
  // will open Destinations automatically.
  // ----------------------------------------------------------

  const [view, setView] = useState(
    () => requestedView || "dashboard"
  );

  // ----------------------------------------------------------
  // OTHER STATES
  // ----------------------------------------------------------

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [sidebar, setSidebar] = useState(false);

  const [toasts, setToasts] = useState([]);
  const [deleteTarget, setDeleteTarget] =
    useState(null);

  // ==========================================================
  // SYNC VIEW WITH URL
  // ==========================================================

  useEffect(() => {
    const allowedViews = [
      "dashboard",
      "destinations",
      "states",
      "categories",
      "review",
      "settings",
      "form",
    ];

    if (
      requestedView &&
      allowedViews.includes(requestedView)
    ) {
      setView(requestedView);
    }
  }, [requestedView]);

  // ==========================================================
  // PERSIST CATALOGUE
  // ==========================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "tb-admin-items",
        JSON.stringify(items)
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [items]);

  // ==========================================================
  // THEME PERSISTENCE
  // ==========================================================

  useEffect(() => {
    try {
      const savedTheme =
        localStorage.getItem("tb-theme");

      if (savedTheme === "dark") {
        document.documentElement.classList.add(
          "dark"
        );
      } else if (savedTheme === "light") {
        document.documentElement.classList.remove(
          "dark"
        );
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // ==========================================================
  // DELETE MODAL ESCAPE
  // ==========================================================

  useEffect(() => {
    if (!deleteTarget) return;

    const onKey = (event) => {
      if (event.key === "Escape") {
        setDeleteTarget(null);
      }
    };

    document.addEventListener(
      "keydown",
      onKey
    );

    return () => {
      document.removeEventListener(
        "keydown",
        onKey
      );
    };
  }, [deleteTarget]);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const filtered = useMemo(() => {
    const search = query
      .toLowerCase()
      .trim();

    return items.filter((destination) =>
      `${destination.name || ""} ${
        destination.state || ""
      } ${destination.city || ""} ${
        destination.category || ""
      }`
        .toLowerCase()
        .includes(search)
    );
  }, [items, query]);

  // ==========================================================
  // CHANGE ADMIN VIEW
  // ==========================================================

  const changeView = (nextView) => {
    setView(nextView);
    setSidebar(false);

    // Keep URL in sync for normal navigation too.
    if (nextView === "dashboard") {
      setSearchParams({});
    } else {
      setSearchParams({
        view: nextView,
      });
    }
  };

  // ==========================================================
  // STACKED TOAST
  // ==========================================================

  const showToast = (message) => {
    const id = `${Date.now()}-${Math.random()}`;

    const newToast = {
      ...message,
      id,
    };

    setToasts((previous) => [
      ...previous,
      newToast,
    ]);

    window.setTimeout(() => {
      setToasts((previous) =>
        previous.filter(
          (toast) => toast.id !== id
        )
      );
    }, 3500);
  };

  const closeToast = (id) => {
    setToasts((previous) =>
      previous.filter(
        (toast) => toast.id !== id
      )
    );
  };

  // ==========================================================
  // SAVE DESTINATION
  // ==========================================================

  const save = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      showToast({
        title: "Name required",
        message:
          "Please enter a destination name.",
      });
      return;
    }

    if (!form.description.trim()) {
      showToast({
        title: "Description required",
        message:
          "Please enter a destination description.",
      });
      return;
    }

    if (editing) {
      setItems((previous) =>
        previous.map((item) =>
          item.id === editing
            ? {
                ...item,
                ...form,
                lastUpdated: "Just now",
              }
            : item
        )
      );

      showToast({
        title: "Successfully updated",
        message: `${form.name} successfully updated.`,
      });
    } else {
      const newDestination = {
        ...form,
        id: `custom-${Date.now()}`,
        verified: false,
        status: "Pending Review",
        lastUpdated: "Just now",
      };

      setItems((previous) => [
        newDestination,
        ...previous,
      ]);

      showToast({
        title: "Successfully added",
        message: `${form.name} successfully added.`,
      });
    }

    setEditing(null);
    setForm(blank);
    changeView("destinations");
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const remove = () => {
    if (!deleteTarget) return;

    const name = deleteTarget.name;

    setItems((previous) =>
      previous.filter(
        (item) =>
          item.id !== deleteTarget.id
      )
    );

    setDeleteTarget(null);

    showToast({
      title: "Successfully deleted",
      message: `${name} successfully deleted.`,
    });
  };

  // ==========================================================
  // EDIT
  // ==========================================================

  const edit = (destination) => {
    setEditing(destination.id);

    setForm({
      ...blank,
      ...destination,
    });

    changeView("form");
  };

  // ==========================================================
  // STATS
  // ==========================================================

  const stats = [
    [
      "Total States",
      states.filter(
        (state) =>
          state.type === "State"
      ).length,
      Map,
    ],

    [
      "Total UTs",
      states.filter(
        (state) => state.type === "UT"
      ).length,
      Map,
    ],

    [
      "Total Destinations",
      items.length,
      Tags,
    ],

    [
      "Verified",
      items.filter(
        (item) =>
          item.status === "Verified"
      ).length,
      CheckCircle2,
    ],
  ];

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-navy-950">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside
          className={`
            fixed inset-y-0 left-0 z-50
            flex h-screen w-72 flex-col
            bg-navy-900 p-5 text-white
            shadow-2xl
            transition-transform duration-200
            md:translate-x-0
            ${
              sidebar
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          {/* SIDEBAR HEADER */}

          <div className="flex shrink-0 items-center justify-between">
            <Link
              to="/"
              className="text-xl font-extrabold"
            >
              Travel
              <span className="text-orange-400">
                Bharat
              </span>
            </Link>

            <button
              type="button"
              className="rounded-lg p-2 transition hover:bg-white/10 md:hidden"
              onClick={() =>
                setSidebar(false)
              }
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* WORKSPACE LABEL */}

          <p className="mt-1 shrink-0 text-xs text-white/45">
            Admin workspace
          </p>

          {/* SIDEBAR NAVIGATION */}

          <nav className="mt-8 flex-1 overflow-y-auto pr-1">
            <div className="grid gap-1">
              {[
                [
                  "dashboard",
                  "Dashboard",
                  LayoutDashboard,
                ],

                [
                  "destinations",
                  "Destinations",
                  Tags,
                ],

                [
                  "states",
                  "States",
                  Map,
                ],

                [
                  "categories",
                  "Categories",
                  Tags,
                ],

                [
                  "review",
                  "Content Review",
                  ClipboardCheck,
                ],

                [
                  "settings",
                  "Settings",
                  Settings,
                ],
              ].map(
                ([id, label, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      changeView(id)
                    }
                    className={`
                      flex w-full items-center gap-3
                      rounded-xl px-4 py-3
                      text-left text-sm font-semibold
                      transition-all duration-200
                      ${
                        view === id
                          ? "bg-white/10 text-orange-300 shadow-sm"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      className="shrink-0"
                    />

                    <span>{label}</span>
                  </button>
                )
              )}
            </div>
          </nav>

          {/* SIDEBAR BOTTOM CARD */}

          <div className="mt-4 shrink-0 rounded-2xl bg-white/5 p-4">
            <p className="text-xs font-bold">
              TravelBharat Admin
            </p>

            <p className="mt-1 text-[11px] leading-5 text-white/50">
              Tourism content workspace
            </p>
          </div>
        </aside>

        {/* =====================================================
            MOBILE OVERLAY
        ===================================================== */}

        {sidebar && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() =>
              setSidebar(false)
            }
            aria-label="Close sidebar"
          />
        )}

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="min-w-0 flex-1 md:ml-72">

          {/* HEADER */}

          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur dark:border-white/10 dark:bg-navy-950/95 md:px-8">

            <div className="flex items-center gap-3">

              <button
                type="button"
                className="md:hidden"
                onClick={() =>
                  setSidebar(true)
                }
                aria-label="Open sidebar"
              >
                <Menu size={21} />
              </button>

              <div>
                <p className="text-sm font-extrabold text-navy-900 dark:text-white">
                  Good Morning, Admin
                </p>

                <p className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">
                  Manage your TravelBharat tourism catalogue
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="text-xs font-bold text-orange-600 transition hover:text-orange-700"
            >
              View website ↗
            </Link>
          </header>

          {/* CONTENT */}

          <div className="p-5 md:p-8">

            {/* DASHBOARD */}

            {view === "dashboard" && (
              <Dashboard
                stats={stats}
                items={items}
                setView={changeView}
              />
            )}

            {/* DESTINATIONS */}

            {view === "destinations" && (
              <Destinations
                filtered={filtered}
                query={query}
                setQuery={setQuery}
                edit={edit}
                remove={(destination) =>
                  setDeleteTarget(
                    destination
                  )
                }
                setView={changeView}
                setItems={setItems}
                showToast={showToast}
              />
            )}

            {/* FORM */}

            {view === "form" && (
              <DestinationForm
                form={form}
                setForm={setForm}
                save={save}
                editing={editing}
                cancel={() => {
                  setEditing(null);
                  setForm(blank);
                  changeView(
                    "destinations"
                  );
                }}
              />
            )}

            {/* STATES */}

            {view === "states" && (
              <StatesPanel />
            )}

            {/* CATEGORIES */}

            {view === "categories" && (
              <CategoriesPanel />
            )}

            {/* REVIEW */}

            {view === "review" && (
              <Review
                items={items}
                setItems={setItems}
                showToast={showToast}
              />
            )}

            {/* SETTINGS */}

            {view === "settings" && (
              <SettingsPanel
                items={items}
                setItems={setItems}
                showToast={showToast}
              />
            )}
          </div>
        </main>
      </div>

      {/* =======================================================
          STACKED TOAST NOTIFICATIONS
      ======================================================= */}

      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(390px,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto w-full"
          >
            <SuccessToast
              toast={toast}
              onClose={() =>
                closeToast(toast.id)
              }
            />
          </div>
        ))}
      </div>

      {/* =======================================================
          DELETE MODAL
      ======================================================= */}

      {deleteTarget && (
        <DeleteModal
          destination={deleteTarget}
          onCancel={() =>
            setDeleteTarget(null)
          }
          onConfirm={remove}
        />
      )}
    </div>
  );
}

// ============================================================
// SUCCESS TOAST
// ============================================================

function SuccessToast({ toast, onClose }) {
  return (
    <div
      className="w-full fade-up"
      role="status"
      aria-live="polite"
    >
      <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-2xl shadow-emerald-900/10 dark:border-emerald-900/60 dark:bg-navy-900">

        <div className="flex items-start gap-3 p-4">

          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
            <CheckCircle2 size={20} />
          </span>

          <div className="min-w-0 flex-1">

            <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
              {toast.title}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">
              {toast.message}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Close notification"
          >
            <X size={15} />
          </button>

        </div>

        <div className="h-1 bg-emerald-500" />
      </div>
    </div>
  );
}

// ============================================================
// DELETE MODAL
// ============================================================

function DeleteModal({
  destination,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-navy-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-navy-900">

        <div className="p-6 sm:p-7">

          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
            <AlertTriangle size={23} />
          </div>

          <h2
            id="delete-title"
            className="mt-5 text-xl font-extrabold text-navy-900 dark:text-white"
          >
            Delete destination?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
            Are you sure you want to remove{" "}
            <span className="font-bold text-navy-900 dark:text-white">
              {destination.name}
            </span>
            ? This action will remove it from the current catalogue.
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/20"
            >
              <Trash2 size={16} />
              Delete Destination
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================

function Dashboard({
  stats,
  items,
  setView,
}) {
  const total = Math.max(
    items.length,
    1
  );

  const verificationData = [
    [
      "Verified",
      items.filter(
        (item) =>
          item.status === "Verified"
      ).length,
      "bg-emerald-500",
    ],

    [
      "Pending Review",
      items.filter(
        (item) =>
          item.status ===
          "Pending Review"
      ).length,
      "bg-amber-500",
    ],

    [
      "Draft",
      items.filter(
        (item) =>
          item.status === "Draft"
      ).length,
      "bg-slate-400",
    ],
  ];

  return (
    <div>

      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-navy-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          A quick snapshot of your TravelBharat tourism catalogue.
        </p>

      </div>

      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map(
          ([label, number, Icon]) => (
            <div
              key={label}
              className="card p-5"
            >

              <div className="flex items-center justify-between">

                <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                  <Icon size={19} />
                </span>

                <span className="text-xs font-bold text-emerald-600">
                  +8.2%
                </span>

              </div>

              <div className="mt-5 text-3xl font-extrabold text-navy-900 dark:text-white">
                {number}
              </div>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {label}
              </p>

            </div>
          )
        )}

      </div>

      {/* LOWER DASHBOARD */}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

        {/* CONTENT ACTIVITY */}

        <div className="card p-6">

          <div className="flex items-center justify-between">

            <h2 className="font-extrabold text-navy-900 dark:text-white">
              Content Activity
            </h2>

            <button
              type="button"
              onClick={() =>
                setView(
                  "destinations"
                )
              }
              className="text-xs font-bold text-orange-600"
            >
              Manage
            </button>

          </div>

          <div className="mt-7 flex h-44 items-end gap-3">

            {[
              35,
              52,
              45,
              70,
              58,
              82,
              64,
              90,
              75,
              96,
              78,
              88,
            ].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-lg bg-orange-200 transition hover:bg-orange-400"
                  style={{
                    height: `${height}%`,
                  }}
                />
              )
            )}

          </div>

          <div className="mt-3 flex justify-between text-[10px] text-slate-400">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>

        </div>

        {/* VERIFICATION */}

        <div className="card p-6">

          <h2 className="font-extrabold text-navy-900 dark:text-white">
            Verification Status
          </h2>

          <div className="mt-6 grid gap-4">

            {verificationData.map(
              ([label, number, bar]) => (
                <div key={label}>

                  <div className="flex justify-between text-xs font-bold text-navy-900 dark:text-white">
                    <span>{label}</span>
                    <span>{number}</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-white/10">

                    <div
                      className={`h-2 rounded-full ${bar}`}
                      style={{
                        width: `${Math.max(
                          8,
                          (number /
                            total) *
                            100
                        )}%`,
                      }}
                    />

                  </div>

                </div>
              )
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DESTINATIONS
// ============================================================

function Destinations({
  filtered,
  query,
  setQuery,
  edit,
  remove,
  setView,
  setItems,
  showToast,
}) {
  const status = (id, value) => {
    const item = filtered.find(
      (destination) =>
        destination.id === id
    );

    setItems((previous) =>
      previous.map((destination) =>
        destination.id === id
          ? {
              ...destination,
              status: value,
              verified:
                value === "Verified",
              lastUpdated:
                "Just now",
            }
          : destination
      )
    );

    showToast({
      title: "Successfully updated",
      message: `${
        item?.name || "Destination"
      } successfully updated.`,
    });
  };

  return (
    <div>

      {/* HEADER */}

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
            Content
          </p>

          <h1 className="mt-1 text-3xl font-extrabold text-navy-900 dark:text-white">
            Destinations
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage tourism destinations across India.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            setView("form")
          }
          className="btn-primary w-full sm:w-auto"
        >
          <Plus size={17} />
          Add Destination
        </button>

      </div>

      {/* MAIN CARD */}

      <div className="card overflow-hidden">

        {/* SEARCH */}

        <div className="border-b border-slate-200 p-4 dark:border-white/10">

          <div className="relative w-full sm:max-w-md">

            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={17}
            />

            <input
              className="input pl-10"
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Search destinations..."
            />

          </div>
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full text-left text-sm">

            <thead className="bg-slate-50 text-xs text-slate-500 dark:bg-white/5">

              <tr>

                <th className="px-5 py-4">
                  Destination
                </th>

                <th>
                  State
                </th>

                <th>
                  Category
                </th>

                <th>
                  Status
                </th>

                <th>
                  Updated
                </th>

                <th className="pr-5 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/10">

              {filtered.map(
                (destination) => (
                  <tr
                    key={
                      destination.id
                    }
                    className="transition hover:bg-slate-50/70 dark:hover:bg-white/5"
                  >

                    {/* DESTINATION */}

                    <td className="px-5 py-4">

                      <div className="flex min-w-[280px] items-center gap-3">

                        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-white/10">

                          <img
                            src={getDestinationImage(
                              destination
                            )}
                            alt={
                              destination.name
                            }
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            loading="lazy"
                            onError={
                              handleImageError
                            }
                          />

                        </div>

                        <div className="min-w-0">

                          <p className="truncate font-bold text-navy-900 dark:text-white">
                            {
                              destination.name
                            }
                          </p>

                          <p className="mt-1 truncate text-[11px] font-normal text-slate-400">
                            {
                              destination.city ||
                              "India"
                            }
                          </p>

                        </div>
                      </div>
                    </td>

                    {/* STATE */}

                    <td className="text-slate-500 dark:text-slate-400">
                      {
                        destination.state
                      }
                    </td>

                    {/* CATEGORY */}

                    <td>

                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                        {
                          destination.category
                        }
                      </span>

                    </td>

                    {/* STATUS */}

                    <td>

                      <select
                        value={
                          destination.status
                        }
                        onChange={(
                          event
                        ) =>
                          status(
                            destination.id,
                            event.target
                              .value
                          )
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold text-navy-900 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-slate-100"
                      >

                        <option value="Verified">
                          Verified
                        </option>

                        <option value="Pending Review">
                          Pending Review
                        </option>

                        <option value="Draft">
                          Draft
                        </option>

                      </select>

                    </td>

                    {/* UPDATED */}

                    <td className="text-xs text-slate-500 dark:text-slate-400">
                      {
                        destination.lastUpdated
                      }
                    </td>

                    {/* ACTIONS */}

                    <td className="pr-5">

                      <div className="flex justify-end gap-1">

                        {/* VIEW */}

                        <Link
                          to={`/destination/${destination.id}?from=admin`}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-orange-50 hover:text-orange-500 dark:text-slate-300 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
                          aria-label={`View ${destination.name}`}
                          title="View destination"
                        >
                          <Eye size={15} />
                        </Link>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            edit(
                              destination
                            )
                          }
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-orange-50 hover:text-orange-500 dark:text-slate-300 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
                          aria-label={`Edit ${destination.name}`}
                          title="Edit destination"
                        >
                          <Pencil size={15} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            remove(
                              destination
                            )
                          }
                          className="grid h-8 w-8 place-items-center rounded-lg text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                          aria-label={`Delete ${destination.name}`}
                          title="Delete destination"
                        >
                          <Trash2
                            size={15}
                          />
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}

        <div className="grid gap-3 p-3 md:hidden">

          {filtered.map(
            (destination) => (
              <div
                key={
                  destination.id
                }
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-navy-900"
              >

                {/* IMAGE + NAME */}

                <div className="flex min-w-0 items-center gap-3">

                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-white/10">

                    <img
                      src={getDestinationImage(
                        destination
                      )}
                      alt={
                        destination.name
                      }
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={
                        handleImageError
                      }
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-extrabold text-navy-900 dark:text-white">
                      {
                        destination.name
                      }
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                      {
                        destination.city ||
                        "India"
                      }
                    </p>

                    <p className="mt-1 truncate text-[11px] text-slate-400">
                      {
                        destination.state
                      }
                    </p>

                  </div>
                </div>

                {/* CATEGORY + STATUS */}

                <div className="mt-3 flex min-w-0 items-center justify-between gap-2">

                  <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                    {
                      destination.category
                    }
                  </span>

                  <select
                    value={
                      destination.status
                    }
                    onChange={(
                      event
                    ) =>
                      status(
                        destination.id,
                        event.target
                          .value
                      )
                    }
                    className="min-w-0 max-w-[150px] rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-bold text-navy-900 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-slate-100"
                    aria-label={`Status for ${destination.name}`}
                  >

                    <option value="Verified">
                      Verified
                    </option>

                    <option value="Pending Review">
                      Pending Review
                    </option>

                    <option value="Draft">
                      Draft
                    </option>

                  </select>

                </div>

                {/* UPDATED */}

                <div className="mt-3 border-t border-slate-100 pt-3 dark:border-white/10">

                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Updated
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {
                      destination.lastUpdated
                    }
                  </p>

                  {/* MOBILE ACTIONS */}

                  <div className="mt-3 grid w-full grid-cols-3 gap-2">

                    {/* VIEW */}

                    <Link
                      to={`/destination/${destination.id}?from=admin`}
                      className="flex h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-white/10 dark:text-slate-300 dark:hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
                      aria-label={`View ${destination.name}`}
                      title="View destination"
                    >
                      <Eye size={16} />

                      <span className="text-xs font-bold">
                        View
                      </span>
                    </Link>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        edit(
                          destination
                        )
                      }
                      className="flex h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-white/10 dark:text-slate-300 dark:hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
                      aria-label={`Edit ${destination.name}`}
                      title="Edit destination"
                    >
                      <Pencil size={16} />

                      <span className="text-xs font-bold">
                        Edit
                      </span>
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        remove(
                          destination
                        )
                      }
                      className="flex h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-red-100 text-red-500 transition hover:border-red-500 hover:bg-red-500 hover:text-white dark:border-red-500/20 dark:hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white"
                      aria-label={`Delete ${destination.name}`}
                      title="Delete destination"
                    >
                      <Trash2 size={16} />

                      <span className="text-xs font-bold">
                        Delete
                      </span>
                    </button>

                  </div>
                </div>
              </div>
            )
          )}

        </div>

        {/* EMPTY STATE */}

        {filtered.length === 0 && (
          <div className="p-12 text-center">

            <Search
              className="mx-auto text-slate-300"
              size={28}
            />

            <p className="mt-3 text-sm font-bold text-navy-900 dark:text-white">
              No destinations found
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try another search term.
            </p>

          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DESTINATION FORM
// ============================================================

function DestinationForm({
  form,
  setForm,
  save,
  editing,
  cancel,
}) {
  const field = (
    key,
    label,
    props = {}
  ) => {
    const isTextarea =
      props.type === "textarea";

    const commonProps = {
      ...props,
      value: form[key] ?? "",
      onChange: (event) =>
        setForm({
          ...form,
          [key]: event.target.value,
        }),
    };

    delete commonProps.type;

    return (
      <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200">

        {label}

        {isTextarea ? (
          <textarea
            {...commonProps}
            className="input min-h-28 resize-y"
          />
        ) : (
          <input
            {...commonProps}
            className="input"
          />
        )}

      </label>
    );
  };

  const imageUrls = Array.isArray(
    form.images
  )
    ? form.images
    : [form.images || ""];

  const setImageUrls = (value) => {
    setForm({
      ...form,
      images: value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <div>

      <button
        type="button"
        onClick={cancel}
        className="text-sm font-bold text-slate-500 transition hover:text-orange-500"
      >
        ← Back to destinations
      </button>

      <div className="mt-5 max-w-4xl">

        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
          Content Editor
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-navy-900 dark:text-white">
          {editing
            ? "Edit"
            : "Add"}{" "}
          Destination
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Add detailed information about an Indian tourism destination.
        </p>

        <form
          onSubmit={save}
          className="card mt-6 grid gap-5 p-6 sm:grid-cols-2"
        >

          {field(
            "name",
            "Destination Name",
            {
              placeholder:
                "e.g. Jaisalmer Fort",
              required: true,
            }
          )}

          {field(
            "city",
            "City",
            {
              placeholder:
                "e.g. Jaipur",
            }
          )}

          <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200">

            State

            <select
              value={form.state || ""}
              onChange={(event) =>
                setForm({
                  ...form,
                  state: event.target
                    .value,
                })
              }
              className="input"
            >

              {states.map(
                (state) => (
                  <option
                    key={state.name}
                    value={state.name}
                  >
                    {state.name}
                  </option>
                )
              )}

            </select>
          </label>

          <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200">

            Category

            <select
              value={
                form.category || ""
              }
              onChange={(event) =>
                setForm({
                  ...form,
                  category:
                    event.target
                      .value,
                })
              }
              className="input"
            >

              {categories.map(
                (category) => (
                  <option
                    key={category.name}
                    value={
                      category.name
                    }
                  >
                    {category.name}
                  </option>
                )
              )}

            </select>
          </label>

          {field(
            "description",
            "Description",
            {
              type: "textarea",
              placeholder:
                "Write a short destination description...",
              required: true,
            }
          )}

          {field(
            "historicalSignificance",
            "Historical Significance",
            {
              type: "textarea",
              placeholder:
                "Historical background...",
            }
          )}

          {field(
            "bestTimeToVisit",
            "Best Time To Visit"
          )}

          <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200">

            Best Season

            <select
              value={
                form.bestSeason ||
                "Winter"
              }
              onChange={(event) =>
                setForm({
                  ...form,
                  bestSeason:
                    event.target
                      .value,
                })
              }
              className="input"
            >

              <option value="Winter">
                Winter
              </option>

              <option value="Summer">
                Summer
              </option>

              <option value="Monsoon">
                Monsoon
              </option>

              <option value="Year-round">
                Year-round
              </option>

            </select>
          </label>

          {field(
            "popularity",
            "Popularity Score",
            {
              type: "number",
              min: 0,
              max: 100,
            }
          )}

          {field(
            "entryFee",
            "Entry Fee"
          )}

          {field(
            "timings",
            "Opening Hours"
          )}

          {field(
            "location",
            "Location",
            {
              placeholder:
                "City, State, India",
            }
          )}

          {/* GALLERY IMAGES */}

          <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200 sm:col-span-2">

            Gallery Image URLs

            <p className="font-normal leading-5 text-slate-400">
              Add one image URL per line. The first image will be used as the destination cover.
            </p>

            <textarea
              className="input min-h-28 resize-y"
              value={imageUrls.join(
                "\n"
              )}
              onChange={(event) =>
                setImageUrls(
                  event.target.value
                )
              }
              placeholder="https://images.unsplash.com/..."
            />

          </label>

          {/* FORM ACTIONS */}

          <div className="flex justify-end gap-3 sm:col-span-2">

            <button
              type="button"
              onClick={cancel}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
            >
              {editing
                ? "Save Changes"
                : "Add Destination"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// STATES PANEL
// ============================================================

function StatesPanel() {
  return (
    <div>

      <div className="mb-6">

        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
          Catalogue
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-navy-900 dark:text-white">
          States & UTs
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Explore all Indian states and union territories available in the TravelBharat catalogue.
        </p>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {states.map((state) => (
          <Link
            key={state.name}
            to={`/state/${encodeURIComponent(
              state.name
            )}`}
            className="card group overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="flex items-start justify-between gap-3">

              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-500/10">
                <Map size={20} />
              </div>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                {state.type ||
                  "State"}
              </span>

            </div>

            <h3 className="mt-5 text-base font-extrabold text-navy-900 dark:text-white">
              {state.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Capital:{" "}
              {state.capital ||
                "Not available"}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">

              <span className="text-[11px] font-semibold text-slate-400">
                Explore state
              </span>

              <span className="text-orange-500 transition group-hover:translate-x-1">
                →
              </span>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

// ============================================================
// CATEGORIES PANEL
// ============================================================

function CategoriesPanel() {
  const categoryIcons = {
    Heritage: "🏛️",
    Nature: "🌿",
    Religious: "🛕",
    Adventure: "🏔️",
  };

  const categoryDescriptions = {
    Heritage:
      "Discover forts, palaces, monuments and historic places across India.",

    Nature:
      "Explore mountains, waterfalls, beaches, forests and scenic landscapes.",

    Religious:
      "Visit temples, spiritual centres and culturally significant places.",

    Adventure:
      "Find thrilling destinations for trekking, rafting and outdoor experiences.",
  };

  return (
    <div>

      <div className="mb-6">

        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
          Catalogue
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-navy-900 dark:text-white">
          Categories
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Explore TravelBharat&apos;s tourism experience categories.
        </p>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {categories.map(
          (category) => {
            const icon =
              categoryIcons[
                category.name
              ] || "✦";

            const description =
              categoryDescriptions[
                category.name
              ] ||
              "Explore amazing destinations across India.";

            return (
              <Link
                key={category.name}
                to={`/category/${encodeURIComponent(
                  category.name
                )}`}
                className="card group overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-center justify-between">

                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-2xl transition group-hover:scale-105 dark:bg-orange-500/10">
                    {icon}
                  </div>

                  <span className="text-orange-500 transition group-hover:translate-x-1">
                    →
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-extrabold text-navy-900 dark:text-white">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">

                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                    {category.count ||
                      0}{" "}
                    destinations
                  </span>

                  <span className="text-[11px] font-semibold text-slate-400">
                    Explore
                  </span>

                </div>
              </Link>
            );
          }
        )}

      </div>
    </div>
  );
}

// ============================================================
// CONTENT REVIEW
// ============================================================

function Review({
  items,
  setItems,
  showToast,
}) {
  const pending = items.filter(
    (item) =>
      item.status ===
      "Pending Review"
  );

  const verify = (destination) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === destination.id
          ? {
              ...item,
              status: "Verified",
              verified: true,
              lastUpdated:
                "Just now",
            }
          : item
      )
    );

    showToast({
      title:
        "Successfully verified",
      message: `${destination.name} successfully verified.`,
    });
  };

  return (
    <div>

      <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
        Moderation
      </p>

      <h1 className="mt-1 text-3xl font-extrabold text-navy-900 dark:text-white">
        Content Review
      </h1>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {pending.length} items need review.
      </p>

      <div className="mt-6 grid gap-4">

        {pending.length ? (
          pending.map(
            (destination) => (
              <div
                key={
                  destination.id
                }
                className="card overflow-hidden p-0"
              >

                <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">

                  {/* IMAGE */}

                  <div className="h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-24 sm:w-36 dark:bg-white/10">

                    <img
                      src={getDestinationImage(
                        destination
                      )}
                      alt={
                        destination.name
                      }
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      loading="lazy"
                      onError={
                        handleImageError
                      }
                    />

                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-extrabold text-navy-900 dark:text-white">
                        {
                          destination.name
                        }
                      </h3>

                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                        Pending Review
                      </span>

                    </div>

                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {destination.city ||
                        "India"}{" "}
                      •{" "}
                      {destination.state ||
                        "India"}{" "}
                      •{" "}
                      {destination.category ||
                        "Travel"}
                    </p>

                    {destination.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500 dark:text-slate-300">
                        {
                          destination.description
                        }
                      </p>
                    )}

                  </div>

                  {/* ACTION */}

                  <div className="shrink-0">

                    <button
                      type="button"
                      onClick={() =>
                        verify(
                          destination
                        )
                      }
                      className="btn-primary w-full sm:w-auto"
                    >
                      <CheckCircle2
                        size={16}
                      />
                      Verify
                    </button>

                  </div>

                </div>
              </div>
            )
          )
        ) : (
          <div className="card p-10 text-center">

            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10">
              <CheckCircle2
                size={30}
              />
            </div>

            <p className="mt-4 text-sm font-bold text-navy-900 dark:text-white">
              Everything is reviewed
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Nice work. There are no pending destinations.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

// ============================================================
// SETTINGS
// ============================================================

function SettingsPanel({
  items,
  setItems,
  showToast,
}) {
  const [
    defaultCategory,
    setDefaultCategory,
  ] = useState("Heritage");

  const [
    defaultSeason,
    setDefaultSeason,
  ] = useState("Winter");

  const [
    itemsPerPage,
    setItemsPerPage,
  ] = useState("20");

  const [
    autoVerify,
    setAutoVerify,
  ] = useState(false);

  const [
    showPopularity,
    setShowPopularity,
  ] = useState(true);

  const [
    resetModalOpen,
    setResetModalOpen,
  ] = useState(false);

  // ESCAPE FOR RESET MODAL

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setResetModalOpen(false);
      }
    };

    if (resetModalOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [resetModalOpen]);

  const reset = () => {
    setResetModalOpen(true);
  };

  const confirmReset = () => {
    setItems(initial);

    try {
      localStorage.setItem(
        "tb-admin-items",
        JSON.stringify(initial)
      );
    } catch {
      // Ignore localStorage errors
    }

    setResetModalOpen(false);

    showToast({
      title:
        "Demo catalogue restored",
      message:
        "Your original TravelBharat demo catalogue has been restored successfully.",
    });
  };

  const savePreferences = () => {
    showToast({
      title: "Settings saved",
      message:
        "Your workspace preferences have been updated.",
    });
  };

  const verifiedCount =
    items.filter(
      (item) =>
        item.status === "Verified"
    ).length;

  const pendingCount =
    items.filter(
      (item) =>
        item.status ===
        "Pending Review"
    ).length;

  return (
    <div>

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
          Workspace
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-navy-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Manage your TravelBharat workspace, catalogue preferences and content settings.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">

        {/* LEFT */}

        <div className="grid gap-6">

          {/* ADMIN PROFILE */}

          <div className="card p-6">

            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="font-extrabold text-navy-900 dark:text-white">
                  Admin Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Manage your workspace administrator information.
                </p>

              </div>

              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-sm font-extrabold text-orange-600 dark:bg-orange-500/10">
                A
              </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div>

                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Display Name
                </label>

                <div className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-navy-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
                  TravelBharat Admin
                </div>

              </div>

              <div>

                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Role
                </label>

                <div className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-navy-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
                  Content Administrator
                </div>

              </div>

            </div>
          </div>

          {/* CATALOGUE PREFERENCES */}

          <div className="card p-6">

            <div>

              <h2 className="font-extrabold text-navy-900 dark:text-white">
                Catalogue Preferences
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Customize the default settings for your tourism catalogue.
              </p>

            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200">

                Default Category

                <select
                  value={
                    defaultCategory
                  }
                  onChange={(event) =>
                    setDefaultCategory(
                      event.target
                        .value
                    )
                  }
                  className="input"
                >

                  <option value="Heritage">
                    Heritage
                  </option>

                  <option value="Nature">
                    Nature
                  </option>

                  <option value="Religious">
                    Religious
                  </option>

                  <option value="Adventure">
                    Adventure
                  </option>

                </select>
              </label>

              <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200">

                Default Season

                <select
                  value={
                    defaultSeason
                  }
                  onChange={(event) =>
                    setDefaultSeason(
                      event.target
                        .value
                    )
                  }
                  className="input"
                >

                  <option value="Winter">
                    Winter
                  </option>

                  <option value="Summer">
                    Summer
                  </option>

                  <option value="Monsoon">
                    Monsoon
                  </option>

                  <option value="Year-round">
                    Year-round
                  </option>

                </select>
              </label>

              <label className="grid gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200">

                Destinations Per Page

                <select
                  value={
                    itemsPerPage
                  }
                  onChange={(event) =>
                    setItemsPerPage(
                      event.target
                        .value
                    )
                  }
                  className="input"
                >

                  <option value="10">
                    10 destinations
                  </option>

                  <option value="20">
                    20 destinations
                  </option>

                  <option value="30">
                    30 destinations
                  </option>

                  <option value="50">
                    50 destinations
                  </option>

                </select>
              </label>

            </div>
          </div>

          {/* CONTENT PREFERENCES */}

          <div className="card p-6">

            <div>

              <h2 className="font-extrabold text-navy-900 dark:text-white">
                Content Preferences
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Configure how destination content is managed.
              </p>

            </div>

            <div className="mt-5 divide-y divide-slate-100 dark:divide-white/10">

              {/* AUTO VERIFY */}

              <div className="flex items-center justify-between gap-5 py-4">

                <div className="min-w-0">

                  <p className="text-sm font-bold text-navy-900 dark:text-white">
                    Auto-verify new destinations
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Automatically approve newly added destinations.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setAutoVerify(
                      (value) =>
                        !value
                    )
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                    autoVerify
                      ? "bg-orange-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-label="Toggle auto verification"
                  aria-pressed={
                    autoVerify
                  }
                >

                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                      autoVerify
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>

              </div>

              {/* POPULARITY */}

              <div className="flex items-center justify-between gap-5 py-4">

                <div className="min-w-0">

                  <p className="text-sm font-bold text-navy-900 dark:text-white">
                    Show popularity scores
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Display destination popularity information in the catalogue.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowPopularity(
                      (value) =>
                        !value
                    )
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                    showPopularity
                      ? "bg-orange-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-label="Toggle popularity scores"
                  aria-pressed={
                    showPopularity
                  }
                >

                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                      showPopularity
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>

              </div>

            </div>

            <button
              type="button"
              onClick={
                savePreferences
              }
              className="btn-primary mt-5"
            >
              Save Preferences
            </button>

          </div>
        </div>

        {/* RIGHT */}

        <div className="grid content-start gap-6">

          {/* CATALOGUE OVERVIEW */}

          <div className="card p-6">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-extrabold text-navy-900 dark:text-white">
                  Catalogue Overview
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Current content statistics
                </p>

              </div>

              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                <Tags size={18} />
              </div>

            </div>

            <div className="mt-5 grid gap-3">

              <OverviewRow
                label="Destinations"
                value={
                  items.length
                }
              />

              <OverviewRow
                label="States & UTs"
                value={
                  states.length
                }
              />

              <OverviewRow
                label="Categories"
                value={
                  categories.length
                }
              />

              <OverviewRow
                label="Verified"
                value={
                  verifiedCount
                }
                valueClass="text-emerald-600 dark:text-emerald-400"
              />

              <OverviewRow
                label="Pending Review"
                value={
                  pendingCount
                }
                valueClass="text-amber-600 dark:text-amber-400"
              />

            </div>
          </div>

          {/* DATA MANAGEMENT */}

          <div className="card p-6">

            <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
              <Settings size={19} />
            </div>

            <h2 className="mt-4 font-extrabold text-navy-900 dark:text-white">
              Data Management
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Restore the original TravelBharat catalogue whenever you want to start fresh.
            </p>

            <button
              type="button"
              onClick={reset}
              className="btn-secondary mt-5 w-full"
            >
              Reset Demo Catalogue
            </button>

          </div>

          {/* WORKSPACE STATUS */}

          <div className="card overflow-hidden">

            <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white">

              <p className="text-xs font-bold uppercase tracking-widest text-orange-300">
                Workspace
              </p>

              <h2 className="mt-2 text-xl font-extrabold">
                TravelBharat
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/60">
                India tourism content management workspace.
              </p>

              <div className="mt-5 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-semibold text-white/70">
                  Workspace Active
                </span>

              </div>

            </div>

            <div className="p-5">

              <div className="flex items-center justify-between">

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Catalogue status
                </span>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Healthy
                </span>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* RESET MODAL */}

      {resetModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-catalogue-title"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setResetModalOpen(
                false
              );
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-black/20 dark:border-white/10 dark:bg-navy-900">

            <div className="relative p-6 sm:p-7">

              <button
                type="button"
                onClick={() =>
                  setResetModalOpen(
                    false
                  )
                }
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close reset catalogue dialog"
              >
                <X size={18} />
              </button>

              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400">
                <AlertTriangle
                  size={27}
                />
              </div>

              <h2
                id="reset-catalogue-title"
                className="mt-5 pr-8 text-xl font-extrabold text-navy-900 dark:text-white"
              >
                Reset demo catalogue?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
                This will restore the original TravelBharat demo catalogue and replace your current catalogue data.
              </p>

              <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">

                <p className="text-xs font-extrabold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                  What will be reset
                </p>

                <ul className="mt-3 grid gap-2.5 text-sm text-slate-600 dark:text-slate-300">

                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-orange-500"
                    />

                    <span>
                      Current destination changes
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-orange-500"
                    />

                    <span>
                      Added or deleted destinations
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-orange-500"
                    />

                    <span>
                      Destination status changes
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-orange-500"
                    />

                    <span>
                      Saved catalogue data in this browser
                    </span>
                  </li>

                </ul>
              </div>

              <div className="mt-4 flex gap-2.5 rounded-xl bg-slate-50 p-3.5 dark:bg-white/5">

                <AlertTriangle
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-500"
                />

                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Your current catalogue changes will be replaced by the original demo data. This action cannot be undone.
                </p>

              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setResetModalOpen(
                      false
                    )
                  }
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    confirmReset
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20 sm:w-auto"
                >
                  <CheckCircle2
                    size={16}
                  />
                  Reset Catalogue
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// OVERVIEW ROW
// ============================================================

function OverviewRow({
  label,
  value,
  valueClass =
    "text-navy-900 dark:text-white",
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-white/5">

      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span
        className={`font-extrabold ${valueClass}`}
      >
        {value}
      </span>

    </div>
  );
}