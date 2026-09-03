import {
  Clock3,
  IndianRupee,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function InfoCard({ d }) {
  const items = [
    {
      icon: MapPin,
      label: "Location",
      value: d?.location || "Not available",
    },
    {
      icon: CalendarDays,
      label: "Best Time",
      value: d?.bestTimeToVisit || d?.bestSeason || "Not available",
    },
    {
      icon: IndianRupee,
      label: "Entry Fee",
      value: d?.entryFee || "Not available",
    },
    {
      icon: Clock3,
      label: "Timings",
      value: d?.timings || "Not available",
    },
  ];

  return (
    <div className="card p-5">
      <h3 className="font-extrabold text-navy-900 dark:text-white">
        Quick Information
      </h3>

      <div className="mt-5 grid gap-4">
        {items.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-3"
          >
            {/* Icon */}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
              <Icon size={17} />
            </span>

            {/* Information */}
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {label}
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-navy-900 dark:text-slate-100">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}