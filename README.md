# TravelBharat — Premium Frontend Tourism Platform

A complete frontend-only React + Vite + Tailwind CSS tourism experience inspired by the supplied TravelBharat homepage reference.

## Stack
- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Local mock data + React state only

## No backend
There is intentionally no backend, API, database, authentication, payments, hotel/transport booking, or real-time service.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Routes
- `/`
- `/explore`
- `/states`
- `/state/:stateName`
- `/destination/:destinationId`
- `/category/:categoryName`
- `/search`
- `/about`
- `/admin`

## Admin demo
`/admin` is a frontend prototype. Add/edit/delete/verification actions are handled with React state in the browser.

## Visual system
The UI follows the supplied design direction:
- Deep navy #0B1647
- Travel orange #F97316
- White / soft gray surfaces
- Rounded premium cards
- Editorial photography
- Subtle shadows and CSS transitions
- Responsive layouts
- Optional dark mode stored in localStorage
