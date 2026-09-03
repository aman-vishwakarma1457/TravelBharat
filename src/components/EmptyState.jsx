import { SearchX } from 'lucide-react'

export default function EmptyState({
  title = 'No destinations found',
  text = 'Try changing your search or filters.',
  onClear,
}) {
  return (
    <div className="card grid place-items-center px-6 py-16 text-center">
      {/* Icon */}
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
        <SearchX
          size={24}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-extrabold text-navy-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>

      {/* Clear Button */}
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="btn-secondary mt-5"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}