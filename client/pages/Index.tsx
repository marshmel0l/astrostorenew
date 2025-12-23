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
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-pink-600/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <span className="text-purple-300 font-semibold text-sm uppercase tracking-widest">
                Welcome to Astro Store
              </span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 sm:text-5xl lg:text-6xl">
              Astro Store
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Discover amazing games at unbeatable prices. Shared accounts with lifetime access and offline mode.
            </p>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  const element = document.getElementById("games-section");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-white font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all transform hover:scale-105 active:scale-95"
              >
                Shop Now
              </button>
              <button className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300 font-semibold hover:border-purple-500 hover:text-purple-300 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="games-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filters and Sorting */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {/* Popularity Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-300">
                Filter:
              </label>
              <select
                value={selectedPopularity}
                onChange={(e) => setSelectedPopularity(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 transition-colors hover:border-slate-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Games</option>
                <option value="trending">Trending</option>
                <option value="popular">Popular</option>
              </select>
            </div>

          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-300">
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
                className="appearance-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 pr-8 text-sm text-slate-100 transition-colors hover:border-slate-600 focus:border-purple-500 focus:outline-none"
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
        <div className="mb-6 text-sm text-slate-400 animate-fade-in">
          Showing {filteredGames.length} of {games.length} games
        </div>

        {/* Games Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-purple-500"></div>
              <p className="text-slate-400">Loading games...</p>
            </div>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="flex justify-center py-16 animate-fade-in">
            <div className="text-center">
              <p className="text-lg font-medium text-slate-100">
                No games found
              </p>
              <p className="mt-2 text-slate-400">
                Try adjusting your filters or search query
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredGames.map((game, index) => (
              <div
                key={game.id}
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 50}ms both`,
                }}
              >
                <GameCard
                  id={game.id}
                  title={game.title}
                  image={game.image}
                  price={game.price}
                  rating={game.rating}
                  popularity={game.popularity}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-gradient-to-b from-slate-900 to-slate-900/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-100">About Astro Store</h3>
              <p className="mt-2 text-sm text-slate-400">
                Your ultimate destination for discovering and purchasing amazing
                games at unbeatable prices with shared accounts and offline mode.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Games
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Legal</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Astro Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
