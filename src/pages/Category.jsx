import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { categories } from "../data/categories";
import { destinations } from "../data/destinations";
import { states } from "../data/states";

import DestinationCard from "../components/DestinationCard";
import FilterBar from "../components/FilterBar";
import SEO from "../components/SEO";

import {
  defaultFilters,
  filterAndSortDestinations,
} from "../utils/discovery";

export default function Category() {
  const { categoryName } = useParams();
  const [params] = useSearchParams();

  const category = categories.find(
    (item) => item.id === categoryName?.toLowerCase()
  );

  const stateFromUrl = params.get("state") || "";

  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    state: stateFromUrl,
  }));

  const results = useMemo(() => {
    if (!category) {
      return [];
    }

    const categoryDestinations = destinations.filter(
      (destination) =>
        destination.category?.toLowerCase() === category.id
    );

    return filterAndSortDestinations(
      categoryDestinations,
      "",
      filters
    );
  }, [category, filters]);

  // Category Not Found
  if (!category) {
    return (
      <>
        <SEO
          title="Category Not Found"
          description="The requested TravelBharat category could not be found."
        />

        <div className="container-page section-pad text-center">
          <h1 className="text-4xl font-extrabold text-navy-900 dark:text-white">
            Category not found
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-500 dark:text-slate-400">
            The category you are looking for does not exist or may have
            been removed.
          </p>

          <Link
            to="/explore"
            className="btn-primary mt-6 inline-flex items-center gap-2"
          >
            Explore India
            <ArrowRight size={16} />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={category.name}
        description={`${category.description} Discover curated ${category.name.toLowerCase()} destinations across India.`}
        image={category.image}
      />

      <div className="bg-slate-50/60 dark:bg-navy-950">
        {/* Category Hero */}
        <section className="relative overflow-hidden bg-navy-950">
          <img
            src={category.image}
            alt={category.name}
            className="h-[320px] w-full object-cover opacity-70 sm:h-[360px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/60 to-transparent" />

          <div className="container-page absolute inset-0 flex items-center text-white">
            <div className="max-w-2xl">
              <p className="eyebrow text-orange-300">
                Explore by Category
              </p>

              <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
                {category.name}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container-page section-pad">
          {/* Filters */}
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            states={states}
            showCity={false}
          />

          {/* Heading */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">
                {results.length}{" "}
                {results.length === 1
                  ? "destination"
                  : "destinations"}
              </p>

              <h2 className="section-title">
                Featured {category.name} destinations
              </h2>
            </div>

            <Link
              to="/explore"
              className="hidden items-center gap-1 text-sm font-bold text-orange-600 transition hover:text-orange-700 sm:flex"
            >
              Explore all
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Destination Grid */}
          {results.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  d={destination}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center dark:border-white/10 dark:bg-navy-900">
              <h3 className="text-xl font-extrabold text-navy-900 dark:text-white">
                No destinations found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Try changing your filters to discover more{" "}
                {category.name.toLowerCase()} destinations.
              </p>

              <button
                type="button"
                onClick={() =>
                  setFilters({
                    ...defaultFilters,
                    state: stateFromUrl,
                  })
                }
                className="btn-primary mt-6"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Mobile Explore Link */}
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              to="/explore"
              className="inline-flex items-center gap-1 text-sm font-bold text-orange-600"
            >
              Explore all destinations
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}