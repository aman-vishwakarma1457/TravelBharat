import { useState } from "react";
import { Link } from "react-router-dom";
import { states } from "../data/states";

// Lightweight, dependency-free interactive India discovery map.
// Every state/UT gets an accessible discovery point linked to its route.

const positions = [
  [40, 18],
  [115, 16],
  [184, 24],
  [72, 42],
  [138, 44],
  [208, 50],
  [258, 62],
  [309, 70],
  [360, 76],

  [86, 75],
  [145, 72],
  [205, 78],
  [264, 88],
  [320, 101],
  [372, 111],

  [105, 105],
  [166, 111],
  [224, 118],
  [284, 129],
  [342, 137],
  [395, 150],

  [137, 143],
  [196, 151],
  [252, 161],
  [306, 171],
  [359, 182],

  [198, 190],
  [253, 199],
  [309, 211],
  [361, 223],
  [414, 239],

  [287, 240],
  [340, 253],
  [395, 268],
  [450, 282],
  [360, 303],
];

export default function IndiaMap() {
  const [hovered, setHovered] = useState(null);

  const active =
    hovered === null || !states[hovered] ? null : states[hovered];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-orange-50 via-white to-emerald-50 p-3 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900">
      <svg
        viewBox="0 0 500 340"
        className="h-full w-full"
        role="img"
        aria-labelledby="india-map-title india-map-desc"
      >
        <title id="india-map-title">
          Interactive map of India
        </title>

        <desc id="india-map-desc">
          Select a state or union territory to explore its destinations.
        </desc>

        {/* India silhouette */}
        <path
          d="M82 26 C145 2 225 8 284 34 C350 61 423 86 448 139 C462 170 442 196 420 213 C401 228 399 259 374 279 C348 300 331 318 303 323 C275 328 253 310 235 289 C213 264 193 243 171 222 C149 201 120 188 105 163 C87 134 72 107 62 80 C52 54 59 34 82 26Z"
          fill="currentColor"
          className="text-orange-100 dark:text-navy-700"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Decorative map lines */}
        <path
          d="M100 50 C165 29 238 39 293 63
             M92 83 C176 62 271 75 358 107
             M108 119 C202 102 292 119 398 151
             M127 157 C221 145 314 162 400 188
             M158 196 C244 187 319 202 380 225
             M196 234 C258 226 320 242 350 258"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.22"
          className="text-navy-900 dark:text-white"
        />

        {/* State / UT discovery points */}
        {states.map((state, index) => {
          const position = positions[index];

          // Safety check in case states and positions don't match.
          if (!position) return null;

          const [x, y] = position;

          return (
            <Link
              key={state.id}
              to={`/state/${state.id}`}
              aria-label={`Explore ${state.name}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
            >
              <g
                transform={`translate(${x} ${y})`}
                className="group cursor-pointer"
              >
                <rect
                  x="-18"
                  y="-9"
                  width="36"
                  height="18"
                  rx="9"
                  strokeWidth="1.5"
                  className="fill-white stroke-navy-900/10 transition group-hover:fill-orange-500 group-hover:stroke-orange-500 dark:fill-navy-800 dark:stroke-white/10"
                />

                <circle
                  r="3"
                  className="fill-orange-500 transition group-hover:fill-white"
                />

                <title>{state.name}</title>
              </g>
            </Link>
          );
        })}
      </svg>

      {/* Active state label */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-white/70 bg-white/90 px-3 py-2 text-[10px] font-bold text-navy-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-navy-900/90 dark:text-white">
        {active
          ? `${active.name} • ${active.type}`
          : "Hover or select a region"}
      </div>

      {/* Map legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/70 bg-white/90 px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-navy-900/90 dark:text-slate-200">
        <span className="inline-flex items-center gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          State / UT
        </span>

        <span>36 regions</span>
      </div>
    </div>
  );
}