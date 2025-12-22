import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import {
  fetchGames,
  searchGames,
  sortGames,
  type Game,
} from "@/lib/gameData";

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating" | "popularity">("popularity");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPopularity, setSelectedPopularity] = useState("all");

  // Fetch games on mount
  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      const fetchedGames = await fetchGames();
      setGames(fetchedGames);
      setFilteredGames(fetchedGames);
      setIsLoading(false);
    };
    loadGames();
  }, []);

  // Filter and sort games when dependencies change
  useEffect(() => {
    let result = games;

    // Apply search
    if (searchQuery.trim()) {
      result = searchGames(searchQuery, result);
    }

    // Apply popularity filter
    if (selectedPopularity !== "all") {
      const threshold = selectedPopularity === "popular" ? 75 : 50;
      result = result.filter((game) => game.popularity >= threshold);
    }

    // Apply sorting
    result = sortGames(result, sortBy);

    setFilteredGames(result);
  }, [games, searchQuery, sortBy, selectedPopularity]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Game Hub
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Discover amazing games at unbeatable prices
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filters and Sorting */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {/* Popularity Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">
                Filter:
              </label>
              <select
                value={selectedPopularity}
                onChange={(e) => setSelectedPopularity(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Games</option>
                <option value="trending">Trending</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">
                Search:
              </label>
              <input
                type="text"
                placeholder="Find a game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-500 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">
              Sort by:
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "price-low"
                      | "price-high"
                      | "rating"
                      | "popularity"
                  )
                }
                className="appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-8 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:border-blue-500 focus:outline-none"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-sm text-slate-600">
          Showing {filteredGames.length} of {games.length} games
        </div>

        {/* Games Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
              <p className="text-slate-600">Loading games...</p>
            </div>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <p className="text-lg font-medium text-slate-900">
                No games found
              </p>
              <p className="mt-2 text-slate-600">
                Try adjusting your filters or search query
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                price={game.price}
                rating={game.rating}
                popularity={game.popularity}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900">About</h3>
              <p className="mt-2 text-sm text-slate-600">
                Your ultimate destination for discovering and purchasing amazing
                games at unbeatable prices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Games
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Legal</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2024 GameHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
