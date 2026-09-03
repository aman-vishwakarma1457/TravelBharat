import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'

export default function DestinationCard({ d, compact = false }) {
  const image =
    d.images?.[0] ||
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80'

  return (
    <article
      className={`card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        compact ? '' : ''
      }`}
    >
      <Link
        to={`/destination/${d.id}`}
        className="block"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-navy-800">
          <img
            src={image}
            alt={d.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80'
            }}
          />

          {/* Image Labels */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="image-label rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-bold shadow-sm backdrop-blur">
              {d.category}
            </span>

            <span className="rounded-lg bg-navy-950/75 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm backdrop-blur">
              {d.popularity ?? 0}/100
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-bold text-navy-900 dark:text-white">
                {d.name}
              </h3>

              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <MapPin size={12} aria-hidden="true" />

                <span>
                  {d.city}, {d.state}
                </span>
              </p>
            </div>

            {/* Arrow */}
            <span className="destination-card-arrow grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-navy-900 shadow-sm transition group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-500 dark:border-white/10 dark:bg-navy-800 dark:text-slate-200 dark:group-hover:border-orange-500/30 dark:group-hover:bg-orange-500/10 dark:group-hover:text-orange-400">
              <ArrowUpRight
                size={15}
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Extra Information */}
          {!compact && (
            <>
              <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
                <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-navy-800 dark:text-slate-300">
                  Best: {d.bestTimeToVisit || 'Year-round'}
                </span>

                <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-navy-800 dark:text-slate-300">
                  Popularity {d.popularity ?? 0}/100
                </span>
              </div>

              <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {d.description}
              </p>
            </>
          )}
        </div>
      </Link>
    </article>
  )
}