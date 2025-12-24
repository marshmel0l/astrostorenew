export type ProductType =
  | "key"
  | "offline_account"
  | "shared_account";

export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  regions: string[];
  available_types: ProductType[];
  created_at: string;
};

import type { Product } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    image: "/placeholder.svg",
    price: 12.99,
    rating: 4.5,
    regions: ["Global", "EU", "US"],
    available_types: ["key", "offline_account"],
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Elden Ring",
    image: "/placeholder.svg",
    price: 14.99,
    rating: 4.8,
    regions: ["Global"],
    available_types: ["shared_account", "offline_account"],
    created_at: new Date().toISOString(),
  },
];
