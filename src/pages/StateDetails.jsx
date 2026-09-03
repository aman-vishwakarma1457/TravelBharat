import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Compass,
  Sparkles,
} from "lucide-react";

import { states } from "../data/states";
import { destinations } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";
import SEO from "../components/SEO";

function safeDecode(value) {
  try {
    return decodeURIComponent(value || "");
  } catch {
    return value || "";
  }
}

function normalizeState(value) {
  return safeDecode(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function StateDetails() {
  const { stateName } = useParams();
  const [searchParams] = useSearchParams();

  const decodedStateName = safeDecode(stateName);

  // Check whether user came from Admin Panel → States
  const fromAdmin = searchParams.get("from") === "admin-states";

  /*
    Match state using:
    1. id
    2. exact name
    3. normalized id
    4. normalized name

    This makes URLs from States page/Admin panel work reliably.
  */
  const state = states.find((item) => {
    const itemId = String(item.id || "").trim();
    const itemName = String(item.name || "").trim();

    return (
      itemId === decodedStateName ||
      itemName === decodedStateName ||
      normalizeState(itemId) === normalizeState(decodedStateName) ||
      normalizeState(itemName) === normalizeState(decodedStateName)
    );
  });

  // Invalid state
  if (!state) {
    return (
      <>
        <SEO
          title="State Not Found"
          description="The requested Indian state or union territory could not be found."
        />

        <NotFoundState />
      </>
    );
  }

  const stateDestinations = destinations.filter(
    (destination) =>
      normalizeState(destination.state) === normalizeState(state.name)
  );

  const categories = [
    "Heritage",
    "Nature",
    "Religious",
    "Adventure",
  ];

  const highlights =
    state.highlights?.length > 0
      ? state.highlights
      : state.cities || [];

  return (
    <>
      <SEO
        title={state.name}
        description={`Explore ${state.name}: cities, destinations, travel highlights, best time to visit and experiences on TravelBharat.`}
        image={state.image}
      />

      <div className="min-h-screen bg-white dark:bg-navy-950">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={state.image}
            alt={`${state.name} travel`}
            className="h-[430px] w-full object-cover"
            onError={(event) => {
              event.currentTarget.src =
                "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

          <div className="container-page absolute inset-x-0 bottom-0 pb-12 text-white">
            {/* Back Button */}
            {fromAdmin ? (
              <Link
                to="/admin?view=states"
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-orange-500"
              >
                ← Back to States
              </Link>
            ) : (
              <Link
                to="/states"
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-orange-500"
              >
                ← Back to States
              </Link>
            )}

            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-300">
              {state.type} • {state.capital}
            </div>

            <h1 className="text-5xl font-extrabold sm:text-6xl">
              {state.name}
            </h1>

            <p className="mt-3 max-w-2xl text-white/80">
              {state.tagline || state.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container-page section-pad">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Main */}
            <main>
              {/* About */}
              <section>
                <p className="eyebrow">About the State</p>

                <h2 className="section-title">
                  {state.name} at a glance
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {state.description} Discover local architecture,
                  cuisine, landscapes, traditions and memorable
                  experiences through the destinations below.
                </p>
              </section>

              {/* Cities */}
              {state.cities?.length > 0 && (
                <section className="mt-8">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {state.cities.map((city) => (
                      <div
                        key={city}
                        className="card p-5 transition hover:-translate-y-1 hover:border-orange-200"
                      >
                        <MapPin
                          className="text-orange-500"
                          size={22}
                        />

                        <h3 className="mt-3 font-extrabold text-navy-900 dark:text-white">
                          {city}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Popular city
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Destinations */}
              <section className="mt-14">
                <p className="eyebrow">Top Destinations</p>

                <h2 className="section-title">
                  Places worth discovering
                </h2>

                {stateDestinations.length > 0 ? (
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    {stateDestinations.map((destination) => (
                      <DestinationCard
                        key={destination.id}
                        d={destination}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="card mt-6 p-8 text-sm text-slate-500 dark:text-slate-400">
                    More curated destinations for this state
                    are coming to the catalogue.
                  </div>
                )}
              </section>

              {/* Categories */}
              <section className="mt-14">
                <p className="eyebrow">
                  Explore by Category
                </p>

                <h2 className="section-title">
                  Choose your experience
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}?state=${encodeURIComponent(
                        state.name
                      )}`}
                      className="card flex items-center justify-between p-5 font-bold text-navy-900 transition hover:-translate-y-1 hover:border-orange-300 hover:text-orange-600 dark:text-white"
                    >
                      <span>{category}</span>

                      <ArrowRight size={17} />
                    </Link>
                  ))}
                </div>
              </section>
            </main>

            {/* Sidebar */}
            <aside>
              <div className="card sticky top-24 p-5">
                <h3 className="font-extrabold text-navy-900 dark:text-white">
                  Travel Highlights
                </h3>

                <div className="mt-5 grid gap-4">
                  <HighlightItem
                    icon={CalendarDays}
                    label="Best time"
                    value={
                      state.bestTime ||
                      "October – March"
                    }
                  />

                  <HighlightItem
                    icon={Compass}
                    label="Featured cities"
                    value={
                      state.cities?.join(", ") ||
                      "Not available"
                    }
                  />

                  <HighlightItem
                    icon={Sparkles}
                    label="Highlights"
                    value={
                      highlights.length > 0
                        ? highlights.join(" • ")
                        : "Not available"
                    }
                  />

                  <HighlightItem
                    icon={MapPin}
                    label="Capital"
                    value={
                      state.capital ||
                      "Not available"
                    }
                  />
                </div>

                <Link
                  to="/explore"
                  className="btn-primary mt-6 w-full"
                >
                  Explore More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* Highlight Item */

function HighlightItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
        <Icon size={17} />
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}

/* Not Found */

function NotFoundState() {
  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-20">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
          404
        </p>

        <h1 className="mt-2 text-4xl font-extrabold text-navy-900 dark:text-white">
          State not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500 dark:text-slate-400">
          The state or union territory you are looking for
          could not be found.
        </p>

        <Link
          className="btn-primary mt-6 inline-flex"
          to="/states"
        >
          Explore States
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}