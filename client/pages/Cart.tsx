import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import {
  ChevronLeft,
  X,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const total = getTotalPrice();
  const whatsappNumber = "1234567890"; // Replace with your WhatsApp number

  const generateWhatsAppMessage = () => {
    let message = "🎮 *Astro Store Order* 🛒\n\n";
    message += "*Games Ordered:*\n";

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   Qty: ${item.quantity} × $${item.price.toFixed(2)}\n`;
      message += `   Total: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `*━━━━━━━━━━━━━━━━*\n`;
    message += `*Total Amount: $${total.toFixed(2)}*\n`;
    message += `*━━━━━━━━━━━━━━━━*\n\n`;
    message += `*Shared Account with Offline Mode*\n`;
    message += `*Lifetime Access*\n\n`;
    message += `Please confirm this order. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleCheckoutWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center animate-fade-in">
            <ShoppingBag className="h-24 w-24 text-slate-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              Your cart is empty
            </h1>
            <p className="text-slate-400 mb-8">
              Start shopping to add games to your cart!
            </p>
            <button
              onClick={() => navigate("/")}
              className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-white font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </button>

        <h1 className="text-4xl font-bold text-slate-100 mb-8 animate-fade-in">
          Shopping Cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 animate-fade-in">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 rounded-lg object-cover shadow-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100 hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-2 py-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-slate-200 font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg border border-slate-700 bg-slate-800/50 p-6 sticky top-24 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">
              Order Summary
            </h2>

            {/* Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-slate-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-slate-700 pt-4 mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-100 font-semibold">Total</span>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {items.length} item{items.length !== 1 ? "s" : ""} in cart
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-white font-semibold hover:shadow-lg hover:shadow-green-600/50 transition-all transform hover:scale-105 active:scale-95 mb-3"
            >
              <MessageCircle className="h-5 w-5" />
              Checkout with WhatsApp
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate("/")}
              className="w-full rounded-lg border border-slate-700 px-4 py-2 text-slate-300 font-semibold hover:border-purple-500 hover:text-purple-300 transition-colors"
            >
              Continue Shopping
            </button>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="w-full mt-3 rounded-lg text-slate-400 text-sm hover:text-red-400 transition-colors py-2"
            >
              Clear Cart
            </button>

            {/* Info Box */}
            <div className="mt-6 rounded-lg bg-purple-600/10 border border-purple-600/30 p-3 text-xs text-purple-300">
              <p className="font-semibold mb-1">✓ Shared Account Benefits</p>
              <p className="text-purple-200">
                Lifetime access, offline mode, unlimited downloads
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
