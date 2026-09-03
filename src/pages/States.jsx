import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import StateCard from '../components/StateCard'
import SEO from '../components/SEO'
import { states } from '../data/states'

export default function States() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('All')

  // Filter states and union territories
  const list = useMemo(() => {
    const searchQuery = q.trim().toLowerCase()

    return states.filter((state) => {
      const matchesType =
        type === 'All' || state.type === type

      const searchableText =
        `${state.name} ${state.capital}`.toLowerCase()

      const matchesSearch =
        !searchQuery || searchableText.includes(searchQuery)

      return matchesType && matchesSearch
    })
  }, [q, type])

  return (
    <>
      <SEO
        title="States & Union Territories"
        description="Browse all Indian states and union territories and discover their cities and destinations."
      />

      <div className="min-h-screen bg-slate-50/60 dark:bg-navy-950">
        {/* Page Header */}
        <section className="dark-surface">
          <div className="container-page py-16">
            <p className="eyebrow text-orange-300">
              Explore India
            </p>

            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              States & Union Territories
            </h1>

            <p className="mt-3 max-w-2xl text-white/70">
              Explore every Indian state and union territory,
              from the Himalayas to the Indian Ocean.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="container-page section-pad">
          {/* Search + Filters */}
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
                aria-hidden="true"
              />

              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search states or capitals..."
                aria-label="Search states or capitals"
                className="input w-full pl-11"
              />
            </div>

            {/* Type Filter */}
            <div className="flex overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-navy-900">
              <FilterButton
                active={type === 'All'}
                onClick={() => setType('All')}
              >
                All
              </FilterButton>

              <FilterButton
                active={type === 'State'}
                onClick={() => setType('State')}
              >
                States
              </FilterButton>

              <FilterButton
                active={type === 'UT'}
                onClick={() => setType('UT')}
              >
                UTs
              </FilterButton>
            </div>
          </div>

          {/* Result Count */}
          <div className="mb-6 mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {list.length}{' '}
              {list.length === 1 ? 'result' : 'results'}
            </p>

            {(q || type !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setQ('')
                  setType('All')
                }}
                className="text-sm font-bold text-orange-500 transition hover:text-orange-600"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* States Grid */}
          {list.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((state) => (
                <StateCard
                  key={state.id}
                  state={state}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              query={q}
              onClear={() => {
                setQ('')
                setType('All')
              }}
            />
          )}
        </main>
      </div>
    </>
  )
}

/* Filter Button */

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition ${
        active
          ? 'bg-navy-900 text-white dark:bg-orange-500'
          : 'text-slate-500 hover:bg-slate-100 hover:text-navy-900 dark:text-slate-400 dark:hover:bg-navy-800 dark:hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

/* Empty State*/

function EmptyState({ query, onClear }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10">
        <Search size={22} />
      </div>

      <h2 className="mt-5 text-xl font-extrabold text-navy-900 dark:text-white">
        No states found
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {query
          ? `We couldn't find any state or union territory matching "${query}".`
          : 'No states or union territories match the selected filter.'}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="btn-primary mt-6"
      >
        Clear Filters
      </button>
    </div>
  )
}