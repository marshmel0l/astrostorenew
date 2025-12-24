import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main className="animate-soft-scale">
        <Outlet />
      </main>
      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        © 2026 Astro Store · Cheap Gift Cards and Gaming Goods
      </footer>
    </div>
  );
}
