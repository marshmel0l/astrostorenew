import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import {
  ShoppingCart,
  Star,
  ChevronLeft,
  Share2,
  Heart,
  Send,
} from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useReviews } from "@/lib/ReviewContext";
import { useState } from "react";
import { gameDatabase } from "@/lib/gameData";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "information" | "reviews"
  >("description");

  const game = gameDatabase.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-xl text-slate-400">Game not found</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-white hover:shadow-lg transition-shadow"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: game.id,
      title: game.title,
      image: game.image,
      price: game.price,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back to Store
        </button>

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Image Section - Smaller */}
          <div className="lg:col-span-1 flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/30 p-6 animate-fade-in">
            <img
              src={game.image}
              alt={game.title}
              className="max-h-80 w-auto rounded-lg shadow-2xl shadow-purple-600/20"
            />
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-slate-100 mb-2">
                {game.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold text-yellow-400">
                    {game.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-400">(1,234 reviews)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-slate-700 py-6">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                ${game.price.toFixed(2)}
              </div>
              <p className="text-slate-400">Limited time offer</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isAdded
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/50"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-600/50"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {isAdded ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isFavorite
                    ? "border-red-500 bg-red-500/10 text-red-400"
                    : "border-slate-600 bg-slate-800/50 text-slate-400 hover:text-slate-300"
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
              <button className="p-3 rounded-lg border border-slate-600 bg-slate-800/50 text-slate-400 hover:text-slate-300 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Account Benefits Box */}
            <div className="rounded-lg border border-purple-600/30 bg-purple-600/10 p-4">
              <h3 className="text-sm font-semibold text-purple-300 mb-3">
                ✓ Account Benefits
              </h3>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>• Shared account with lifetime access</li>
                <li>• Offline mode available</li>
                <li>• Unlimited device access</li>
                <li>• Unlimited downloads</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 border-t border-slate-700 pt-8">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-8 border-b border-slate-700">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "description"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("information")}
              className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "information"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              Product Information
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "reviews"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === "description" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-100">
                  About {game.title}
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {game.title} is an immersive gaming experience that will
                  captivate you for hours. With stunning graphics, compelling
                  storyline, and engaging gameplay mechanics, this is a
                  must-play title for any gaming enthusiast. Experience
                  adventure like never before with this award-winning game.
                </p>
                <p className="text-slate-300 leading-relaxed text-lg">
                  This game features cutting-edge visuals, dynamic gameplay, and
                  a rich narrative that will keep you entertained throughout
                  your journey. Whether you're a casual player or a hardcore
                  gamer, this title offers something for everyone.
                </p>
              </div>
            )}

            {activeTab === "information" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">
                    System Requirements
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                      <p className="text-slate-400 mb-2 font-semibold">
                        Minimum Requirements
                      </p>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        <li>OS: Windows 10 64-bit</li>
                        <li>Processor: Intel i5 / AMD Ryzen 5</li>
                        <li>RAM: 8 GB</li>
                        <li>Storage: 50 GB SSD</li>
                        <li>Graphics: GTX 1660</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                      <p className="text-slate-400 mb-2 font-semibold">
                        Recommended Requirements
                      </p>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        <li>OS: Windows 10/11 64-bit</li>
                        <li>Processor: Intel i7 / AMD Ryzen 7</li>
                        <li>RAM: 16 GB</li>
                        <li>Storage: 100 GB SSD</li>
                        <li>Graphics: RTX 3070</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">
                    Account Details
                  </h2>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center">
                        <span className="text-slate-400">Account Type:</span>
                        <span className="text-slate-200 font-medium">
                          Shared Account
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-slate-400">Access:</span>
                        <span className="text-slate-200 font-medium">
                          Lifetime Access
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-slate-400">Offline Mode:</span>
                        <span className="text-slate-200 font-medium">
                          Available
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-slate-400">Device Limit:</span>
                        <span className="text-slate-200 font-medium">
                          Unlimited
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-slate-400">Downloads:</span>
                        <span className="text-slate-200 font-medium">
                          Unlimited
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-100">
                  Customer Reviews
                </h2>

                {/* Individual Reviews */}
                {[
                  {
                    name: "Alex Johnson",
                    rating: 5,
                    date: "2024-01-15",
                    text: "Absolutely amazing game! The graphics are stunning and the gameplay is incredibly engaging. Worth every penny!",
                  },
                  {
                    name: "Sarah Smith",
                    rating: 5,
                    date: "2024-01-10",
                    text: "Best purchase I've made in a long time. The story is compelling and keeps you hooked from start to finish.",
                  },
                  {
                    name: "Mike Chen",
                    rating: 4,
                    date: "2024-01-05",
                    text: "Great game overall. Some minor bugs but nothing game-breaking. Highly recommended for all types of players.",
                  },
                ].map((review, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-700 bg-slate-800/30 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-100">
                          {review.name}
                        </p>
                        <p className="text-xs text-slate-500">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
