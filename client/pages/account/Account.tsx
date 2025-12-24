import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import {
  Package,
  ShoppingBag,
  Star,
  LogOut,
  User,
} from "lucide-react";

type Profile = {
  email: string;
};

export default function Account() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/login");
        return;
      }
      setProfile({ email: data.user.email ?? "" });
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur p-6 h-fit">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
              <User size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Signed in as</p>
              <p className="text-sm font-medium truncate">
                {profile?.email}
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <NavLink
              to="products"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`
              }
            >
              <Package size={16} />
              My Products
            </NavLink>

            <NavLink
              to="orders"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`
              }
            >
              <ShoppingBag size={16} />
              Orders
            </NavLink>

            <NavLink
              to="reviews"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`
              }
            >
              <Star size={16} />
              Reviews
            </NavLink>

            <button
              onClick={handleLogout}
              className="mt-6 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-9 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
