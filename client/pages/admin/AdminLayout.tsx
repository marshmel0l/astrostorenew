import Header from "@/components/Header";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-slate-400 mt-2">
          Manage users, products, and orders
        </p>
      </div>
    </div>
  );
}
