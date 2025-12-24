import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Order = {
  id: string;
  total: number;
  status: "completed" | "pending" | "cancelled";
  created_at: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("orders")
        .select("id,total,status,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setOrders(data ?? []);
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-xl border border-slate-800 bg-slate-800/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">My Orders</h1>
        <p className="text-sm text-slate-400">
          Track your purchases and order status
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-20 text-center">
          <ShoppingBag size={40} className="text-slate-500 mb-4" />
          <h2 className="text-lg font-medium">No orders yet</h2>
          <p className="text-sm text-slate-400">
            Your purchases will appear here once you buy something
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <div className="flex items-center gap-4">
                {order.status === "completed" && (
                  <CheckCircle2 className="text-green-400" size={20} />
                )}
                {order.status === "pending" && (
                  <Clock className="text-yellow-400" size={20} />
                )}
                {order.status === "cancelled" && (
                  <XCircle className="text-red-400" size={20} />
                )}

                <div>
                  <p className="font-medium">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium">${order.total.toFixed(2)}</p>
                <span
                  className={`text-xs capitalize ${
                    order.status === "completed"
                      ? "text-green-400"
                      : order.status === "pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
