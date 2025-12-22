import { ShoppingCart, Star } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating?: number;
  popularity?: number;
}

export default function GameCard({
  title,
  image,
  price,
  rating,
  popularity,
}: GameCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-3 p-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {title}
        </h3>

        {/* Rating and Stats */}
        <div className="flex items-center gap-3">
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-slate-600">{rating.toFixed(1)}</span>
            </div>
          )}
          {popularity && (
            <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 font-medium">
              {popularity > 75
                ? "Popular"
                : popularity > 50
                  ? "Trending"
                  : "New"}
            </span>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="text-lg font-bold text-slate-900">
            ${price.toFixed(2)}
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-white text-xs font-medium transition-all duration-300 hover:shadow-md active:scale-95">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
