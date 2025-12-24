import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWishlist } from "@/lib/WishlistContext";
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
  Heart,
} from "lucide-react";

type TypeConfig = {
  label: string;
  priceMultiplier: number;
  description: string[];
  requiresRegion?: boolean;
  regions?: string[];
};

const TYPE_CONFIG: Record<ProductType, TypeConfig> = {
  key: {
    label: "Game Key",
    priceMultiplier: 1,
    requiresRegion: true,
    regions: ["Global", "EU", "US"],
    description: [
      "Official activation key",
      "Permanent ownership",
      "May require VPN",
    ],
  },
  offline_account: {
    label: "Offline Account",
    priceMultiplier: 0.8,
    description: [
      "Play in offline mode",
      "Unlimited access",
      "No email or password changes",
      "Login from anywhere",
    ],
  },
  shared_account: {
    label: "Shared Account",
    priceMultiplier: 0.65,
    description: [
      "Play from provided account",
      "Online & offline access",
      "Shared usage",
      "Login from anywhere",
    ],
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();

  const [product, setProduct] = useState<Game | null>(null);
  const [purchaseType, setPurchaseType] = useState<ProductType | null>(null);
  const [region, setRegion] = useState<string>("Global");

  useEffect(() => {
    fetchGames().then((games) => {
      const found = games.find((g) => g.id === id) || null;
      setProduct(found);
      if (found) setPurchaseType(found.available_types[0]);
    });
  }, [id]);

  if (!product || !purchaseType) return null;

  const config = TYPE_CONFIG[purchaseType];
  const finalPrice = (
    product.price * config.priceMultiplier
  ).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: Number(finalPrice),
      type: purchaseType,
      region: config.requiresRegion ? region : "N/A",
    });

    toast({
      title: "Added to cart",
      description: product.title,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      {/* TOP */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <button
              onClick={() =>
                toggle({
                  id: product.id,
                  title: product.title,
                  image: product.image,
                })
              }
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-pink-400 transition"
            >
              <Heart
                size={18}
                fill={has(product.id) ? "currentColor" : "none"}
              />
              {has(product.id) ? "Saved" : "Save"}
            </button>
          </div>

          {/* TYPE SELECTOR */}
          <div className="flex flex-wrap gap-2">
            {product.available_types.map((type) => (
              <PillButton
                key={type}
                active={purchaseType === type}
                onClick={() => setPurchaseType(type)}
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

          {/* REGION — ONLY FOR KEYS */}
          {config.requiresRegion && (
            <div>
              <p className="mb-2 flex items-center gap-1 text-sm text-slate-400">
                <Globe size={14} /> Select region
              </p>
              <div className="flex gap-2">
                {config.regions!.map((r) => (
                  <PillButton
                    key={r}
                    active={region === r}
                    onClick={() => setRegion(r)}
                    label={r}
                  />
                ))}
              </div>
            </div>
          )}

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-purple-400">
              €{finalPrice}
            </span>

            <button className="rounded-lg bg-purple-600 px-6 py-3 font-medium hover:bg-purple-500 transition">
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-slate-300 hover:border-purple-500 hover:text-purple-400 transition"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>

          {/* CONDITIONS */}
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
            <ul className="space-y-1">
              {config.description.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        <DetailBox
          icon={<Info size={18} />}
          title="What you get"
          items={config.description}
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
          icon={<Cpu size={18} />}
          title="System Requirements"
          items={[
            "OS: Windows 10 (64-bit)",
            "CPU: Intel i5 / Ryzen 5",
            "RAM: 8 GB",
            "GPU: GTX 1060 / RX 580",
            "Storage: 70 GB",
          ]}
        />
      </div>
    </div>
  );
}

/* UI */

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
