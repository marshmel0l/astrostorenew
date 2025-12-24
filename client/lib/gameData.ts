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
