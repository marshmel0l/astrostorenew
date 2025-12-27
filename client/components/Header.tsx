import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Heart, Globe, X, Search } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Currency = "USD" | "EUR" | "EGP";

const PROMO_KEY = "astro_promo_hidden_at";

export default function Header() {
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = getTotalItems();

  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currency, setCurrency] = useState<Currency>(
    (localStorage.getItem("currency") as Currency) || "EUR",
  );

  const [showPromo, setShowPromo] = useState(true);

  // promo bar 7‑day reset
  useEffect(() => {
    const raw = localStorage.getItem(PROMO_KEY);
    if (!raw) {
      setShowPromo(true);
      return;
    }
    const hiddenAt = Number(raw);
    if (Number.isNaN(hiddenAt)) {
      setShowPromo(true);
      return;
    }
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const expired = Date.now() - hiddenAt > sevenDays;
    setShowPromo(expired);
    if (expired) localStorage.removeItem(PROMO_KEY);
  }, []);

  const closePromo = () => {
    setShowPromo(false);
    localStorage.setItem(PROMO_KEY, String(Date.now()));
  };

  // auth + currency
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem("currency", c);
  };

  return (
    <header className="bg-[#111827]">
      {/* GREEN PROMO STRIP */}
      {showPromo && (
        <div className="bg-emerald-800 text-[11px] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
            <p className="font-medium tracking-wide text-center flex-1">
              SHOP THE ASTROSTORE SALE! 💸 UP TO 80% OFF GAMES, MEMBERSHIPS, TOP‑UPS AND MORE!
            </p>
            <button
              onClick={closePromo}
              className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-emerald-700/80 transition-colors"
              aria-label="Close promotion"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MAIN ROW LIKE SCREENSHOT */}
      <div className="bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          {/* Logo + tagline left */}
          <Link to="/" className="flex items-center gap-3 mr-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white text-lg font-bold">
              A
            </span>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-white">AstroStore</span>
              <span className="text-[11px] text-slate-300 tracking-wide">
                PAY LESS. GAME MORE.
              </span>
            </div>
          </Link>

          {/* Center search bar */}
          <div className="flex-1">
            <div className="relative max-w-3xl mx-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title..."
                className="w-full h-10 rounded-full bg-black/70 border border-slate-800 pl-9 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40"
              />
            </div>
          </div>

          {/* Right language / currency / icons */}
          <div className="flex items-center gap-4">
            {/* Language (static for now) */}
            <button className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-200 hover:text-white">
              ENG
              <span className="text-[9px]">▾</span>
            </button>

            {/* Currency dropdown like screenshot */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-200">
              <button
                onClick={() => changeCurrency("EUR")}
                className={`flex items-center gap-1 hover:text-white ${
                  currency === "EUR" ? "text-emerald-400 font-semibold" : ""
                }`}
              >
                EUR
                <span className="text-[9px]">▾</span>
              </button>
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-slate-200 hover:text-white"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] px-1 h-4 rounded-full bg-pink-500 text-[10px] text-white flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to={user ? "/account" : "/login"}
              className="relative text-slate-200 hover:text-white"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-slate-200 hover:text-white"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] px-1 h-4 rounded-full bg-emerald-500 text-[10px] text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
