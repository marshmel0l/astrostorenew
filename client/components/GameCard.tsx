import { ShoppingCart, Star, Globe, Key, Users, Laptop } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import type { ProductType } from "@/lib/gameData";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/WishlistContext";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating?: number;
  regions: string[];
  available_types: ProductType[];
}

export default function GameCard({
  id,
  title,
  image,
  price,
  rating,
  regions,
  available_types,
}: GameCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
const { toggle, has } = useWishlist();
const wished = has(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      title,
      image,
      price,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="group h-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
        {/* Image */}
        <button
  onClick={(e) => {
    e.preventDefault();
    toggle({ id, title, image });
  }}
  className={`absolute top-3 right-3 rounded-full p-2 transition ${
    wished
      ? "bg-pink-600 text-white"
      : "bg-black/60 text-white hover:bg-pink-600"
  }`}
>
  <Heart size={14} fill={wished ? "currentColor" : "none"} />
</button>
        <div className="relative h-60 bg-slate-800 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Type badges */}
          <div className="absolute top-3 left-3 flex gap-1">
            {available_types.includes("key") && (
              <Badge icon={<Key size={12} />} label="KEY" />
            )}
            {available_types.includes("offline_account") && (
              <Badge icon={<Laptop size={12} />} label="OFFLINE" />
            )}
            {available_types.includes("shared_account") && (
              <Badge icon={<Users size={12} />} label="SHARED" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-100">
            {title}
          </h3>

          {/* Rating + Regions */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                {rating.toFixed(1)}
              </div>
            )}

            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              {regions.includes("Global") ? "Global" : regions.join(", ")}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-3">
            <span className="text-lg font-bold text-purple-400">
              ${price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-500 text-white"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {isAdded ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* =========================
   Badge Component
========================= */

function Badge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
      {icon}
      {label}
    </span>
  );
}
