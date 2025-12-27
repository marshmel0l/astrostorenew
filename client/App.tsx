import "./global.css";

import { useEffect } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/lib/CartContext";

import { WishlistProvider } from "@/lib/WishlistContext";

import ScrollToTop from "@/components/ScrollToTop";

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

const App = () => {
  useEffect(() => {
    const disable = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", disable);
    document.addEventListener("dragstart", disable);
    document.addEventListener("selectstart", disable);
    return () => {
      document.removeEventListener("contextmenu", disable);
      document.removeEventListener("dragstart", disable);
      document.removeEventListener("selectstart", disable);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WishlistProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* PUBLIC */}
                  <Route index element={<Index />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="login" element={<Login />} />

                  {/* ACCOUNT */}
                  <Route path="account" element={<Account />}>
                    <Route index element={<AccountProducts />} />
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
};

createRoot(document.getElementById("root")!).render(<App />);
