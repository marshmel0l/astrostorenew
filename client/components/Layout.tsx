import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      {/* Page content with animation */}
      <main className="animate-page-fade">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        © 2026 Astro Store · Best Deals on PC Games & Gift Cards
      </footer>
    </div>
  );
}
