import { MapPinned } from "lucide-react";

export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Logo Icon */}
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500 ring-1 ring-orange-100 dark:bg-orange-500/10 dark:ring-orange-500/20">
        <MapPinned
          size={25}
          strokeWidth={2.4}
          aria-hidden="true"
        />
      </div>

      {/* Logo Text */}
      <div className="leading-none">
        <div
          className={`text-xl font-extrabold tracking-tight ${
            light
              ? "text-white"
              : "text-navy-900 dark:text-white"
          }`}
        >
          Travel<span className="text-orange-500">Bharat</span>
        </div>

        <div
          className={`mt-1 text-[9px] font-medium ${
            light
              ? "text-white/70"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          Discover India, One State at a Time
        </div>
      </div>
    </div>
  );
}