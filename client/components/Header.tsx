import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <span className="text-lg font-bold text-white">G</span>
            </div>
            <span className="text-xl font-bold text-slate-900">GameHub</span>
          </Link>

          <div className="flex flex-1 justify-center px-8 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search games..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm placeholder-slate-500 transition-colors hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          <button className="relative p-2">
            <ShoppingCart className="h-6 w-6 text-slate-700" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
