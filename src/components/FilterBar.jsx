import { X, SlidersHorizontal } from 'lucide-react'

export default function FilterBar({
  filters,
  setFilters,
  states,
  showCity = true,
  showAdvanced = true,
}) {
  const update = (key, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }))
  }

  const clear = () => {
    setFilters({
      state: '',
      city: '',
      category: '',
      bestTime: '',
      popularity: 'all',
      sort: 'popular',
    })
  }

  const hasFilters =
    Boolean(filters.state) ||
    Boolean(filters.city) ||
    Boolean(filters.category) ||
    Boolean(filters.bestTime) ||
    filters.popularity !== 'all' ||
    filters.sort !== 'popular'

  return (
    <div className="card p-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* State */}
        <select
          aria-label="Filter by state or union territory"
          className="input w-full lg:max-w-[220px]"
          value={filters.state}
          onChange={(e) => update('state', e.target.value)}
        >
          <option value="">All states & UTs</option>

          {states.map((state) => (
            <option
              key={state.id}
              value={state.name}
            >
              {state.name}
            </option>
          ))}
        </select>

        {/* City */}
        {showCity && (
          <input
            type="text"
            aria-label="Filter by city"
            className="input w-full lg:max-w-[220px]"
            placeholder="City"
            value={filters.city}
            onChange={(e) => update('city', e.target.value)}
          />
        )}

        {/* Category */}
        <select
          aria-label="Filter by category"
          className="input w-full lg:max-w-[220px]"
          value={filters.category}
          onChange={(e) => update('category', e.target.value)}
        >
          <option value="">All categories</option>

          {['Heritage', 'Nature', 'Religious', 'Adventure'].map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>

        {/* Advanced Filters */}
        {showAdvanced && (
          <>
            {/* Best Time */}
            <select
              aria-label="Filter by best time to visit"
              className="input w-full lg:max-w-[210px]"
              value={filters.bestTime}
              onChange={(e) =>
                update('bestTime', e.target.value)
              }
            >
              <option value="">Any best time</option>
              <option value="Winter">Winter friendly</option>
              <option value="Summer">Summer friendly</option>
              <option value="Monsoon">
                Monsoon friendly
              </option>
              <option value="Year-round">Year-round</option>
            </select>

            {/* Popularity */}
            <select
              aria-label="Filter by popularity"
              className="input w-full lg:max-w-[190px]"
              value={filters.popularity}
              onChange={(e) =>
                update('popularity', e.target.value)
              }
            >
              <option value="all">Any popularity</option>
              <option value="90">90+ popular</option>
              <option value="75">75+ popular</option>
              <option value="60">60+ popular</option>
            </select>

            {/* Sort */}
            <select
              aria-label="Sort destinations"
              className="input w-full lg:max-w-[190px]"
              value={filters.sort}
              onChange={(e) =>
                update('sort', e.target.value)
              }
            >
              <option value="popular">Most popular</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
            </select>
          </>
        )}

        {/* Clear Filters */}
        {hasFilters && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-bold text-orange-600 transition hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
            aria-label="Clear all filters"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>

      {/* Advanced Filter Info */}
      {showAdvanced && (
        <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
          <SlidersHorizontal
            size={14}
            aria-hidden="true"
          />

          <span>
            Advanced discovery filters are powered by local
            catalogue data.
          </span>
        </div>
      )}
    </div>
  )
}