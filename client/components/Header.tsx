import { Link } from "react-router-dom";
import { ShoppingCart, Rocket } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

export default function Header() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
const [user, setUser] = useState<any>(null);

useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md">
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
<Link
  to={user ? "/account" : "/login"}
  className="flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-slate-200 hover:bg-slate-800 transition"
>
  <User className="h-5 w-5" />
  {user ? "Account" : "Login"}
</Link>

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
