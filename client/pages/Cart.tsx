import { useNavigate } from "react-router-dom";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import { animations, staggerDelay } from "@/lib/animations";
import { PayPalIcon } from "@/components/icons/PayPalIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();

  const whatsappNumber = "1234567890";

  const generateWhatsAppMessage = () => {
    let message = "🎮 *Game Store Order* 🛒\n\n";
    message += "*Games Ordered:*\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += ` Qty: ${item.quantity} × $${item.price.toFixed(2)}\n`;
      message += ` Total: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    message += `*━━━━━━━━━━━━━━━━*\n`;
    message += `*Total Amount: $${total.toFixed(2)}*\n`;
    message += `*━━━━━━━━━━━━━━━━*\n\n`;
    message += `*Shared Account with Offline Mode*\n`;
    message += `*Lifetime Access*\n\n`;
    message += `Please confirm this order. Thank you!`;
    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
    toast.success("Opening WhatsApp...", {
      description: "Your order details have been prepared",
      duration: 2000,
    });
  };

  const handlePayPalCheckout = () => {
    toast.success("Redirecting to PayPal...", {
      description: "Please wait",
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
    toast.success("Proceeding to checkout...", {
      description: "Redirecting",
      duration: 2000,
    });
  };

  const handleRemove = (id: string, title: string) => {
    removeFromCart(id);
    toast.success("Removed from cart", {
      description: title,
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared", {
      description: "All items have been removed",
      duration: 2000,
    });
  };

  const handleQuantityChange = (id: string, newQty: number, title: string) => {
    updateQuantity(id, newQty);
    toast.success("Quantity updated", {
      description: `${title} - ${newQty} item${newQty !== 1 ? "s" : ""}`,
      duration: 1500,
    });
  };

  if (items.length === 0) {
    return (
      <div className={animations.pageEnter}>
        <div className="min-h-screen bg-[#0D1117] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className={`text-6xl mb-6 ${animations.pageEnter}`}>🛒</div>
              <h2 className={`text-2xl font-bold text-white mb-2 ${animations.delay1}`}>
                Your cart is empty
              </h2>
              <p className={`text-slate-400 mb-8 ${animations.delay2}`}>
                Start shopping to add games to your cart!
              </p>
              <button
                onClick={() => navigate("/")}
                className={`px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg ${animations.button} ${animations.delay3}`}
              >
                Browse Games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={animations.pageEnter}>
      <div className="min-h-screen bg-[#0D1117] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className={`flex items-center gap-3 mb-8 text-sm ${animations.pageEnter}`}>
            <button
              onClick={() => navigate("/")}
              className={`text-slate-400 hover:text-white ${animations.smooth}`}
            >
              Cart
            </button>
            <span className="text-slate-600">›</span>
            <span className="text-slate-500">Checkout</span>
            <span className="text-slate-600">›</span>
            <span className="text-slate-500">Payment</span>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT: Cart Items */}
            <div className={`lg:col-span-2 ${animations.delay1}`}>
              <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-white">
                    Cart{" "}
                    <span className="text-slate-400 text-lg">({items.length} products)</span>
                  </h1>
                  <button
                    onClick={handleClearCart}
                    className={`text-sm text-slate-400 hover:text-red-400 flex items-center gap-1 ${animations.hover}`}
                  >
                    <X size={16} />
                    Clear cart
                  </button>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-slate-700/50 text-sm text-slate-400 mb-4">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Count</div>
                  <div className="col-span-3 text-right">Price</div>
                  <div className="col-span-1" />
                </div>

                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`grid grid-cols-12 gap-4 items-center bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 ${animations.pageEnter} ${animations.hoverCard}`}
                      style={staggerDelay(index)}
                    >
                      {/* Product */}
                      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                        <div className="w-20 h-28 rounded-lg overflow-hidden bg-slate-700/50 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`w-full h-full object-cover ${animations.hoverImage}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-slate-400">Digital</p>
                        </div>
                      </div>

                      {/* Count */}
                      <div className="col-span-6 md:col-span-2 flex justify-center">
                        <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                Math.max(1, item.quantity - 1),
                                item.title,
                              )
                            }
                            className={`w-8 h-8 flex items-center justify-center text-white hover:bg-slate-600/50 rounded ${animations.buttonIcon}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center text-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1, item.title)
                            }
                            className={`w-8 h-8 flex items-center justify-center text-white hover:bg-slate-600/50 rounded ${animations.buttonIcon}`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-5 md:col-span-3 text-right">
                        <div className="text-white font-bold text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>

                      {/* Remove */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => handleRemove(item.id, item.title)}
                          className={`w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded ${animations.buttonIcon}`}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banner */}
              <div
                className={`mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 flex items-center justify-between ${animations.delay2} hover:border-purple-500/50 ${animations.smooth}`}
              >
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Check the newest Apple products
                  </h3>
                  <p className="text-slate-300 text-sm">Limited time offers</p>
                </div>
                <button
                  className={`px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg ${animations.button}`}
                >
                  Shop now
                </button>
              </div>
            </div>

            {/* RIGHT: Summary */}
            <div className={`lg:col-span-1 ${animations.delay2}`}>
              <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6 sticky top-24">
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-white font-semibold mb-3 block">Promo code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type here..."
                      className={`flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none ${animations.input}`}
                    />
                    <button
                      className={`px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium ${animations.button}`}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-slate-700/50">
                  <div
                    className={`flex justify-between text-slate-400 hover:text-slate-300 ${animations.smooth}`}
                  >
                    <span>Subtotal</span>
                    <span className="text-white font-medium">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between text-slate-400 hover:text-slate-300 ${animations.smooth}`}
                  >
                    <span>Discount</span>
                    <span className="text-white font-medium">-$0.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span className="text-white">Total</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>

                {/* Main Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl mb-4 transition-all duration-100 hover:scale-105 active:scale-95"
                >
                  Checkout
                </button>

                {/* Quick Payment Options */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-px bg-slate-700/50" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    Or pay with
                  </span>
                  <div className="flex-1 h-px bg-slate-700/50" />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePayPalCheckout}
                    className="flex-1 py-3 bg-slate-800/50 hover:bg-[#0070ba]/20 border border-slate-700/50 hover:border-[#0070ba]/60 rounded-lg transition-all duration-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                    title="Checkout with PayPal"
                  >
                    <PayPalIcon className="w-5 h-5" />
                    <span className="text-slate-300 text-sm font-medium group-hover:text-white">
                      PayPal
                    </span>
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="flex-1 py-3 bg-slate-800/50 hover:bg-[#25D366]/20 border border-slate-700/50 hover:border-[#25D366]/60 rounded-lg transition-all duration-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                    title="Checkout with WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span className="text-slate-300 text-sm font-medium group-hover:text-white">
                      WhatsApp
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
