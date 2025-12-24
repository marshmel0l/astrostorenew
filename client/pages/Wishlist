import { Link } from "react-router-dom";
import { useWishlist } from "@/lib/WishlistContext";
import { useCart } from "@/lib/CartContext";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Wishlist() {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-32 text-center">
        <Heart className="mx-auto mb-4 h-10 w-10 text-slate-500" />
        <p className="text-slate-400">Wishlist is empty</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-purple-600 px-6 py-3 rounded-lg"
        >
          Browse Games
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="mb-8 text-2xl font-bold">Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="animate-fade-up border border-slate-800 rounded-xl bg-slate-900 overflow-hidden"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                className="h-56 w-full object-cover"
              />
            </Link>

            <div className="p-4 space-y-3">
              <h3 className="text-sm font-semibold">{item.title}</h3>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addToCart({
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      price: 0,
                    });
                    toast({
                      title: "Added to cart",
                      description: item.title,
                    });
                  }}
                  className="flex-1 bg-purple-600 py-2 rounded-lg text-xs"
                >
                  <ShoppingCart size={14} />
                </button>

                <button
                  onClick={() => toggle(item)}
                  className="border border-slate-700 px-3 rounded-lg text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
