export type WebsiteSectionImage = {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
};

export type Section = {
  section: string;
  images: WebsiteSectionImage[];
};

export type WebsiteSection = {
  id?: number;
  created_on?: string;
  updated_on?: string;
  name?: string;
  sections?: Section[];
};

type Image = {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
};

type ProductProperties = {
  id: number;
  listings: number;
  sold: number;
  model_no: string;
};

type Category = {
  id: number;
  name: string;
};

type Brand = {
  id: number;
  title: string;
};

export type ProductDisplayData = {
  asks: any;
  id: number;
  title: string;
  is_liked: boolean | undefined;
  is_active: boolean;
  created_on: string;
  condition: 'new' | 'used';
  updated_on: string;
  clicks: number;
  interactions: number;
  product_properties: ProductProperties;
  images: Image[];
  category: Category;
  brand: Brand;
  highest_offer: number | null;
  lowest_price: number | null;
  user_starting_price: number | null;
};

export type UserFavourite = {
  results: number;
  favourites: ProductUserFavourite[];
};

type ProductUserFavourite = {
  id: number;
  created_on: string;
  updated_on: string;
  product: { id: number; title: string; condition: 'new' | 'used' };
  user: 4;
  images: Image[];
  highest_offer: number | null;
  lowest_price: number | null;
  user_starting_price: string | null;
};

type Stats = {
  total_products: number;
  total_products_sold: number;
  products_percentage: number | null;
  total_unique_products_sold: number;
  total_products_sold_last_month: number;
  total_unique_products_sold_last_month: number;
  total_products_sold_last_Six_months: number;
  total_unique_products_sold_last_Six_months: number;
};

export type Product = {
  results?: number;
  stats?: Stats;
  products: ProductDisplayData[];
};
