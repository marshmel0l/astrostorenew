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
  Star,
  FileText,
  Info,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

/* ================= TYPES ================= */
type MainType = "key" | "account";
type AccountType = "offline" | "full" | "shared";

interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  pros: string[];
  cons: string[];
  created_at: string;
  user_name: string;
  verified_purchase: boolean;
}

/* ================= MOCK REVIEWS DATA ================= */
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    user_id: "user1",
    product_id: "1",
    rating: 5,
    comment:
      "An unforgettable experience! The yacht was pure luxury, and the crew took care of every little detail. We can't wait for our next trip. From start to finish, everything was seamless. The service was top-notch, the destinations were breathtaking. Truly a dream come true!",
    pros: ["Amazing graphics", "Engaging storyline", "Great multiplayer", "Regular updates"],
    cons: ["Occasional bugs", "High system requirements"],
    created_at: "2025-12-20T10:30:00Z",
    user_name: "Sophia & Daniel",
    verified_purchase: true,
  },
  {
    id: "2",
    user_id: "user2",
    product_id: "1",
    rating: 4,
    comment:
      "We celebrated our anniversary on board — it was magical. Private chef, sunset views, crystal-clear waters... absolutely perfect. It felt like having a floating five-star hotel. The yacht was stunning, the staff was so attentive. Best vacation of our lives!",
    pros: ["Excellent combat system", "Beautiful open world", "Good optimization"],
    cons: ["Some missions feel repetitive", "Could use more character customization"],
    created_at: "2025-12-18T14:20:00Z",
    user_name: "Liam & Emily",
    verified_purchase: true,
  },
  {
    id: "3",
    user_id: "user3",
    product_id: "1",
    rating: 5,
    comment:
      "Worth every penny! The game delivers on all fronts. Graphics are stunning, gameplay is addictive, and the story kept me hooked for hours. Highly recommend to anyone looking for a premium gaming experience.",
    pros: ["Immersive world", "Fantastic sound design", "Endless replay value"],
    cons: ["Learning curve is steep at first"],
    created_at: "2025-12-15T09:15:00Z",
    user_name: "Alexander K.",
    verified_purchase: true,
  },
];

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(true);

  /* ================= ARC RAIDERS IMAGE ================= */
  const arcRaidersImage =
    "https://image.api.playstation.com/vulcan/ap/rnd/202309/1321/13bdd29ab54b03699620adb9a20a2a0c1a02ec6a0b1cee81.png";
  const arcRaidersBackground =
    "https://image.api.playstation.com/vulcan/ap/rnd/202309/1321/a1f3b0c023b5a42884e88872f15f0d8055accdea1e1bf3c8.jpg";

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      const games = await fetchGames();
      const found = games.find((g) => g.id === id) || null;
      setProduct(found);

      if (found) {
        setReviews(MOCK_REVIEWS);
      }
    };
    loadData();
  }, [id]);

  /* ================= LOADING ================= */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
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
      type: mainType === "key" ? "key" : (`${accountType}_account` as ProductType),
      region: mainType === "key" ? region : "Any",
    });
    toast.success("Added to cart", {
      description: product.title,
      duration: 2500,
    });
  };

  /* ================= WISHLIST ================= */
  // has() takes string id
  const isWishlisted = has(product.id);

  const handleToggleWishlist = () => {
    // toggle() takes WishlistItem object
    toggle({
      id: product.id,
      title: product.title,
      image: product.image,
    });
  };

  /* ================= REVIEW NAVIGATION ================= */
  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  /* ================= UI ================= */
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-slate-900"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* HIGH-RES BACKGROUND (NO LOGO) */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${arcRaidersBackground})`,
            filter: "blur(60px) brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/98 to-slate-900" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-6">
        {/* TITLE & WISHLIST */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-2">Arc Raiders</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}
                  />
                ))}
              </div>
              <span className="text-slate-400 text-sm">({reviews.length} reviews)</span>
            </div>
          </div>
          <button
            onClick={handleToggleWishlist}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              isWishlisted
                ? "bg-pink-500/20 text-pink-400"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-pink-400"
            }`}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr_320px] gap-5 mb-8">
          {/* LEFT - IMAGE */}
          <div>
            <div className="w-[280px] h-[373px] rounded-xl overflow-hidden bg-slate-800/30 border border-slate-700/30">
              {!imageLoaded && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
                </div>
              )}
              <img
                src={arcRaidersImage}
                alt="Arc Raiders"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                draggable="false"
              />
            </div>
          </div>

          {/* MIDDLE - SELECTORS */}
          <div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 space-y-3">
              <SelectorRow label="Purchase Type">
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

              <SelectorRow label="Platform">
                <SelectorButton active={true} label={platform} />
              </SelectorRow>

              <div key={mainType} className="animate-fade-up space-y-4">
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
              </div>
            </div>
          </div>

          {/* RIGHT - BUY SECTION */}
          <div className="space-y-4">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-white">€{finalPrice}</span>
                {priceMultiplier !== 1 && (
                  <span className="text-slate-500 text-sm line-through">
                    €{basePrice.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 mb-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700">
                Buy Now
              </button>
            </div>

            <div className="space-y-2">
              <InfoItem text="Instant Delivery" />
              <InfoItem text="24/7 Support" />
              <InfoItem text="Money Back Guarantee" />
            </div>
          </div>
        </div>

        {/* DESCRIPTION + SYSTEM REQS */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText size={24} className="text-purple-400" />
            Description
          </h2>
          <div className="space-y-4 text-slate-300">
            <p>
              Immerse yourself in an epic open-world adventure filled with stunning graphics and
              captivating storytelling. This game delivers an unparalleled experience with advanced
              combat systems, extensive character customization, and a dynamic world that reacts to
              your choices.
            </p>

            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Massive open-world environment with breathtaking visuals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Deep storyline with multiple endings based on your decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Advanced combat mechanics and skill progression system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Online multiplayer and co-operative gameplay modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Regular content updates and expansion packs</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4">System Requirements</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    Minimum
                  </h4>
                  <div className="space-y-2 text-sm">
                    <RequirementRow label="OS" value="Windows 10 (64-bit)" />
                    <RequirementRow label="CPU" value="Intel i5-4460 / AMD FX-6300" />
                    <RequirementRow label="RAM" value="8 GB" />
                    <RequirementRow label="GPU" value="GTX 760 / Radeon HD 7950" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    Recommended
                  </h4>
                  <div className="space-y-2 text-sm">
                    <RequirementRow label="OS" value="Windows 11 (64-bit)" />
                    <RequirementRow label="CPU" value="Intel i7-8700K / AMD Ryzen 5 3600" />
                    <RequirementRow label="RAM" value="16 GB" />
                    <RequirementRow label="GPU" value="RTX 2060 / RX 5700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div key={`${mainType}-${accountType}`} className="animate-fade-up">
          <InstructionsBox mainType={mainType} accountType={accountType} platform={platform} />
        </div>

        {/* REVIEWS */}
        {reviews.length > 0 && (
          <div className="mt-8">
            <ReviewsCarousel
              reviews={reviews}
              currentIndex={currentReviewIndex}
              onNext={nextReview}
              onPrev={prevReview}
              onWriteReview={() => setShowReviewModal(true)}
              canWriteReview={hasPurchased}
            />
          </div>
        )}
      </div>

      {/* REVIEW MODAL */}
      {showReviewModal && (
        <ReviewModal
          productId={product.id}
          onClose={() => setShowReviewModal(false)}
          onSubmit={(newReview) => {
            setReviews([newReview, ...reviews]);
            setShowReviewModal(false);
            toast.success("Review submitted successfully!");
          }}
        />
      )}
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function SelectorRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {label}
      </label>
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
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-purple-600 text-white"
          : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
      }`}
    >
      {label}
    </button>
  );
}

function InfoItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-400 rounded-lg text-sm font-medium border border-green-500/20">
      <Check size={14} />
      <span>{text}</span>
    </div>
  );
}

function RequirementRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400">{label}:</span>
      <span className="text-white font-medium text-right">{value}</span>
    </div>
  );
}

function ReviewsCarousel({
  reviews,
  currentIndex,
  onNext,
  onPrev,
  onWriteReview,
  canWriteReview,
}: {
  reviews: Review[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onWriteReview: () => void;
  canWriteReview: boolean;
}) {
  const currentReview = reviews[currentIndex];
  const nextReview = reviews[(currentIndex + 1) % reviews.length];

  return (
    <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden border border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-transparent" />
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-slate-600" />
            ))}
          </div>
          <h2
            className="text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "Inter, serif", fontStyle: "italic" }}
          >
            What they say?
          </h2>
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{reviews.length}+</div>
              <div className="text-slate-400 text-sm">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10,000+</div>
              <div className="text-slate-400 text-sm">Happy Clients</div>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] mb-6 overflow-hidden">
          <div className="absolute inset-0 grid md:grid-cols-2 gap-6">
            <div
              key={`current-${currentIndex}`}
              className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 animate-slide-up"
            >
              <div className="mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-white">{currentReview.user_name}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(currentReview.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < currentReview.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-slate-600"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3 leading-relaxed line-clamp-6">
                {currentReview.comment}
              </p>

              {currentReview.pros.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 text-green-400 text-xs font-semibold mb-1">
                    <ThumbsUp size={10} />
                    <span>PROS</span>
                  </div>
                  <ul className="space-y-1">
                    {currentReview.pros.slice(0, 2).map((pro, i) => (
                      <li key={i} className="text-slate-400 text-xs flex items-start gap-2">
                        <span className="text-green-400">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentReview.cons.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-red-400 text-xs font-semibold mb-1">
                    <ThumbsDown size={10} />
                    <span>CONS</span>
                  </div>
                  <ul className="space-y-1">
                    {currentReview.cons.slice(0, 2).map((con, i) => (
                      <li key={i} className="text-slate-400 text-xs flex items-start gap-2">
                        <span className="text-red-400">-</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentReview.verified_purchase && (
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <Check size={10} />
                    Verified Purchase
                  </span>
                </div>
              )}
            </div>

            {nextReview && (
              <div
                key={`next-${currentIndex}`}
                className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 opacity-60 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-white">{nextReview.user_name}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(nextReview.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < nextReview.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-600"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-8">
                  {nextReview.comment}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              className="w-9 h-9 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-white flex items-center justify-center transition-colors border border-slate-700/50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onNext}
              className="w-9 h-9 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-white flex items-center justify-center transition-colors border border-slate-700/50"
            >
              <ChevronRight size={18} />
            </button>
            <span className="text-slate-400 text-sm ml-2">
              {currentIndex + 1} / {reviews.length}
            </span>
          </div>

          {canWriteReview && (
            <button
              onClick={onWriteReview}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg font-semibold transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewModal({
  productId,
  onClose,
  onSubmit,
}: {
  productId: string;
  onClose: () => void;
  onSubmit: (review: Review) => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [pros, setPros] = useState<string[]>([""]);
  const [cons, setCons] = useState<string[]>([""]);

  const handleSubmit = () => {
    const newReview: Review = {
      id: Date.now().toString(),
      user_id: "current_user",
      product_id: productId,
      rating,
      comment,
      pros: pros.filter((p) => p.trim()),
      cons: cons.filter((c) => c.trim()),
      created_at: new Date().toISOString(),
      user_name: "You",
      verified_purchase: true,
    };
    onSubmit(newReview);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Write a Review</h2>

        <div className="mb-4">
          <label className="text-sm text-slate-400 mb-2 block">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={
                    star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-400 mb-2 block">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white resize-none focus:border-purple-500 focus:outline-none"
            rows={4}
            placeholder="Share your experience with this game..."
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-green-400 mb-2 block flex items-center gap-2">
            <ThumbsUp size={12} />
            Pros
          </label>
          {pros.map((pro, i) => (
            <input
              key={i}
              value={pro}
              onChange={(e) => {
                const newPros = [...pros];
                newPros[i] = e.target.value;
                setPros(newPros);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white mb-2 text-sm focus:border-green-500 focus:outline-none"
              placeholder="What did you like?"
            />
          ))}
          <button
            onClick={() => setPros([...pros, ""])}
            className="text-xs text-purple-400 hover:text-purple-300"
          >
            + Add another pro
          </button>
        </div>

        <div className="mb-6">
          <label className="text-sm text-red-400 mb-2 block flex items-center gap-2">
            <ThumbsDown size={12} />
            Cons
          </label>
          {cons.map((con, i) => (
            <input
              key={i}
              value={con}
              onChange={(e) => {
                const newCons = [...cons];
                newCons[i] = e.target.value;
                setCons(newCons);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white mb-2 text-sm focus:border-red-500 focus:outline-none"
              placeholder="What could be improved?"
            />
          ))}
          <button
            onClick={() => setCons([...cons, ""])}
            className="text-xs text-purple-400 hover:text-purple-300"
          >
            + Add another con
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

function InstructionsBox({
  mainType,
  accountType,
  platform,
}: {
  mainType: MainType;
  accountType: AccountType;
  platform: string;
}) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <FileText size={24} className="text-purple-400" />
        How to Redeem
      </h3>

      {mainType === "key" ? (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Follow these steps to activate your {platform} game key:
          </p>
          <ol className="space-y-3">
            <InstructionStep
              number={1}
              text="Download and install the Steam client from store.steampowered.com"
            />
            <InstructionStep
              number={2}
              text="Log in to your Steam account or create a new one"
            />
            <InstructionStep
              number={3}
              text="Click on 'Games' in the top menu and select 'Activate a Product on Steam'"
            />
            <InstructionStep
              number={4}
              text="Enter your product key when prompted and click 'Next'"
            />
            <InstructionStep
              number={5}
              text="The game will be added to your library and ready to download"
            />
          </ol>
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-2">
            <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-blue-400 text-xs">
              Tip: Make sure you're in the correct region before activating your key. Some keys are
              region-locked.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            You're purchasing a{" "}
            <span className="font-semibold text-white">
              {accountType === "offline"
                ? "Offline Account"
                : accountType === "full"
                ? "Full Access Account"
                : "Shared Account"}
            </span>
            :
          </p>

          {accountType === "offline" && (
            <div className="space-y-3">
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-semibold text-white mb-2">What is Offline Account?</h4>
                <p className="text-slate-300 text-sm mb-2">
                  An account that's set as "primary" on your console, allowing you to play games offline.
                </p>
              </div>
              <ol className="space-y-2">
                <InstructionStep
                  number={1}
                  text="You'll receive account credentials (email & password)"
                />
                <InstructionStep
                  number={2}
                  text="Sign in on your PC/Console with the provided credentials"
                />
                <InstructionStep
                  number={3}
                  text="Set the account as 'Primary' in your system settings"
                />
                <InstructionStep
                  number={4}
                  text="Download the game and play offline on YOUR account"
                />
              </ol>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
                <AlertCircle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-400 text-xs">
                  Do not change account password or email. Account is for game access only.
                </p>
              </div>
            </div>
          )}

          {accountType === "full" && (
            <div className="space-y-3">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-semibold text-white mb-2">What is Full Access Account?</h4>
                <p className="text-slate-300 text-sm mb-2">
                  Complete ownership of the account. You can change email, password, and all details.
                </p>
              </div>
              <ol className="space-y-2">
                <InstructionStep
                  number={1}
                  text="You'll receive account credentials (email & password)"
                />
                <InstructionStep
                  number={2}
                  text="Sign in and immediately change the password"
                />
                <InstructionStep
                  number={3}
                  text="Update email address to your own email"
                />
                <InstructionStep
                  number={4}
                  text="Enable 2FA for additional security"
                />
                <InstructionStep
                  number={5}
                  text="The account and game are now fully yours"
                />
              </ol>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-2">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-400 text-xs">
                  You have complete control. Change any details you want!
                </p>
              </div>
            </div>
          )}

          {accountType === "shared" && (
            <div className="space-y-3">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h4 className="font-semibold text-white mb-2">What is Shared Account?</h4>
                <p className="text-slate-300 text-sm mb-2">
                  Multiple users share the same account. Most affordable option but with some limitations.
                </p>
              </div>
              <ol className="space-y-2">
                <InstructionStep
                  number={1}
                  text="You'll receive account credentials (email & password)"
                />
                <InstructionStep
                  number={2}
                  text="Sign in using the provided credentials"
                />
                <InstructionStep
                  number={3}
                  text="Download and install the game"
                />
                <InstructionStep
                  number={4}
                  text="Play in offline mode to avoid conflicts"
                />
              </ol>
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-xs">
                    Important: Do NOT change password or email
                  </p>
                </div>
                <p className="text-red-400 text-xs pl-6">
                  Account is shared with other buyers
                </p>
                <p className="text-red-400 text-xs pl-6">
                  Play in offline mode to avoid login conflicts
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InstructionStep({ number, text }: { number: number; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
        {number}
      </span>
      <span className="text-slate-300 text-sm pt-0.5">{text}</span>
    </li>
  );
}
