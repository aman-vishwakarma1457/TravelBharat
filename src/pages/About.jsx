import { Link } from 'react-router-dom'
import {
  Compass,
  Heart,
  Landmark,
  Leaf,
  ArrowRight,
  Users,
} from 'lucide-react'
import SEO from '../components/SEO'

export default function About() {
  const features = [
    [Compass, 'Explore', 'State-by-state discovery'],
    [Landmark, 'Heritage', 'History & architecture'],
    [Leaf, 'Nature', 'Landscapes & wildlife'],
    [Heart, 'Culture', 'Living traditions'],
  ]

  const reasons = [
    [
      'Visual discovery',
      'High-quality photography and editorial layouts help you get a feel for a place before reading the details.',
    ],
    [
      'Clear journeys',
      'Move naturally from India → state → destination → nearby attractions without losing context.',
    ],
    [
      'Curated content',
      'Concise, useful tourism information keeps the experience informative without overwhelming the screen.',
    ],
    [
      'Made for exploration',
      'Discover destinations through curated categories, states, cities, attractions and useful travel information.',
    ],
  ]

  return (
    <>
      <SEO
        title="About TravelBharat"
        description="Learn about TravelBharat, a visual tourism encyclopedia for discovering India."
      />

      <div className="bg-white dark:bg-navy-950">
        {/* Hero Section */}
        <section className="dark-surface">
          <div className="container-page py-20">
            <p className="eyebrow text-orange-300">About TravelBharat</p>

            <h1 className="max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl">
              One India. Thousands of stories.{' '}
              <span className="text-orange-400">
                Endless ways to explore.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
              TravelBharat is a digital tourism encyclopedia designed to make
              India&apos;s extraordinary diversity easier to discover.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <div className="container-page section-pad">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Our Mission</p>

              <h2 className="section-title">
                Make discovering India feel effortless.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                From iconic monuments to quiet landscapes, India offers an
                incredible range of experiences. TravelBharat organizes that
                diversity into an approachable visual guide where visitors
                can move from country-wide discovery to a state, city and
                individual destination.
              </p>

              <Link to="/explore" className="btn-primary mt-7">
                Start Exploring
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {features.map(([Icon, title, description]) => (
                <div key={title} className="card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                    <Icon size={21} />
                  </span>

                  <h3 className="mt-4 font-extrabold text-navy-900 dark:text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why TravelBharat */}
          <section className="mt-20 rounded-3xl bg-slate-50 p-8 dark:bg-navy-900 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <p className="eyebrow">Why TravelBharat</p>

                <h2 className="text-3xl font-extrabold text-navy-900 dark:text-white">
                  Built around the way people actually discover places.
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
                {reasons.map(([title, description]) => (
                  <div key={title}>
                    <h3 className="font-extrabold text-navy-900 dark:text-white">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Users className="mx-auto text-orange-500" size={28} />

            <h2 className="mt-3 text-2xl font-extrabold text-navy-900 dark:text-white">
              Ready to explore?
            </h2>

            <Link to="/states" className="btn-secondary mt-5">
              Browse All States
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}