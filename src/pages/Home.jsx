import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Compass,
  Map,
  Sparkles,
  MapPin,
} from 'lucide-react'

import SearchBar from '../components/SearchBar'
import StateCard from '../components/StateCard'
import CategoryCard from '../components/CategoryCard'
import DestinationCard from '../components/DestinationCard'
import IndiaMap from '../components/IndiaMap'
import SEO from '../components/SEO'

import { states } from '../data/states'
import { categories } from '../data/categories'
import { destinations } from '../data/destinations'

const featuredStates = [
  'Rajasthan',
  'Kerala',
  'Uttar Pradesh',
  'Himachal Pradesh',
  'Maharashtra',
  'Tamil Nadu',
  'Karnataka',
  'Gujarat',
]

const featured = [...destinations]
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 6)

const stateCount = states.filter(
  (state) => state.type === 'State'
).length

const utCount = states.filter(
  (state) => state.type === 'UT'
).length

const cityCount = new Set(
  destinations.map((destination) => destination.city)
).size

export default function Home() {
  const selectedStates = featuredStates
    .map((name) =>
      states.find((state) => state.name === name)
    )
    .filter(Boolean)

  const heroStats = [
    [String(stateCount), 'States', Map],
    [String(utCount), 'UTs', MapPin],
    [`${destinations.length}+`, 'Destinations', Compass],
    ['Endless', 'Experiences', Sparkles],
  ]

  const bottomStats = [
    [String(stateCount), 'States'],
    [String(utCount), 'Union Territories'],
    [`${destinations.length}+`, 'Destinations'],
    [`${cityCount}+`, 'Cities'],
    ['1000+', 'Attractions'],
    ['10K+', 'Happy Explorers'],
  ]

  return (
    <>
      <SEO
        title="Explore India"
        description="TravelBharat is a visual tourism encyclopedia for exploring India's states, union territories, cities and destinations."
        image="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2200&q=90"
      />

      <div>
        {/*  HERO SECTION*/}
        <section className="relative min-h-[620px] overflow-hidden bg-navy-950 sm:min-h-[640px]">
          <img
            src="https://images.pexels.com/photos/32706577/pexels-photo-32706577.jpeg?cs=srgb&dl=pexels-nurcan-aytas-2150089535-32706577.jpg&fm=jpg"
            alt="Scenic Himalayan road in India"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/20" />

          <div className="container-page relative flex min-h-[620px] items-center py-16 sm:min-h-[640px] sm:py-20">
            <div className="max-w-3xl text-white fade-up">
              {/* Eyebrow */}
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
                <Sparkles
                  size={14}
                  className="shrink-0 text-orange-300"
                />

                <span>
                  India&apos;s visual tourism encyclopedia
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Discover{' '}
                <span className="text-orange-400">
                  India,
                </span>
                <br />
                One State at a Time.
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:mt-6 sm:text-lg sm:leading-7">
                Explore India&apos;s destinations, heritage,
                culture, nature, spirituality and hidden gems —
                all in one place.
              </p>

              {/* Search */}
              <div className="mt-7 w-full sm:mt-8">
                <SearchBar large />
              </div>

              {/* Hero Stats */}
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 sm:flex sm:flex-wrap sm:gap-7">
                {heroStats.map(
                  ([number, label, Icon]) => (
                    <div
                      key={label}
                      className="flex items-center gap-3"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 text-orange-300">
                        <Icon size={17} />
                      </span>

                      <div>
                        <div className="font-extrabold">
                          {number}
                        </div>

                        <div className="text-xs text-white/65">
                          {label}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* STATES & UNION TERRITORIES */}
        <section className="section-pad bg-white dark:bg-navy-950">
          <div className="container-page grid items-center gap-10 lg:grid-cols-[290px_1fr]">
            {/* India Map */}
            <div className="h-[340px] overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-card dark:border-white/10 dark:bg-navy-800">
              <div className="flex h-full flex-col items-center justify-center p-5">
                <div className="relative flex h-[285px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-orange-50 via-white to-emerald-50 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900">
                  <IndiaMap />
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-lg font-extrabold text-navy-900 dark:text-white">
                    Explore India
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                    Choose a state or union territory and
                    start your journey.
                  </p>
                </div>
              </div>
            </div>

            {/* States */}
            <div>
              <div className="text-center">
                <p className="eyebrow">
                  Explore India
                </p>

                <h2 className="section-title">
                  Explore States &amp; Union Territories
                </h2>

                <p className="section-subtitle mx-auto">
                  Select a state to discover its amazing
                  destinations, cities and experiences.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {selectedStates.map((state) => (
                  <StateCard
                    key={state.id}
                    state={state}
                  />
                ))}
              </div>

              <div className="mt-7 flex justify-center">
                <Link
                  to="/states"
                  className="btn-secondary"
                >
                  View All States &amp; UTs
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/*  CATEGORIES */}
        <section className="section-pad bg-slate-50/80 dark:bg-navy-900">
          <div className="container-page">
            <div className="text-center">
              <p className="eyebrow">
                Explore by Category
              </p>

              <h2 className="section-title">
                What Kind of Experience Seeks You?
              </h2>

              <p className="section-subtitle mx-auto">
                Choose a travel mood and uncover destinations
                across India.
              </p>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED DESTINATIONS */}
        <section className="section-pad bg-white dark:bg-navy-950">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">
                  Featured Destinations
                </p>

                <h2 className="section-title">
                  Popular Destinations
                </h2>

                <p className="section-subtitle">
                  Handpicked places you must visit in India.
                </p>
              </div>

              <Link
                to="/explore"
                className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 transition hover:text-orange-700"
              >
                Explore all
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {featured.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  d={destination}
                  compact
                />
              ))}
            </div>
          </div>
        </section>

        {/* STATS*/}
        <section className="bg-navy-900 text-white">
          <div className="container-page grid grid-cols-2 divide-x divide-y divide-white/10 py-7 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6">
            {bottomStats.map(([number, label]) => (
              <div
                key={label}
                className="px-4 py-3 text-center sm:py-0 first:pl-0"
              >
                <div className="text-2xl font-extrabold sm:text-3xl">
                  {number}
                </div>

                <div className="mt-1 text-[10px] text-white/65 sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}