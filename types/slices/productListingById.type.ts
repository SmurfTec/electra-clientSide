import { Variant } from './productDetail.type';

type Image = {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
};

type TechnicalSpecification = {
  title: string;
  value: string;
};

type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};

type SalesHistory = {
  id: number;
  item_name: string;
  condition: 'new' | 'used';
  listing_variants: Variant[] | null;
  date: Date;
  ask_price: number;
  lowest_offer: number | null;
};

type ListingStats = {
  total_listings: number;
  total_listings_last_month: number;
  total_sold: number;
  total_amount_sold: number | null;
  total_listings_percentage: number;
  total_listings_last_month_percentage: number;
  total_sold_percentage: number | null;
  total_amount_sold_percentage: number | null;
};

type Listing = {
  id: number;
  created_on: string;
  updated_on: string;
  condition: 'new' | 'used';
  ask: number;
  is_active: boolean;
  is_repaired_before: boolean;
  explain_repair: string | null;
  condition_details: string;
  more_info: string;
  product: {
    id: number;
    title: string;
  };
  user: User;
  order: any | null;
  saleprice: number | null;
  is_flagged: boolean;
  category: string;
  brand: string;
  highest_offer: number | null;
  lowest_offer: number | null;
  user_starting_at: number;
  bids: any | null;
  images: Image[];
  listing_variants: Variant[];
  technical_specifications: TechnicalSpecification[];
};

export type SingleProductListing = {
  sales_history: SalesHistory[];
  listing_stats: ListingStats;
  listing: Listing;
};