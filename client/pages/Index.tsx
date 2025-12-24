import { useEffect, useState } from "react";
import { ChevronDown, Flame, Star } from "lucide-react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { fetchGames, searchGames, sortGames, type Game } from "@/lib/gameData";
<GameCard
  id={game.id}
  title={game.title}
  image={game.image}
  price={game.price}
  rating={game.rating}
  regions={game.regions}
  available_types={game.available_types}
/>

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "price-low" | "price-high" | "rating" | "popularity"
  >("popularity");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "popular" | "trending">("all");

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

    if (filter !== "all") {
      result = result.filter((g) =>
        filter === "popular" ? g.popularity >= 70 : g.popularity >= 85
      );
    }

    result = sortGames(result, sortBy);
    setFilteredGames(result);
  }, [games, searchQuery, sortBy, filter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm text-purple-400 font-semibold">
              <Flame size={16} /> Digital Game Marketplace
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl font-bold">
              Buy Games Smarter.
              <br />
              <span className="text-purple-400">
                Lifetime Access, Better Prices.
              </span>
            </h1>

            <p className="mt-4 text-slate-400">
              Discover top PC games with instant delivery, shared accounts,
              offline mode, and secure checkout.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("games")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-lg bg-purple-600 px-6 py-3 font-medium hover:bg-purple-500 transition"
              >
                Browse Games
              </button>
              <button className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300 hover:border-purple-500 hover:text-purple-400 transition">
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Games */}
      <section
        id="games"
        className="mx-auto max-w-7xl px-6 py-14"
      >
        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm ${
                filter === "all"
                  ? "bg-purple-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("popular")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 ${
                filter === "popular"
                  ? "bg-purple-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <Star size={14} /> Popular
            </button>
            <button
              onClick={() => setFilter("trending")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 ${
                filter === "trending"
                  ? "bg-purple-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <Flame size={14} /> Trending
            </button>
          </div>

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

        {/* Results */}
        <p className="mb-6 text-sm text-slate-400">
          Showing {filteredGames.length} of {games.length} games
        </p>

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
            No games match your filters
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        © 2024 Astro Store · Secure Digital Marketplace
      </footer>
    </div>
  );
}
