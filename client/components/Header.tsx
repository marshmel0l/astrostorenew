import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Rocket,
  User,
  Heart,
  Globe,
} from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Currency = "USD" | "EUR" | "EGP";

export default function Header() {
  const { getTotalItems } = useCart();
  const { items } = useWishlist();
  const cartCount = getTotalItems();

  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currency, setCurrency] = useState<Currency>(
    (localStorage.getItem("currency") as Currency) || "EUR"
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_e, session) => {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem("currency", c);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Rocket className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white">Astro</div>
            <div className="text-xs text-purple-400 tracking-widest">
              STORE
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="relative p-2 hover:bg-slate-800 rounded-lg"
          >
            <Heart className="h-5 w-5 text-pink-400" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          <div className="flex rounded-full border border-slate-700 bg-slate-900">
            {(["USD", "EUR", "EGP"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => changeCurrency(c)}
                className={`px-3 py-1 text-xs ${
                  currency === c
                    ? "bg-purple-600 text-white rounded-full"
                    : "text-slate-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button className="p-2 hover:bg-slate-800 rounded-lg">
            <Globe className="h-5 w-5" />
          </button>

          <Link
            to="/cart"
            className="relative p-2 hover:bg-slate-800 rounded-lg"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to={user ? "/account" : "/login"}
            className="border border-slate-700 px-4 py-2 rounded-lg text-sm"
          >
            {authLoading ? "•••" : user ? "Account" : "Login"}
          </Link>
        </div>
      </div>
    </header>
  );
}
