import "./global.css";

import RequireAdmin from "@/components/RequireAdmin";
import AdminLayout from "@/pages/admin/AdminLayout";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/lib/CartContext";
import Login from "@/pages/Login";
import Account from "@/pages/Account"; // we’ll add next
import Account from "@/pages/Account";
import AccountProducts from "@/pages/account/Products";
import AccountOrders from "@/pages/account/Orders";
import AccountReviews from "@/pages/account/Reviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
  path="/admin"
  element={
    <RequireAdmin>
  }
/>
              <Route path="/account" element={<Account />}>
  <Route index element={<AccountProducts />} />
  <Route path="products" element={<AccountProducts />} />
  <Route path="orders" element={<AccountOrders />} />
  <Route path="reviews" element={<AccountReviews />} />
              <Route path="/login" element={<Login />} />
<Route path="/account" element={<Account />} />
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </AdminLayout>
     </RequireAdmin>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
