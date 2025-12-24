import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/CartContext";
import { fetchGames, type Game, type ProductType } from "@/lib/gameData";
import {
  ShoppingCart,
  Globe,
  Key,
  Laptop,
  Users,
  ShieldCheck,
  Info,
} from "lucide-react";

type TypeConfig = {
  label: string;
  regions: string[];
  priceMultiplier: number;
  description: string[];
};

const TYPE_CONFIG: Record<ProductType, TypeConfig> = {
  key: {
    label: "Game Key",
    regions: ["Global", "EU", "US"],
    priceMultiplier: 1,
    description: [
      "Official activation key",
      "Redeem on supported platform",
      "Permanent ownership",
    ],
  },
  offline_account: {
    label: "Offline Account",
    regions: ["EU"],
    priceMultiplier: 0.8,
    description: [
      "Full game access",
      "Offline play only",
      "No email or password changes",
    ],
  },
  shared_account: {
    label: "Shared Account",
    regions: ["EU", "UK"],
    priceMultiplier: 0.65,
    description: [
      "Online & offline access",
      "Shared with other users",
      "Limited simultaneous usage",
    ],
  },
};

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
      <div className="py-20 text-center text-slate-400">
        Loading product…
      </div>
    );
  }

  const typeConfig = TYPE_CONFIG[purchaseType];
  const finalPrice = (
    product.price * typeConfig.priceMultiplier
  ).toFixed(2);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 text-slate-100">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Purchase Type Selector */}
          <div className="flex gap-3">
            {product.available_types.map((type) => (
              <button
                key={type}
                onClick={() => setPurchaseType(type)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                  purchaseType === type
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {type === "key" && <Key size={14} />}
                {type === "offline_account" && <Laptop size={14} />}
                {type === "shared_account" && <Users size={14} />}
                {TYPE_CONFIG[type].label}
              </button>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-purple-400">
              €{finalPrice}
            </span>

            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  image: product.image,
                  price: Number(finalPrice),
                  type: purchaseType,
                })
              }
              className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium hover:bg-green-500 transition"
            >
              <ShoppingCart size={18} />
              Buy Now
            </button>
          </div>

          {/* REGION WARNING (DEPENDS ON TYPE) */}
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-300 flex gap-2">
            <Globe size={18} />
            Available regions for this option:
            <strong> {typeConfig.regions.join(", ")}</strong>
          </div>
        </div>
      </div>

      {/* SECTION 2 – PRODUCT DETAILS */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <DetailBox
          icon={<Info size={18} />}
          title="What you get"
          items={typeConfig.description}
        />
        <DetailBox
          icon={<ShieldCheck size={18} />}
          title="Guarantees"
          items={[
            "Instant delivery",
            "Replacement if invalid",
            "Support included",
          ]}
        />
        <DetailBox
          icon={<Globe size={18} />}
          title="Activation & Region"
          items={[
            `Regions: ${typeConfig.regions.join(", ")}`,
            "VPN may be required",
            "Region mismatch not refundable",
          ]}
        />
      </div>

      {/* SECTION 3 – ABOUT */}
      <div className="mt-14 rounded-xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-4 text-xl font-semibold">About the game</h2>
        <p className="text-slate-400 leading-relaxed">
          {product.title} delivers an immersive experience with high-quality
          gameplay and deep progression systems. This product is offered in
          multiple formats to fit different budgets and usage preferences.
        </p>
      </div>
    </div>
  );
}

/* ========================= */

function DetailBox({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <ul className="space-y-1 text-sm text-slate-400">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
