export interface Game {
  id: string;
  title: string;
  image: string;
  rating: number;
  popularity: number;
  price: number;
  igdbId?: number;
  slug?: string;
}

// Game data with preloaded images - no external API calls
const gameDatabase: Game[] = [
  {
    id: "elden-ring",
    title: "Elden Ring",
    slug: "elden-ring",
    igdbId: 159677,
    image:
      "https://images.unsplash.com/photo-1538481143235-f2fcccb439ab?w=400&h=600&fit=crop",
    rating: 8.5,
    popularity: 95,
    price: 2.49,
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    slug: "baldurs-gate-3",
    igdbId: 120437,
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=600&fit=crop",
    rating: 9.2,
    popularity: 92,
    price: 2.99,
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    slug: "cyberpunk-2077",
    igdbId: 1020,
    image:
      "https://images.unsplash.com/photo-1536718356157-6c59e68b3f7f?w=400&h=600&fit=crop",
    rating: 8.1,
    popularity: 88,
    price: 1.99,
  },
  {
    id: "the-witcher-3",
    title: "The Witcher 3",
    slug: "the-witcher-3",
    igdbId: 1020,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
    rating: 8.4,
    popularity: 85,
    price: 2.29,
  },
  {
    id: "hogwarts-legacy",
    title: "Hogwarts Legacy",
    slug: "hogwarts-legacy",
    igdbId: 136545,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=600&fit=crop",
    rating: 7.8,
    popularity: 82,
    price: 2.49,
  },
  {
    id: "starfield",
    title: "Starfield",
    slug: "starfield",
    igdbId: 133440,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
    rating: 7.5,
    popularity: 78,
    price: 3.49,
  },
  {
    id: "final-fantasy-vii-rebirth",
    title: "Final Fantasy VII Rebirth",
    slug: "final-fantasy-vii-rebirth",
    igdbId: 130899,
    image:
      "https://images.unsplash.com/photo-1566301969489-cebd086476d8?w=400&h=600&fit=crop",
    rating: 8.9,
    popularity: 80,
    price: 3.29,
  },
  {
    id: "dragon-age-the-veilguard",
    title: "Dragon Age: The Veilguard",
    slug: "dragon-age-the-veilguard",
    igdbId: 106850,
    image:
      "https://images.unsplash.com/photo-1533350335684-c1fd149e9e51?w=400&h=600&fit=crop",
    rating: 8.3,
    popularity: 75,
    price: 2.79,
  },
  {
    id: "stalker-2-heart-of-chornobyl",
    title: "S.T.A.L.K.E.R. 2",
    slug: "stalker-2-heart-of-chornobyl",
    igdbId: 31399,
    image:
      "https://images.unsplash.com/photo-1538481143235-f2fcccb439ab?w=400&h=600&fit=crop",
    rating: 8.7,
    popularity: 80,
    price: 1.89,
  },
  {
    id: "metal-gear-solid-delta-snake-eater",
    title: "Metal Gear Solid Delta",
    slug: "metal-gear-solid-delta-snake-eater",
    igdbId: 102667,
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=600&fit=crop",
    rating: 8.6,
    popularity: 77,
    price: 2.99,
  },
  {
    id: "tekken-8",
    title: "Tekken 8",
    slug: "tekken-8",
    igdbId: 120420,
    image:
      "https://images.unsplash.com/photo-1536718356157-6c59e68b3f7f?w=400&h=600&fit=crop",
    rating: 8.2,
    popularity: 72,
    price: 2.49,
  },
  {
    id: "dragons-dogma-2",
    title: "Dragon's Dogma 2",
    slug: "dragons-dogma-2",
    igdbId: 120422,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
    rating: 8.5,
    popularity: 78,
    price: 2.89,
  },
];

// Apply randomization to prices and ratings for variety
function randomizeGameData(games: Game[]): Game[] {
  return games.map((game) => ({
    ...game,
    price: 1.49 + Math.random() * 2.0, // Random price between 1.49 and 3.49
    rating: 7 + Math.random() * 3, // Random rating between 7 and 10
    popularity: Math.max(50, game.popularity + (Math.random() - 0.5) * 20), // Slight variation
  }));
}

// Main function to fetch games
export async function fetchGames(): Promise<Game[]> {
  // Simulate a small delay to feel like real data fetching
  await new Promise((resolve) => setTimeout(resolve, 300));
  return randomizeGameData([...gameDatabase]);
}

// Function to search games
export async function searchGames(
  query: string,
  allGames: Game[]
): Promise<Game[]> {
  const lowerQuery = query.toLowerCase();
  return allGames.filter(
    (game) =>
      game.title.toLowerCase().includes(lowerQuery) ||
      game.slug?.toLowerCase().includes(lowerQuery)
  );
}

// Function to filter games by popularity
export function filterByPopularity(
  games: Game[],
  minPopularity: number
): Game[] {
  return games.filter((game) => game.popularity >= minPopularity);
}

// Function to sort games
export function sortGames(
  games: Game[],
  sortBy: "price-low" | "price-high" | "rating" | "popularity"
): Game[] {
  const sorted = [...games];
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popularity":
      return sorted.sort((a, b) => b.popularity - a.popularity);
    default:
      return sorted;
  }
}
