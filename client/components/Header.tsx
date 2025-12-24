import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Rocket,
  User,
  Heart,
  Globe,
} from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useWishlist } from "@/lib/WishlistContext";

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

  /* =========================
     AUTH (NO FLICKER)
  ========================= */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* =========================
     CURRENCY
  ========================= */
  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem("currency", c);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl animate-slide-down">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group hover:opacity-80 transition"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-white">Astro</div>
              <div className="text-xs tracking-widest text-purple-400">
                STORE
              </div>
              <div className="text-[10px] tracking-widest text-slate-400">
                PC GAMES
              </div>
            </div>
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button
              className="relative rounded-lg p-2 text-slate-300 hover:text-pink-400 hover:bg-slate-800 transition"
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] text-white">
                  {items.length}
                </span>
              )}
            </button>

            {/* Currency selector */}
            <div className="flex items-center rounded-full border border-slate-700 bg-slate-900">
              {(["USD", "EUR", "EGP"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => changeCurrency(c)}
                  className={`px-3 py-1 text-xs transition ${
                    currency === c
                      ? "bg-purple-600 text-white rounded-full"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Language */}
            <button
              className="rounded-lg p-2 text-slate-300 hover:text-purple-400 hover:bg-slate-800 transition"
              title="Language"
            >
              <Globe className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-slate-300 hover:text-purple-400 hover:bg-slate-800 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to={user ? "/account" : "/login"}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-purple-500 hover:text-purple-400 transition"
            >
              {authLoading ? "•••" : user ? "Account" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-white">Astro</div>
              <div className="text-xs tracking-widest text-purple-400">
                STORE
              </div>
            </div>
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
         {/* Wishlist */}
<button
  className="relative rounded-lg p-2 text-slate-300 hover:text-pink-400 hover:bg-slate-800 transition"
  title="Wishlist"
>
  <Heart className="h-5 w-5" />
  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] text-white">
    0
  </span>
</button>

            {/* Currency selector (pill) */}
            <div className="flex items-center rounded-full border border-slate-700 bg-slate-900">
              {(["USD", "EUR", "EGP"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => changeCurrency(c)}
                  className={`px-3 py-1 text-xs transition ${
                    currency === c
                      ? "bg-purple-600 text-white rounded-full"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Language (icon only) */}
            <button
              className="rounded-lg p-2 text-slate-300 hover:text-purple-400 hover:bg-slate-800 transition"
              title="Language"
            >
              <Globe className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-slate-300 hover:text-purple-400 hover:bg-slate-800 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account (NO FLICKER) */}
            <Link
              to={user ? "/account" : "/login"}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-purple-500 hover:text-purple-400 transition"
            >
              {authLoading ? (
                <span className="opacity-50">•••</span>
              ) : user ? (
                "Account"
              ) : (
                "Login"
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
