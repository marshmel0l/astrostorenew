import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { ShoppingCart, Star, ChevronLeft, Share2, Heart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { gameDatabase } from "@/lib/gameData";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const game = gameDatabase.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-xl text-slate-300">Game not found</p>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back to Store
        </button>

        {/* Product Section */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Section */}
          <div className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 p-8 animate-fade-in">
            <img
              src={game.image}
              alt={game.title}
              className="max-h-96 w-auto rounded-lg shadow-2xl shadow-purple-600/20"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Title */}
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

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-slate-100 mb-3">
                About this game
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {game.title} is an immersive gaming experience that will
                captivate you for hours. With stunning graphics, compelling
                storyline, and engaging gameplay, this is a must-play title
                for any gaming enthusiast. Experience adventure like never
                before with this award-winning game.
              </p>
            </div>

            {/* Specifications */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">
                Account Details
              </h2>
              <ul className="space-y-3 text-sm">
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
                  <span className="text-slate-200 font-medium">Available</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Device Limit:</span>
                  <span className="text-slate-200 font-medium">
                    Unlimited
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Downloads:</span>
                  <span className="text-slate-200 font-medium">Unlimited</span>
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-4 border-t border-slate-700 pt-4">
                *This is a shared account with lifetime access. Perfect for
                budget-conscious gamers who want to play offline or share with
                family members.
              </p>
            </div>

            {/* System Requirements */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">
                System Requirements
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 mb-1">OS:</p>
                  <p className="text-slate-200">Windows 10/11</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Processor:</p>
                  <p className="text-slate-200">Intel i7 / AMD Ryzen 5</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">RAM:</p>
                  <p className="text-slate-200">16 GB</p>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Storage:</p>
                  <p className="text-slate-200">100 GB SSD</p>
                </div>
              </div>
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
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-300"
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
              <button className="p-3 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-slate-300 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
