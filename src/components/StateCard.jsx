import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "../data/destinations";

export default function StateCard({ state }) {
  const destinationCount = destinations.filter(
    (destination) => destination.state === state.name
  ).length;

  return (
    <article className="card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={`/state/${state.id}`}
        className="block"
        aria-label={`Explore ${state.name}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={state.image}
            alt={`${state.name} landscape`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

          {/* Image Content */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-300">
                {state.type}
              </span>

              <h3 className="mt-1 text-lg font-extrabold">
                {state.name}
              </h3>
            </div>

            <span className="state-card-arrow grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/20 bg-navy-950/55 text-white shadow-sm backdrop-blur transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {state.capital} • {destinationCount} featured destinations
          </p>

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
            {state.description}
          </p>
        </div>
      </Link>
    </article>
  );
}