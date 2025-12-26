import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import GameCard from "@/components/GameCard";
import HeroCarousel from "@/components/HeroCarousel";
import { fetchGames, searchGames, sortGames, type Game } from "@/lib/gameData";

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "price-low" | "price-high" | "rating" | "popularity"
  >("popularity");
  const [isLoading, setIsLoading] = useState(true);

  /* ================= LOAD DATA ================= */

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

  /* ================= FILTER / SORT ================= */

  useEffect(() => {
    let result = games;

    if (searchQuery.trim()) {
      result = searchGames(searchQuery, result);
    }

    result = sortGames(result, sortBy);
    setFilteredGames(result);
  }, [games, searchQuery, sortBy]);

  return (
    <>
      {/* ================= HERO CAROUSEL ================= */}
      <HeroCarousel />

      {/* ================= GAMES ================= */}
      <section id="games" className="mx-auto max-w-7xl px-6 py-14">
        {/* TOOLBAR */}
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

        {/* GRID */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
