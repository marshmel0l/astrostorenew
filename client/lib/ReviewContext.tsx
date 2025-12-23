import React, { createContext, useContext, useState, useEffect } from "react";

export interface Review {
  id: string;
  gameId: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  timestamp: number;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (
    gameId: string,
    name: string,
    rating: number,
    text: string,
  ) => void;
  getGameReviews: (gameId: string) => Review[];
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

const STORAGE_KEY = "astro_store_reviews";

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever reviews change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error("Failed to save reviews:", error);
    }
  }, [reviews]);

  const addReview = (
    gameId: string,
    name: string,
    rating: number,
    text: string,
  ) => {
    const newReview: Review = {
      id: `${Date.now()}-${Math.random()}`,
      gameId,
      name,
      rating,
      text,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      timestamp: Date.now(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getGameReviews = (gameId: string) => {
    return reviews
      .filter((review) => review.gameId === gameId)
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getGameReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within ReviewProvider");
  }
  return context;
}
