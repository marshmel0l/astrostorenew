import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/lib/CartContext";
import { WishlistProvider } from "@/lib/WishlistContext";

import Layout from "@/components/Layout";

import Index from "@/pages/Index";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

import Account from "@/pages/account/Account";
import AccountProducts from "@/pages/account/Products";
import AccountOrders from "@/pages/account/Orders";
import AccountReviews from "@/pages/account/Reviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WishlistProvider>
        <CartProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                {/* PUBLIC */}
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />

                {/* ACCOUNT */}
                <Route path="/account" element={<Account />}>
                  <Route index element={<AccountProducts />} />
                  <Route path="products" element={<AccountProducts />} />
                  <Route path="orders" element={<AccountOrders />} />
                  <Route path="reviews" element={<AccountReviews />} />
                </Route>

                {/* FALLBACK */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
