import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

export default function Account() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-10 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 rounded-xl border border-slate-800 bg-slate-900 p-4 h-fit">
          <h2 className="mb-4 text-lg font-bold text-purple-400">
            My Account
          </h2>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="products"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`
              }
            >
              My Products
            </NavLink>

            <NavLink
              to="orders"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="reviews"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`
              }
            >
              Reviews
            </NavLink>

            <button
              onClick={handleLogout}
              className="mt-4 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
