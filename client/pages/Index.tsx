import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { fetchGames, searchGames, sortGames, type Game } from "@/lib/gameData";

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "price-low" | "price-high" | "rating" | "popularity"
  >("popularity");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await fetchGames();
      setGames(data);
      setFilteredGames(data);
      setIsLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    let result = games;

    if (searchQuery.trim()) {
      result = searchGames(searchQuery, result);
    }

    result = sortGames(result, sortBy);
    setFilteredGames(result);
  }, [games, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Buy Games Smarter.
            <br />
            <span className="text-purple-400">
              Lifetime Access, Better Prices.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Digital games with keys, offline accounts, and shared access.
            Secure delivery. Clear rules.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("games")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 rounded-lg bg-purple-600 px-6 py-3 font-medium hover:bg-purple-500 transition"
          >
            Browse Games
          </button>
        </div>
      </section>

      {/* Games */}
      <section
        id="games"
        className="mx-auto max-w-7xl px-6 py-14"
      >
        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {filteredGames.length} of {games.length} games
          </p>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as typeof sortBy)
              }
              className="appearance-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 pr-9 text-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-xl bg-slate-800/50 animate-pulse"
              />
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            No products available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                price={game.price}
                rating={game.rating}
                regions={game.regions}
                available_types={game.available_types}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        © 2026 Astro Store
      </footer>
    </div>
  );
}
