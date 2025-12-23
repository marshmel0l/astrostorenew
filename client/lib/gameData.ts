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
export const gameDatabase: Game[] = [
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
  {
    id: "game-1",
    title: "Phantom Shadows",
    slug: "phantom-shadows",
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=600&fit=crop",
    rating: 8.2,
    popularity: 72,
    price: 2.49,
  },
  {
    id: "game-2",
    title: "Neon Nights",
    slug: "neon-nights",
    image:
      "https://images.unsplash.com/photo-1535869668f74b6f27a876e2e13c3f72c4e2cf0cc?w=400&h=600&fit=crop",
    rating: 7.9,
    popularity: 65,
    price: 1.99,
  },
  {
    id: "game-3",
    title: "Void Walker",
    slug: "void-walker",
    image:
      "https://images.unsplash.com/photo-1559881243-8f1ce3b1da5f?w=400&h=600&fit=crop",
    rating: 8.6,
    popularity: 78,
    price: 2.79,
  },
  {
    id: "game-4",
    title: "Crimson Tide",
    slug: "crimson-tide",
    image:
      "https://images.unsplash.com/photo-1586182191929-81e3657d2a5d?w=400&h=600&fit=crop",
    rating: 7.5,
    popularity: 58,
    price: 2.29,
  },
  {
    id: "game-5",
    title: "Solar Flare",
    slug: "solar-flare",
    image:
      "https://images.unsplash.com/photo-1608889335941-33ac5f4db8a2?w=400&h=600&fit=crop",
    rating: 8.1,
    popularity: 71,
    price: 2.49,
  },
  {
    id: "game-6",
    title: "Midnight Echo",
    slug: "midnight-echo",
    image:
      "https://images.unsplash.com/photo-1591308009145-3e28b25ab84f?w=400&h=600&fit=crop",
    rating: 8.3,
    popularity: 74,
    price: 2.99,
  },
  {
    id: "game-7",
    title: "Frost Kingdom",
    slug: "frost-kingdom",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=600&fit=crop",
    rating: 8.0,
    popularity: 68,
    price: 2.39,
  },
  {
    id: "game-8",
    title: "Thunder Blade",
    slug: "thunder-blade",
    image:
      "https://images.unsplash.com/photo-1552985118-5ae71aa9186d?w=400&h=600&fit=crop",
    rating: 8.4,
    popularity: 76,
    price: 2.69,
  },
  {
    id: "game-9",
    title: "Shadow's Revenge",
    slug: "shadows-revenge",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
    rating: 8.2,
    popularity: 73,
    price: 2.59,
  },
  {
    id: "game-10",
    title: "Crystal Maze",
    slug: "crystal-maze",
    image:
      "https://images.unsplash.com/photo-1549887534-7eb53e928727?w=400&h=600&fit=crop",
    rating: 7.8,
    popularity: 62,
    price: 2.19,
  },
  {
    id: "game-11",
    title: "Inferno Quest",
    slug: "inferno-quest",
    image:
      "https://images.unsplash.com/photo-1552972406-5fabdc338d20?w=400&h=600&fit=crop",
    rating: 8.5,
    popularity: 79,
    price: 2.89,
  },
  {
    id: "game-12",
    title: "Gravity Well",
    slug: "gravity-well",
    image:
      "https://images.unsplash.com/photo-1511671782486-a01980e01a18?w=400&h=600&fit=crop",
    rating: 8.1,
    popularity: 70,
    price: 2.49,
  },
  {
    id: "game-13",
    title: "Eclipse Protocol",
    slug: "eclipse-protocol",
    image:
      "https://images.unsplash.com/photo-1596927056931-148839fbbadb?w=400&h=600&fit=crop",
    rating: 8.3,
    popularity: 75,
    price: 2.79,
  },
  {
    id: "game-14",
    title: "Neon Vortex",
    slug: "neon-vortex",
    image:
      "https://images.unsplash.com/photo-1518611505868-48f1352f4ecf?w=400&h=600&fit=crop",
    rating: 7.9,
    popularity: 64,
    price: 2.09,
  },
  {
    id: "game-15",
    title: "Apex Legends Pro",
    slug: "apex-legends-pro",
    image:
      "https://images.unsplash.com/photo-1550373143-4c83c5d00f39?w=400&h=600&fit=crop",
    rating: 8.6,
    popularity: 82,
    price: 3.29,
  },
  {
    id: "game-16",
    title: "Resonance",
    slug: "resonance",
    image:
      "https://images.unsplash.com/photo-1489599849228-ed4dc59b2e9f?w=400&h=600&fit=crop",
    rating: 8.0,
    popularity: 69,
    price: 2.59,
  },
  {
    id: "game-17",
    title: "Quantum Leap",
    slug: "quantum-leap",
    image:
      "https://images.unsplash.com/photo-1511282753313-52581002a659?w=400&h=600&fit=crop",
    rating: 8.2,
    popularity: 72,
    price: 2.39,
  },
  {
    id: "game-18",
    title: "Hexagon Masters",
    slug: "hexagon-masters",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    rating: 7.7,
    popularity: 61,
    price: 1.99,
  },
  {
    id: "game-19",
    title: "Pulse Dimension",
    slug: "pulse-dimension",
    image:
      "https://images.unsplash.com/photo-1556177017-f89e2330b63f?w=400&h=600&fit=crop",
    rating: 8.4,
    popularity: 77,
    price: 2.99,
  },
  {
    id: "game-20",
    title: "Cyber Ninja",
    slug: "cyber-ninja",
    image:
      "https://images.unsplash.com/photo-1578307437869-1a383b9dde62?w=400&h=600&fit=crop",
    rating: 8.1,
    popularity: 71,
    price: 2.49,
  },
  {
    id: "game-21",
    title: "Arctic Dawn",
    slug: "arctic-dawn",
    image:
      "https://images.unsplash.com/photo-1559163615-cd4628902d4a?w=400&h=600&fit=crop",
    rating: 7.8,
    popularity: 63,
    price: 2.29,
  },
  {
    id: "game-22",
    title: "Obsidian Core",
    slug: "obsidian-core",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65b?w=400&h=600&fit=crop",
    rating: 8.5,
    popularity: 80,
    price: 2.89,
  },
  {
    id: "game-23",
    title: "Stellar Wars",
    slug: "stellar-wars",
    image:
      "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=400&h=600&fit=crop",
    rating: 8.3,
    popularity: 76,
    price: 3.09,
  },
  {
    id: "game-24",
    title: "Vortex Runner",
    slug: "vortex-runner",
    image:
      "https://images.unsplash.com/photo-1538481143235-f2fcccb439ab?w=400&h=600&fit=crop",
    rating: 8.0,
    popularity: 68,
    price: 2.19,
  },
  {
    id: "game-25",
    title: "Carbon Edge",
    slug: "carbon-edge",
    image:
      "https://images.unsplash.com/photo-1570303008900-a1968b7aef4f?w=400&h=600&fit=crop",
    rating: 8.2,
    popularity: 74,
    price: 2.69,
  },
  {
    id: "game-26",
    title: "Infinity Bound",
    slug: "infinity-bound",
    image:
      "https://images.unsplash.com/photo-1579373903014-b726fb6cb885?w=400&h=600&fit=crop",
    rating: 7.9,
    popularity: 65,
    price: 2.49,
  },
  {
    id: "game-27",
    title: "Pixel Prophecy",
    slug: "pixel-prophecy",
    image:
      "https://images.unsplash.com/photo-1471879832106-c7ab9019e8de?w=400&h=600&fit=crop",
    rating: 8.1,
    popularity: 70,
    price: 1.89,
  },
  {
    id: "game-28",
    title: "Cipher Wars",
    slug: "cipher-wars",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=600&fit=crop",
    rating: 8.4,
    popularity: 78,
    price: 2.79,
  },
  {
    id: "game-29",
    title: "Luminous Path",
    slug: "luminous-path",
    image:
      "https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400&h=600&fit=crop",
    rating: 8.3,
    popularity: 75,
    price: 2.59,
  },
  {
    id: "game-30",
    title: "Apex Runner",
    slug: "apex-runner",
    image:
      "https://images.unsplash.com/photo-1538481143235-f2fcccb439ab?w=400&h=600&fit=crop",
    rating: 8.2,
    popularity: 73,
    price: 2.39,
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
export function searchGames(query: string, allGames: Game[]): Game[] {
  const lowerQuery = query.toLowerCase();
  return allGames.filter(
    (game) =>
      game.title.toLowerCase().includes(lowerQuery) ||
      game.slug?.toLowerCase().includes(lowerQuery),
  );
}

// Function to filter games by popularity
export function filterByPopularity(
  games: Game[],
  minPopularity: number,
): Game[] {
  return games.filter((game) => game.popularity >= minPopularity);
}

// Function to sort games
export function sortGames(
  games: Game[],
  sortBy: "price-low" | "price-high" | "rating" | "popularity",
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
