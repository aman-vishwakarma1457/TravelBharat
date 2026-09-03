import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'

import { destinations } from '../data/destinations'
import { states } from '../data/states'

import DestinationCard from '../components/DestinationCard'
import EmptyState from '../components/EmptyState'
import FilterBar from '../components/FilterBar'
import SEO from '../components/SEO'

import {
  defaultFilters,
  filterAndSortDestinations,
} from '../utils/discovery'

export default function SearchResults() {
  const [params, setParams] = useSearchParams()

  const [q, setQ] = useState(
    params.get('q') || ''
  )

  const [filters, setFilters] = useState(
    defaultFilters
  )

  /* Keep search input synced with URL */
  useEffect(() => {
    setQ(params.get('q') || '')
  }, [params])

  /* Filter and sort results */
  const results = useMemo(() => {
    return filterAndSortDestinations(
      destinations,
      q,
      filters
    )
  }, [q, filters])

  /* Search submit */
  const submit = (e) => {
    e.preventDefault()

    const query = q.trim()

    if (query) {
      setParams({ q: query })
    } else {
      setParams({})
    }
  }

  /* Clear everything */
  const clearSearch = () => {
    setQ('')
    setFilters(defaultFilters)
    setParams({})
  }

  return (
    <>
      <SEO
        title={
          q
            ? `Search: ${q}`
            : 'Search India'
        }
        description="Find Indian destinations by destination name, state, city, category, season and popularity."
      />

      <div className="bg-slate-50/60 dark:bg-navy-950">
        {/* SEARCH HERO*/}
        <section className="dark-surface">
          <div className="container-page py-12 sm:py-14">
            <p className="eyebrow text-orange-300">
              Search &amp; Discovery
            </p>

            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              Find your next place in India
            </h1>

            {/* Search Form */}
            <form
              onSubmit={submit}
              className="mt-6 flex w-full max-w-2xl items-center rounded-2xl bg-white p-1.5 shadow-xl shadow-black/10"
            >
              <span className="ml-1 flex h-11 w-11 shrink-0 items-center justify-center sm:ml-2">
                <Search
                  className="text-slate-400"
                  size={19}
                />
              </span>

              <input
                type="text"
                value={q}
                onChange={(e) =>
                  setQ(e.target.value)
                }
                className="search-bar-input min-w-0 flex-1 px-3 py-3 text-sm outline-none"
                placeholder="Search destination, state, city or category"
                aria-label="Search destinations"
              />

              <button
                type="submit"
                className="btn-primary shrink-0"
              >
                <span className="hidden sm:inline">
                  Search
                </span>

                <Search
                  size={17}
                  className="sm:hidden"
                />
              </button>
            </form>
          </div>
        </section>

        {/*RESULTS*/}
        <div className="container-page section-pad">
          {/* Filters */}
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            states={states}
          />

          {/* Result Information */}
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {results.length}{' '}
              {results.length === 1
                ? 'result'
                : 'results'}

              {q && (
                <>
                  {' '}
                  for{' '}
                  <strong className="font-bold text-navy-900 dark:text-white">
                    &ldquo;{q}&rdquo;
                  </strong>
                </>
              )}
            </p>

            {results.length > 0 && (
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Showing matching destinations
              </span>
            )}
          </div>

          {/* {DESTINATION RESULTS} */}
          <div className="mt-5">
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
              <EmptyState
                onClear={clearSearch}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}