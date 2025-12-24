import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/CartContext";
import { fetchGames, type Game, type ProductType } from "@/lib/gameData";
import { ShoppingCart, Globe, Key, Laptop, Users } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Game | null>(null);
  const [purchaseType, setPurchaseType] = useState<ProductType | null>(null);

  useEffect(() => {
    const load = async () => {
      const games = await fetchGames();
      const found = games.find((g) => g.id === id) || null;
      setProduct(found);
      if (found) {
        setPurchaseType(found.available_types[0]);
      }
    };
    load();
  }, [id]);

  if (!product || !purchaseType) {
    return (
      <div className="flex justify-center py-20 text-slate-400">
        Loading product…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 text-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Globe size={16} />
            {product.regions.includes("Global")
              ? "Global"
              : product.regions.join(", ")}
          </div>

          {/* Purchase Type Selector */}
          <div className="flex gap-3">
            {product.available_types.includes("key") && (
              <TypeButton
                active={purchaseType === "key"}
                onClick={() => setPurchaseType("key")}
                icon={<Key size={14} />}
                label="Game Key"
              />
            )}
            {product.available_types.includes("offline_account") && (
              <TypeButton
                active={purchaseType === "offline_account"}
                onClick={() => setPurchaseType("offline_account")}
                icon={<Laptop size={14} />}
                label="Offline Account"
              />
            )}
            {product.available_types.includes("shared_account") && (
              <TypeButton
                active={purchaseType === "shared_account"}
                onClick={() => setPurchaseType("shared_account")}
                icon={<Users size={14} />}
                label="Shared Account"
              />
            )}
          </div>

          {/* Dynamic Info */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-300">
            {purchaseType === "key" && (
              <ul className="space-y-1">
                <li>• Official activation key</li>
                <li>• Redeem on supported platform</li>
                <li>• Permanent ownership</li>
              </ul>
            )}
            {purchaseType === "offline_account" && (
              <ul className="space-y-1">
                <li>• Full game access</li>
                <li>• Offline play only</li>
                <li>• No email changes</li>
              </ul>
            )}
            {purchaseType === "shared_account" && (
              <ul className="space-y-1">
                <li>• Online & offline access</li>
                <li>• Shared with other users</li>
                <li>• Limited simultaneous usage</li>
              </ul>
            )}
          </div>

          {/* Region Warning */}
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-300">
            ⚠️ Make sure your account region matches:
            <strong> {product.regions.join(", ")}</strong>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-purple-400">
              ${product.price.toFixed(2)}
            </span>

            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  image: product.image,
                  price: product.price,
                  type: purchaseType,
                })
              }
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium hover:bg-purple-500 transition"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= */

function TypeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
        active
          ? "bg-purple-600 text-white"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
