import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  large = false,
  defaultValue = "",
}) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      navigate("/search");
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(trimmedQuery)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-center rounded-2xl border-2 border-transparent bg-white p-1.5 shadow-xl shadow-black/10 transition-colors duration-200 ${
        large ? "max-w-2xl" : ""
      }`}
    >
      {/* Search Icon */}
      <span className="ml-1 flex h-11 w-11 shrink-0 items-center justify-center sm:ml-2">
        <Search
          size={19}
          className="text-slate-400"
          aria-hidden="true"
        />
      </span>

      {/* Search Input */}
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="search-bar-input min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
        placeholder="Search destinations, states or categories..."
        aria-label="Search destinations, states or categories"
        autoComplete="off"
      />

      {/* Submit Button */}
      <button
        type="submit"
        aria-label="Submit search"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
      >
        <Search
          size={19}
          aria-hidden="true"
        />
      </button>
    </form>
  );
}