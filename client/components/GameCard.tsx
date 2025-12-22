import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating?: number;
  popularity?: number;
}

export default function GameCard({
  id,
  title,
  image,
  price,
  rating,
  popularity,
}: GameCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      title,
      image,
      price,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 transition-all duration-500 hover:shadow-2xl hover:border-purple-500 hover:shadow-purple-500/20 transform hover:-translate-y-2 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-slate-900">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowRight className="h-10 w-10 text-purple-400 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-3 p-4">
          {/* Title */}
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-100 group-hover:text-purple-300 transition-colors">
            {title}
          </h3>

          {/* Rating and Stats */}
          <div className="flex items-center gap-3">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-slate-400">{rating.toFixed(1)}</span>
              </div>
            )}
            {popularity && (
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                  popularity > 75
                    ? "bg-purple-900/50 text-purple-300"
                    : popularity > 50
                      ? "bg-blue-900/50 text-blue-300"
                      : "bg-slate-700/50 text-slate-300"
                }`}
              >
                {popularity > 75
                  ? "Popular"
                  : popularity > 50
                    ? "Trending"
                    : "New"}
              </span>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between border-t border-slate-700 pt-3">
            <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              ${price.toFixed(2)}
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-white text-xs font-medium transition-all duration-300 transform active:scale-95 ${
                isAdded
                  ? "bg-green-600 shadow-lg shadow-green-600/50"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-600/50 hover:scale-105"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isAdded ? "Added!" : "Add"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
