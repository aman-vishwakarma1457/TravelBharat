import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Landmark,
  Mountain,
  Church,
  TentTree,
} from 'lucide-react'

import { destinations } from '../data/destinations'

const icons = {
  Heritage: Landmark,
  Nature: Mountain,
  Religious: Church,
  Adventure: TentTree,
}

const accentColors = {
  orange: 'text-orange-600 dark:text-orange-400',
  green: 'text-emerald-700 dark:text-emerald-400',
  purple: 'text-violet-700 dark:text-violet-400',
  blue: 'text-blue-700 dark:text-blue-400',
}

export default function CategoryCard({ category }) {
  const Icon = icons[category.name] || Landmark

  const count = destinations.filter(
    (destination) => destination.category === category.name
  ).length

  const accent =
    accentColors[category.color] ||
    'text-orange-600 dark:text-orange-400'

  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-navy-800"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />

        {/* Category Icon */}
        <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/90 shadow backdrop-blur">
          <Icon
            className={accent}
            size={21}
            aria-hidden="true"
          />
        </div>

        {/* Category Information */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-extrabold">
            {category.name}
          </h3>

          <p className="mt-1 text-xs text-white/85">
            {category.short}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between p-4 text-xs font-bold">
        <span className={accent}>
          {count}{' '}
          {count === 1 ? 'Destination' : 'Destinations'}
        </span>

        <span className="category-arrow grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-500 dark:border-white/10 dark:bg-navy-700 dark:text-slate-300 dark:group-hover:border-orange-500/30 dark:group-hover:bg-orange-500/10 dark:group-hover:text-orange-400">
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}