import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  MapPinned,
} from "lucide-react";

import { destinations } from "../data/destinations";
import ImageGallery from "../components/ImageGallery";
import InfoCard from "../components/InfoCard";
import DestinationCard from "../components/DestinationCard";
import SEO from "../components/SEO";

export default function DestinationDetails() {
  const { destinationId } = useParams();

  // Check whether this page was opened from Admin Panel
  const [searchParams] = useSearchParams();
  const fromAdmin = searchParams.get("from") === "admin";

  const destination = destinations.find(
    (item) => item.id === destinationId
  );

  // Destination Not Found
  if (!destination) {
    return (
      <>
        <SEO
          title="Destination Not Found"
          description="The requested TravelBharat destination could not be found."
        />

        <div className="container-page section-pad text-center">
          <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">
            Destination not found
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">
            This place may have moved from the TravelBharat catalogue.
          </p>

          <Link
            to={fromAdmin ? "/admin?view=destinations" : "/explore"}
            className="btn-primary mt-6 inline-flex"
          >
            {fromAdmin ? "Back to Destinations" : "Explore India"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </>
    );
  }

  // Nearby Attractions
  const nearby = (destination.nearbyAttractions || [])
    .map((id) => destinations.find((item) => item.id === id))
    .filter(Boolean);

  // Google Maps URL
  const mapQuery =
    destination.location || `${destination.name}, ${destination.city}`;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery
  )}`;

  return (
    <>
      <SEO
        title={destination.name}
        description={`${destination.name} in ${destination.city}, ${destination.state}: history, best time to visit, timings, entry information and nearby attractions.`}
        image={destination.images?.[0]}
      />

      <div className="bg-white dark:bg-navy-950">
        {/* Back Navigation */}
        <div className="container-page pt-6 sm:pt-8">
          {fromAdmin ? (
            <Link
              to="/admin?view=destinations"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-orange-500 dark:text-slate-400"
            >
              <ArrowLeft size={16} />
              Back to Destinations
            </Link>
          ) : (
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-orange-500 dark:text-slate-400"
            >
              <ArrowLeft size={16} />
              Back to Explore
            </Link>
          )}
        </div>

        {/* Main Content */}
        <div className="container-page section-pad">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_.6fr]">
            {/* Main Column */}
            <main className="min-w-0">
              {/* Gallery */}
              <ImageGallery
                images={destination.images}
                name={destination.name}
              />

              {/* Destination Information */}
              <div className="mt-7">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-orange-50 px-3 py-1.5 font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                    {destination.category}
                  </span>

                  {destination.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <CheckCircle2 size={13} />
                      Verified
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-4xl lg:text-5xl">
                  {destination.name}
                </h1>

                {/* Location & Popularity */}
                <p className="mt-3 flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <MapPinned size={15} />

                  <span>
                    {destination.city}, {destination.state}
                  </span>

                  <span className="mx-1">•</span>

                  <span>
                    Popularity {destination.popularity}/100
                  </span>
                </p>

                {/* Description */}
                <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {destination.description}
                </p>

                {/* About */}
                <section className="mt-10">
                  <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white">
                    About the destination
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {destination.description} This destination offers a
                    memorable window into India&apos;s geography, history
                    and local character.
                  </p>
                </section>

                {/* Historical Significance */}
                <section className="mt-10">
                  <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white">
                    Historical &amp; Cultural Significance
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {destination.historicalSignificance}
                  </p>
                </section>

                {/* Best Time */}
                <section className="mt-10 rounded-2xl bg-orange-50 p-6 dark:bg-orange-500/10">
                  <h2 className="text-lg font-extrabold text-navy-900 dark:text-white">
                    Best Time to Visit
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {destination.bestTimeToVisit}. Check local conditions
                    before travelling and plan around opening hours and
                    seasonal weather.
                  </p>
                </section>
              </div>
            </main>

            {/* Sidebar */}
            <aside>
              <div className="space-y-5 lg:sticky lg:top-24">
                <InfoCard d={destination} />

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full"
                >
                  <ExternalLink size={16} />
                  View Location on Map
                </a>
              </div>
            </aside>
          </div>

          {/* Nearby Attractions */}
          {nearby.length > 0 && (
            <section className="mt-16">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Keep Exploring</p>

                  <h2 className="section-title">
                    Nearby Attractions
                  </h2>
                </div>

                <Link
                  to="/explore"
                  className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 transition hover:text-orange-700"
                >
                  View all
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {nearby.map((item) => (
                  <DestinationCard
                    key={item.id}
                    d={item}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}