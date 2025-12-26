import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWishlist } from "@/lib/WishlistContext";
import { useCart } from "@/lib/CartContext";
import { fetchGames, type Game, type ProductType } from "@/lib/gameData";
import { toast } from "sonner";
import {
  ShoppingCart,
  Heart,
  Check,
} from "lucide-react";

/* ================= TYPES ================= */

type MainType = "key" | "account";
type AccountType = "offline" | "full" | "shared";

/* ================= PAGE ================= */

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();

  const [product, setProduct] = useState<Game | null>(null);

  const [mainType, setMainType] = useState<MainType>("key");
  const [accountType, setAccountType] = useState<AccountType>("offline");
  const [platform] = useState("PC (WW)");
  const [region, setRegion] = useState("Global");
  const [edition, setEdition] = useState("Standard");

  /* ================= LOAD ================= */

  useEffect(() => {
    fetchGames().then((games) => {
      const found = games.find((g) => g.id === id) || null;
      setProduct(found);
    });
  }, [id]);

  /* ================= LOADING ================= */

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="h-[500px] rounded-xl bg-slate-800/40 animate-pulse" />
      </div>
    );
  }

  /* ================= PRICE ================= */

  const basePrice = product.price;

  const priceMultiplier =
    mainType === "key"
      ? 1
      : accountType === "offline"
      ? 0.7
      : accountType === "shared"
      ? 0.6
      : 0.85;

  const finalPrice = (basePrice * priceMultiplier).toFixed(2);

  /* ================= CART ================= */

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: Number(finalPrice),
      type:
        mainType === "key"
          ? "key"
          : (`${accountType}_account` as ProductType),
      region: mainType === "key" ? region : "Any",
    });

toast.success("Added to cart", {
  description: product.title,
  duration: 2500,
});


  };

  /* ================= UI ================= */

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-2xl bg-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/90 to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 space-y-12">
        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* TITLE */}
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <button
                onClick={() =>
                  toggle({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                  })
                }
                className="text-slate-400 hover:text-pink-400 transition"
              >
                <Heart
                  size={20}
                  fill={has(product.id) ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* TYPE */}
            <SelectorRow label="Type">
              <SelectorButton
                active={mainType === "key"}
                onClick={() => setMainType("key")}
                label="Key"
              />
              <SelectorButton
                active={mainType === "account"}
                onClick={() => setMainType("account")}
                label="Account"
              />
            </SelectorRow>

            {/* PLATFORM */}
            <SelectorRow label="Platform">
              <SelectorButton active label={platform} />
            </SelectorRow>

            {/* REGION */}
            {mainType === "key" && (
              <SelectorRow label="Region">
                {["Global", "EU", "US"].map((r) => (
                  <SelectorButton
                    key={r}
                    active={region === r}
                    onClick={() => setRegion(r)}
                    label={r}
                  />
                ))}
              </SelectorRow>
            )}

            {/* EDITION */}
            <SelectorRow label="Edition">
              {["Standard", "Deluxe"].map((e) => (
                <SelectorButton
                  key={e}
                  active={edition === e}
                  onClick={() => setEdition(e)}
                  label={e}
                />
              ))}
            </SelectorRow>

            {/* ACCOUNT TYPE */}
            {mainType === "account" && (
              <SelectorRow label="Account Type">
                <SelectorButton
                  active={accountType === "offline"}
                  onClick={() => setAccountType("offline")}
                  label="Offline"
                />
                <SelectorButton
                  active={accountType === "full"}
                  onClick={() => setAccountType("full")}
                  label="Full Access"
                />
                <SelectorButton
                  active={accountType === "shared"}
                  onClick={() => setAccountType("shared")}
                  label="Shared"
                />
              </SelectorRow>
            )}

            {/* PRICE */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">
                €{finalPrice}
              </div>

              <div className="flex gap-4">
                <button className="bg-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-500 transition">
                  Buy Now
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-purple-500 transition"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
              <InfoItem text="In stock" />
              <InfoItem text="Instant delivery" />
              <InfoItem
                text={mainType === "key" ? "Digital key" : "Account access"}
              />
              <InfoItem text="Login from anywhere" />
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">About the game</h2>
          <p className="text-slate-300 max-w-4xl">
            Dummy content for now. Full description will come from admin panel.
          </p>
        </section>

        {/* SYSTEM */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailBox
            title="Minimum"
            items={[
              "Windows 10 (64-bit)",
              "Intel i5 / Ryzen 5",
              "8 GB RAM",
              "GTX 1060 / RX 580",
            ]}
          />
          <DetailBox
            title="Recommended"
            items={[
              "Windows 10 (64-bit)",
              "Intel i7 / Ryzen 7",
              "16 GB RAM",
              "RTX 2060 / RX 5700",
            ]}
          />
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SelectorRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function SelectorButton({
  active,
  onClick,
  label,
}: {
  active?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm transition ${
        active
          ? "bg-purple-600 text-white"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

function InfoItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check size={14} className="text-green-400" />
      <span>{text}</span>
    </div>
  );
}

function DetailBox({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ul className="space-y-1 text-sm text-slate-400">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
