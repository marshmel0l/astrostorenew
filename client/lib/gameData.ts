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

// Mock game data - In production, this would fetch from IGDB API
const mockGames = [
  { title: "Elden Ring", igdbId: 159677, slug: "elden-ring" },
  { title: "Baldur's Gate 3", igdbId: 120437, slug: "baldurs-gate-3" },
  { title: "Cyberpunk 2077", igdbId: 1020, slug: "cyberpunk-2077" },
  { title: "The Witcher 3", igdbId: 1020, slug: "the-witcher-3" },
  { title: "Hogwarts Legacy", igdbId: 136545, slug: "hogwarts-legacy" },
  { title: "Starfield", igdbId: 133440, slug: "starfield" },
  { title: "Final Fantasy VII Rebirth", igdbId: 130899, slug: "final-fantasy-vii-rebirth" },
  { title: "Dragon Age: The Veilguard", igdbId: 106850, slug: "dragon-age-the-veilguard" },
  { title: "S.T.A.L.K.E.R. 2", igdbId: 31399, slug: "stalker-2-heart-of-chornobyl" },
  { title: "Metal Gear Solid Delta", igdbId: 102667, slug: "metal-gear-solid-delta-snake-eater" },
  { title: "Tekken 8", igdbId: 120420, slug: "tekken-8" },
  { title: "Dragon's Dogma 2", igdbId: 120422, slug: "dragons-dogma-2" },
];

// Function to get popularity score (for demo, based on title)
function getPopularityScore(title: string): number {
  const popularGames = [
    "Elden Ring",
    "Baldur's Gate 3",
    "Cyberpunk 2077",
    "Starfield",
  ];
  if (popularGames.includes(title)) {
    return 75 + Math.random() * 25;
  }
  return 30 + Math.random() * 50;
}

// Function to get rating score
function getRatingScore(): number {
  return 7 + Math.random() * 3;
}

// Function to get random price between 1.49 and 3.49
function getRandomPrice(): number {
  return 1.49 + Math.random() * 2;
}

// Map of game slugs to placeholder image URLs
const gameImageMap: Record<string, string> = {
  "elden-ring": "https://images.unsplash.com/photo-1538481143235-f2fcccb439ab?w=400&h=600&fit=crop",
  "baldurs-gate-3": "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=600&fit=crop",
  "cyberpunk-2077": "https://images.unsplash.com/photo-1536718356157-6c59e68b3f7f?w=400&h=600&fit=crop",
  "the-witcher-3": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
  "hogwarts-legacy": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=600&fit=crop",
  "starfield": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
  "final-fantasy-vii-rebirth": "https://images.unsplash.com/photo-1566301969489-cebd086476d8?w=400&h=600&fit=crop",
  "dragon-age-the-veilguard": "https://images.unsplash.com/photo-1533350335684-c1fd149e9e51?w=400&h=600&fit=crop",
  "stalker-2-heart-of-chornobyl": "https://images.unsplash.com/photo-1538481143235-f2fcccb439ab?w=400&h=600&fit=crop",
  "metal-gear-solid-delta-snake-eater": "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=600&fit=crop",
  "tekken-8": "https://images.unsplash.com/photo-1536718356157-6c59e68b3f7f?w=400&h=600&fit=crop",
  "dragons-dogma-2": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
};

// Function to get game image with fallback
function getGameImage(gameSlug: string): string {
  // Try to use the predefined image map first
  if (gameImageMap[gameSlug]) {
    return gameImageMap[gameSlug];
  }

  // Fallback to a generic gradient placeholder
  const colors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  ];

  const hash = gameSlug.split("").reduce((h, c) => h + c.charCodeAt(0), 0);
  const colorIndex = hash % colors.length;

  // Use placeholder.co with a gradient-like background using data URI
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%23667eea' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='white' text-anchor='middle' dominant-baseline='middle' text-transform='uppercase'%3E${encodeURIComponent(gameSlug.substring(0, 20))}%3C/text%3E%3C/svg%3E`;
}

// Main function to fetch games
export async function fetchGames(): Promise<Game[]> {
  const games: Game[] = [];

  for (const mockGame of mockGames) {
    try {
      // In production, fetch actual IGDB data here
      const image = await getGameImage(mockGame.slug || mockGame.title);

      games.push({
        id: mockGame.slug || mockGame.title,
        title: mockGame.title,
        image: image,
        rating: getRatingScore(),
        popularity: getPopularityScore(mockGame.title),
        price: getRandomPrice(),
        igdbId: mockGame.igdbId,
        slug: mockGame.slug,
      });
    } catch (error) {
      console.error(`Error fetching data for ${mockGame.title}:`, error);
      // Still add the game with a placeholder image
      games.push({
        id: mockGame.slug || mockGame.title,
        title: mockGame.title,
        image: `https://via.placeholder.com/300x450?text=${encodeURIComponent(mockGame.title)}`,
        rating: getRatingScore(),
        popularity: getPopularityScore(mockGame.title),
        price: getRandomPrice(),
        igdbId: mockGame.igdbId,
        slug: mockGame.slug,
      });
    }
  }

  return games;
}

// Function to search games
export async function searchGames(query: string, allGames: Game[]): Promise<Game[]> {
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
