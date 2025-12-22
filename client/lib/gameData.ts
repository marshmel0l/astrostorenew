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

// Function to get game image from SteamGridDB
async function getGameImageFromSteamGridDB(
  gameSlug: string
): Promise<string> {
  try {
    // SteamGridDB has a public API for getting game art
    // Using a public endpoint for game covers
    const response = await fetch(
      `https://www.steamgriddb.com/api/v2/search/autocomplete/${encodeURIComponent(gameSlug)}`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const gameId = data.data[0].id;
        // Return a cover art URL (vertical cover, no platform banner)
        return `https://www.steamgriddb.com/api/v2/grids/game/${gameId}/vertical`;
      }
    }
  } catch (error) {
    console.error("Error fetching from SteamGridDB:", error);
  }

  // Fallback to placeholder image service
  return `https://api.placeholder.com/300x450?text=${encodeURIComponent(gameSlug)}`;
}

// Function to get game image with fallback
async function getGameImage(gameSlug: string): Promise<string> {
  // Try SteamGridDB first
  const image = await getGameImageFromSteamGridDB(gameSlug);
  
  // If still no image, use a generated placeholder with game theme
  if (!image || image.includes("placeholder")) {
    // Using a free game cover API as fallback
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameSlug}.jpg`;
  }

  return image;
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
