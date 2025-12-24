import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />

      {/* Page content */}
      <main className="flex-1 animate-page-fade">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        © 2026 Astro Store · PC Games & Digital Goods Marketplace
      </footer>
    </div>
  );
}
