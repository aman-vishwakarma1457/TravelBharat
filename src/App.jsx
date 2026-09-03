import { Link, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import States from "./pages/States";
import StateDetails from "./pages/StateDetails";
import DestinationDetails from "./pages/DestinationDetails";
import Category from "./pages/Category";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";

function NotFound() {
  return (
    <div className="container-page section-pad flex min-h-[55vh] items-center justify-center text-center">
      <div className="mx-auto max-w-lg">
        <div className="text-8xl font-black text-orange-500">404</div>

        <h1 className="mt-2 text-3xl font-extrabold text-navy-900 dark:text-white">
          Lost in India?
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          We couldn't find the page you're looking for. Your next destination
          is still waiting.
        </p>

        <Link
          to="/explore"
          className="btn-primary mt-6 inline-flex"
        >
          Explore India
        </Link>
      </div>
    </div>
  );
}

function PublicLayout() {
  return (
    <>
      <SkipLink />

      <Navbar />

      <main id="main-content">
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/states" element={<States />} />

          {/* State & destination pages */}
          <Route
            path="/state/:stateName"
            element={<StateDetails />}
          />

          <Route
            path="/destination/:destinationId"
            element={<DestinationDetails />}
          />

          {/* Category & search */}
          <Route
            path="/category/:categoryName"
            element={<Category />}
          />

          <Route
            path="/search"
            element={<SearchResults />}
          />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();

  // Admin dashboard has its own layout.
  if (location.pathname.startsWith("/admin")) {
    return <AdminDashboard />;
  }

  return <PublicLayout />;
}