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

  // =============== LOAD DATA ===============
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

  // =============== FILTER / SORT ===============
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
      {/* HERO */}
      <section className="bg-[#0D1117] pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroCarousel />
        </div>
      </section>

      {/* GAMES */}
      <section className="bg-[#0D1117] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Games Of The Year 2025
              </h2>
              <p className="text-xs text-slate-400">
                Showing {filteredGames.length} of {games.length} games
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title..."
                className="h-9 rounded-lg bg-slate-900/80 border border-slate-700/80 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
              />

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as typeof sortBy)
                  }
                  className="appearance-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 pr-9 text-sm text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
                >
                  <option value="popularity">By date of addition</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-slate-800/40 rounded-xl animate-pulse border border-slate-800"
                />
              ))
            ) : filteredGames.length === 0 ? (
              <div className="col-span-full text-center py-16 text-slate-400 text-sm">
                No products available
              </div>
            ) : (
              filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={game.image}
                  price={game.price}
                  rating={game.rating}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
