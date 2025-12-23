import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { gameDatabase } from "@/lib/gameData";

export default function Account() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("user_products")
      .select("product_id")
      .then(({ data }) => {
        if (!data) return;

        const owned = gameDatabase.filter((g) =>
          data.some((p) => p.product_id === g.id)
        );

        setProducts(owned);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-4">My Games</h1>

      {products.length === 0 && (
        <p className="text-slate-400">
          You don’t own any products yet.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((g) => (
          <div
            key={g.id}
            className="rounded bg-slate-800 p-3"
          >
            <img src={g.image} className="rounded mb-2" />
            <p className="font-semibold">{g.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
