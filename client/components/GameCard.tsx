import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { toast } from "sonner";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

export default function GameCard({
  id,
  title,
  image,
  price,
  rating,
}: GameCardProps) {
  const { addToCart } = useCart();
  const { has, toggle } = useWishlist();

  // has() takes string id
  const inWishlist = has(id);

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      image,
      price,
      type: "key",
      region: "Global",
    });

    toast.success("Added to cart", {
      description: title,
      duration: 2000,
    });
  };

  const handleToggleWishlist = () => {
    // toggle() takes WishlistItem object
    toggle({ id, title, image });
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
      <Link to={`/product/${id}`} className="block">
        <div className="w-full aspect-[2/3] bg-slate-800 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link
          to={`/product/${id}`}
          className="text-xs font-semibold text-white line-clamp-2 hover:text-emerald-400"
        >
          {title}
        </Link>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm font-bold text-white">
            €{price.toFixed(2)}
          </span>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 h-8 rounded-lg bg-purple-600 hover:bg-purple-700 text-xs font-semibold text-white"
          >
            Add to cart
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`w-8 h-8 rounded-lg border text-xs ${
              inWishlist
                ? "border-pink-500 text-pink-400"
                : "border-slate-700 text-slate-300 hover:border-pink-500 hover:text-pink-400"
            }`}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}
