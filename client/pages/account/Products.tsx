import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Package, AlertCircle } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  status: "active" | "sold" | "draft";
  created_at: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("products")
        .select("id,title,price,status,created_at")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      setProducts(data ?? []);
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-xl border border-slate-800 bg-slate-800/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">My Products</h1>
          <p className="text-sm text-slate-400">
            Manage, update, and track your listed products
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-500 transition">
          <Plus size={16} />
          New Product
        </button>
      </div>

      {/* Empty state */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-20 text-center">
          <Package size={40} className="text-slate-500 mb-4" />
          <h2 className="text-lg font-medium">No products yet</h2>
          <p className="text-sm text-slate-400 mb-6">
            Start selling by creating your first product
          </p>
          <button className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium hover:bg-purple-500 transition">
            Create Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-purple-500/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-medium leading-tight line-clamp-2">
                  {product.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.status === "active"
                      ? "bg-green-500/10 text-green-400"
                      : product.status === "sold"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(product.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
