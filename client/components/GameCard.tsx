import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useState } from "react";
import { Heart } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating?: number;
}

export default function GameCard({
  id,
  title,
  image,
  price,
  rating,
}: GameCardProps) {
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
const [loaded, setLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, title, image, price });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link to={`/product/${id}`} className="animate-fade-up">
<div className="group card-hover h-full overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900">
        {/* IMAGE */}
<div className="relative h-64 img-wrapper">
  {!loaded && <div className="img-spinner" />}

  <img
    src={image}
    alt={title}
    onLoad={() => setLoaded(true)}
    className={`h-full w-full object-cover img-fade ${
      loaded ? "loaded" : ""
    }`}
  />

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle({ id, title, image });
            }}
            className={`absolute right-3 top-3 rounded-full p-2 transition ${
              has(id)
                ? "bg-pink-600 text-white"
                : "bg-black/60 text-white hover:bg-pink-600"
            }`}
          >
            <Heart size={14} fill={has(id) ? "currentColor" : "none"} />
          </button>

          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
          <ArrowRight className="absolute inset-0 m-auto h-8 w-8 text-purple-400 opacity-0 transition group-hover:opacity-100" />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-3 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold group-hover:text-purple-300 transition">
            {title}
          </h3>

          {rating && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-3">
            <span className="text-lg font-bold text-purple-400">
              €{price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-purple-600 text-white hover:bg-purple-500"
              }`}
            >
              {isAdded ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
