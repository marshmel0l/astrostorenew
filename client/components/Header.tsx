import { Link } from "react-router-dom";
import { ShoppingCart, Search, Rocket } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function Header() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-lg group-hover:shadow-xl transition-shadow">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Astro
              </span>
              <span className="text-xs font-semibold text-purple-300">
                STORE
              </span>
            </div>
          </Link>

          <div className="flex flex-1 justify-center px-8 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search games..."
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 py-2 pl-10 pr-4 text-sm placeholder-slate-400 text-slate-100 transition-colors hover:border-slate-500 focus:border-purple-500 focus:bg-slate-800 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <Link
            to="/cart"
            className="relative p-2 group hover:opacity-80 transition-opacity"
          >
            <ShoppingCart className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-bold text-white animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
