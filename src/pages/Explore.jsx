import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'

import { destinations } from '../data/destinations'
import { states } from '../data/states'

import DestinationCard from '../components/DestinationCard'
import FilterBar from '../components/FilterBar'
import EmptyState from '../components/EmptyState'
import SEO from '../components/SEO'

import {
  defaultFilters,
  filterAndSortDestinations,
} from '../utils/discovery'

export default function Explore() {
  const [filters, setFilters] = useState(defaultFilters)
  const [q, setQ] = useState('')

  const navigate = useNavigate()

  const submitSearch = (e) => {
    e.preventDefault()

    const query = q.trim()

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    } else {
      navigate('/search')
    }
  }

  const results = useMemo(() => {
    return filterAndSortDestinations(
      destinations,
      q,
      filters
    )
  }, [q, filters])

  const clearFilters = () => {
    setFilters(defaultFilters)
    setQ('')
  }

  return (
    <>
      <SEO
        title="Explore India"
        description="Search and filter destinations across Indian states and union territories by city, category, season and popularity."
      />

      <div className="bg-slate-50/60 dark:bg-navy-950">
        {/* Hero / Search Section */}
        <section className="dark-surface">
          <div className="container-page py-14 sm:py-16">
            <p className="eyebrow text-orange-300">
              Discover More
            </p>

            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
              Explore India
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Search and filter a curated collection of destinations
              across states, cities and travel categories.
            </p>

            {/* Search */}
            <form
              onSubmit={submitSearch}
              className="mt-7 flex w-full max-w-2xl items-center rounded-2xl bg-white p-1.5 shadow-xl shadow-black/10"
            >
              <span className="ml-1 grid h-11 w-11 shrink-0 place-items-center sm:ml-2">
                <Search
                  className="text-slate-400"
                  size={19}
                />
              </span>

              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="search-bar-input explore-search-input min-w-0 flex-1 px-3 py-3 text-sm outline-none"
                placeholder="Search Taj Mahal, Rajasthan, Nature..."
                aria-label="Search destinations"
              />

              <button
                type="submit"
                className="btn-primary shrink-0"
              >
                <SlidersHorizontal size={17} />
                <span className="hidden sm:inline">
                  Explore
                </span>
              </button>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <div className="container-page section-pad">
          {/* Filters */}
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            states={states}
          />

          {/* Result Count */}
          <div className="mb-5 mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-extrabold text-navy-900 dark:text-white">
              {results.length}{' '}
              {results.length === 1
                ? 'destination'
                : 'destinations'}
            </h2>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Updated with local catalogue data
            </span>
          </div>

          {/* Destination Results */}
          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  d={destination}
                />
              ))}
            </div>
          ) : (
            <EmptyState onClear={clearFilters} />
          )}
        </div>
      </div>
    </>
  )
}