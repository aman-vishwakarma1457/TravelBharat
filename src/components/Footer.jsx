import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return
    }

    setSubscribed(true)
    setEmail('')
  }

  const socialLinks = [
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/',
      Icon: Facebook,
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/',
      Icon: Instagram,
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/',
      Icon: Youtube,
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/',
      Icon: Linkedin,
    },
  ]

  const categories = [
    'heritage',
    'nature',
    'religious',
    'adventure',
  ]

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-navy-950">
      {/* Footer Content */}
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Logo />

          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your complete travel guide to explore India&apos;s
            incredible destinations, rich culture, heritage and
            natural beauty.
          </p>

          {/* Social Links */}
          <div className="mt-5 flex gap-2">
            {socialLinks.map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TravelBharat ${label}`}
                className="
                  grid h-9 w-9 place-items-center rounded-full
                  border border-slate-200
                  text-slate-600
                  transition-all duration-200

                  hover:-translate-y-1
                  hover:border-orange-500
                  hover:bg-orange-500
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-orange-500/25

                  dark:border-white/10
                  dark:text-slate-300

                  dark:hover:border-orange-500
                  dark:hover:bg-orange-500
                  dark:hover:text-white
                  dark:hover:shadow-orange-500/25
                "
              >
                <Icon
                  size={16}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-navy-900 dark:text-white">
            Quick Links
          </h3>

          <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
            <Link
              to="/explore"
              className="transition hover:text-orange-500"
            >
              Explore
            </Link>

            <Link
              to="/states"
              className="transition hover:text-orange-500"
            >
              States
            </Link>

            <Link
              to="/search"
              className="transition hover:text-orange-500"
            >
              Destinations
            </Link>

            <Link
              to="/about"
              className="transition hover:text-orange-500"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-navy-900 dark:text-white">
            Popular Categories
          </h3>

          <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="capitalize transition hover:text-orange-500"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-navy-900 dark:text-white">
            Travel Updates
          </h3>

          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Get new destination ideas and curated India travel
            inspiration.
          </p>

          {subscribed ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />

              <span>You&apos;re subscribed!</span>
            </div>
          ) : (
            <form
              onSubmit={subscribe}
              className="mt-4 flex gap-2"
            >
              <label
                htmlFor="footer-email"
                className="sr-only"
              >
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input min-w-0 flex-1"
                placeholder="Enter your email"
                aria-label="Email address"
              />

              <button
                type="submit"
                className="btn-primary shrink-0 px-4"
                aria-label="Subscribe to travel updates"
              >
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-400 dark:border-white/10">
        © {new Date().getFullYear()} TravelBharat. India travel
        inspiration & destination guide.
      </div>
    </footer>
  )
}