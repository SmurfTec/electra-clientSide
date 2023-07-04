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
};

type Category = {
  id: number;
  name: string;
};

type Brand = {
  id: number;
  title: string;
};

export type Product = {
  id: number;
  title: string;
  is_active: boolean;
  created_on: string;
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
