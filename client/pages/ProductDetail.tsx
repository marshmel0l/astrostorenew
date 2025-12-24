import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useCart } from "@/lib/CartContext";
import { fetchGames, type Game, type ProductType } from "@/lib/gameData";
import { toast } from "@/hooks/use-toast";
import {
  ShoppingCart,
  Globe,
  Key,
  Laptop,
  Users,
  ShieldCheck,
  Info,
  Cpu,
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
      "Permanent ownership",
      "Redeem on supported platform",
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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const games = await fetchGames();
      const found = games.find((g) => g.id === id) || null;
      setProduct(found);
      if (found) {
        const defaultType = found.available_types[0];
        setPurchaseType(defaultType);
        setSelectedRegion(TYPE_CONFIG[defaultType].regions[0]);
      }
    };
    load();
  }, [id]);

  if (!product || !purchaseType || !selectedRegion) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  const typeConfig = TYPE_CONFIG[purchaseType];
  const finalPrice = (
    product.price * typeConfig.priceMultiplier
  ).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: Number(finalPrice),
      type: purchaseType,
      region: selectedRegion,
    });

    toast({
      title: "Added to cart",
      description: `${product.title} added successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* SECTION 1 — BUY BOX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Purchase Type Selector (Minimal Pills) */}
            <div className="flex flex-wrap gap-2">
              {product.available_types.map((type) => (
                <PillButton
                  key={type}
                  active={purchaseType === type}
                  onClick={() => {
                    setPurchaseType(type);
                    setSelectedRegion(TYPE_CONFIG[type].regions[0]);
                  }}
                  icon={
                    type === "key" ? (
                      <Key size={14} />
                    ) : type === "offline_account" ? (
                      <Laptop size={14} />
                    ) : (
                      <Users size={14} />
                    )
                  }
                  label={TYPE_CONFIG[type].label}
                />
              ))}
            </div>

            {/* Region Selector (Minimal Pills) */}
            <div>
              <p className="mb-2 text-sm text-slate-400 flex items-center gap-1">
                <Globe size={14} /> Select region
              </p>
              <div className="flex flex-wrap gap-2">
                {typeConfig.regions.map((region) => (
                  <PillButton
                    key={region}
                    active={selectedRegion === region}
                    onClick={() => setSelectedRegion(region)}
                    label={region}
                  />
                ))}
              </div>
            </div>

            {/* Price + Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold text-purple-400">
                €{finalPrice}
              </span>

              {/* BUY NOW — PURPLE */}
              <button
                className="rounded-lg bg-purple-600 px-6 py-3 font-medium hover:bg-purple-500 transition"
              >
                Buy Now
              </button>

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-slate-300 hover:border-purple-500 hover:text-purple-400 transition"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>

            {/* Region Heads-Up */}
            <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-300">
              ⚠️ This option works only in <strong>{selectedRegion}</strong>.
              Make sure your account region matches.
            </div>
          </div>
        </div>

        {/* SECTION 2 — DETAILS */}
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
              `Region: ${selectedRegion}`,
              "VPN may be required",
              "Region mismatch not refundable",
            ]}
          />
        </div>

        {/* SECTION 3 — ABOUT + SYSTEM REQUIREMENTS */}
        <div className="mt-14 rounded-xl border border-slate-800 bg-slate-900 p-8 space-y-6">
          <h2 className="text-xl font-semibold">About the game</h2>
          <p className="text-slate-400 leading-relaxed">
            {product.title} delivers an immersive experience with rich gameplay,
            deep progression systems, and high production quality.
          </p>

          <div>
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <Cpu size={18} /> System Requirements
            </h3>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>OS: Windows 10 (64-bit)</li>
              <li>CPU: Intel i5 / Ryzen 5</li>
              <li>RAM: 8 GB</li>
              <li>GPU: GTX 1060 / RX 580</li>
              <li>Storage: 70 GB available space</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        © 2024 Astro Store
      </footer>
    </div>
  );
}

/* ========================= */

function PillButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
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
