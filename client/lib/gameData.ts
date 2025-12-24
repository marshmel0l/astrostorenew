import { supabase } from "@/lib/supabase";

/* =========================
   TYPES
========================= */

export type ProductType =
  | "key"
  | "offline_account"
  | "shared_account";

export type Game = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  popularity: number;
  regions: string[];
  available_types: ProductType[];
  created_at: string;
};

/* =========================
   TEMP MOCK DATA (TEST)
   → REMOVE LATER
========================= */

const MOCK_GAMES: Game[] = [
  {
    id: "test-1",
    title: "Cyberpunk 2077",
    image: "/placeholder.svg",
    price: 12.99,
    rating: 4.6,
    popularity: 90,
    regions: ["Global", "EU", "US"],
    available_types: ["key", "offline_account"],
    created_at: new Date().toISOString(),
  },
  {
    id: "test-2",
    title: "Elden Ring",
    image: "/placeholder.svg",
    price: 14.99,
    rating: 4.8,
    popularity: 95,
    regions: ["Global"],
    available_types: ["shared_account", "offline_account"],
    created_at: new Date().toISOString(),
  },
];

/* =========================
   FETCH PRODUCTS
   (Supabase → fallback mock)
========================= */

export async function fetchGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return MOCK_GAMES;
  }

  return data as Game[];
}

/* =========================
   SEARCH
========================= */

export function searchGames(
  query: string,
  games: Game[],
): Game[] {
  const q = query.toLowerCase();

  return games.filter((game) =>
    game.title.toLowerCase().includes(q),
  );
}

/* =========================
   SORT
========================= */

export function sortGames(
  games: Game[],
  sortBy:
    | "price-low"
    | "price-high"
    | "rating"
    | "popularity",
): Game[] {
  return [...games].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
      default:
        return b.popularity - a.popularity;
    }
  });
}
