import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Star, MessageSquare } from "lucide-react";

type Review = {
  id: string;
  rating: number;
  comment: string;
  product_title: string;
  created_at: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("reviews")
        .select(
          "id,rating,comment,created_at,products(title)"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const mapped =
        data?.map((r: any) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          created_at: r.created_at,
          product_title: r.products?.title ?? "Unknown product",
        })) ?? [];

      setReviews(mapped);
      setLoading(false);
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-slate-800 bg-slate-800/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">My Reviews</h1>
        <p className="text-sm text-slate-400">
          Reviews you’ve left on purchased products
        </p>
      </div>

      {/* Empty State */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-20 text-center">
          <MessageSquare size={40} className="text-slate-500 mb-4" />
          <h2 className="text-lg font-medium">No reviews yet</h2>
          <p className="text-sm text-slate-400">
            Your reviews will appear here after you rate a product
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">
                  {review.product_title}
                </p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-600"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-3">
                {review.comment}
              </p>

              <p className="text-xs text-slate-500">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
