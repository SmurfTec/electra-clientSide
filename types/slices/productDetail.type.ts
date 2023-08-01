type Stats = {
  stats: {
    price_premium: number;
    avg_sale_price: number;
    no_of_sales: string;
    min_max_saleprice: {
      min_saleprice: number;
      max_saleprice: number;
    }[];
    trade_range: [
      {
        min_saleprice: number | null;
        max_saleprice: number | null;
      }
    ];
    min_max_saleprice_percentage: number;
    price_premium_percentage: number;
    average_saleprice_percentage: number;
    no_of_sales_percentage: number;
  };
  trade_range_percentage: number;
  trade_range: {
    sales: number;
    price: number;
    month: string;
  }[];
};

type ProductProperty = {
  id: number;
  description: string;
  listings: number;
  sold: number;
};

type Category = {
  id: number;
  name: string;
  fees: number;
};

export type condition = 'new' | 'used';

type Brand = {
  id: number;
  title: string;
  image: string;
};

export type TechnicalSpecification = {
  title: string;
  value: string;
};

export type ImageProps = {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
};

export type Variant = {
  id: number;
  variant: string;
  value: string;
  values: string[];
  background_color: string;
  color: string;
};

type Bid = {
  id: number;
  price: number;
  expiration_date: string;
  user: {
    id: number;
    email: string;
  };
};

type ProductStats = {
  likes: number | null;
  views: number | null;
  bids: number | null;
  asks: number | null;
  sales: number | null;
  listings: number | null;
};

type Ask = {
  id: number;
  price: number;
  expiration_date: string;
  user: {
    id: number;
    email: string;
  };
};

type Product = {
  id: number;
  title: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
  user_starting_at: number | null;
  clicks: number;
  condition: 'new' | 'used';
  product_stats: ProductStats;
  interactions: number;
  highest_offer: number | null;
  lowest_ask: number | null;
  product_properties: ProductProperty;
  category: Category;
  brand: Brand;
  technical_specifications: TechnicalSpecification[];
  images: ImageProps[];
  product_variants: Variant[];
  bids: Bid[];
  asks: Ask[];
};

export type ProductData = {
  stats: Stats;
  product: Product;
};

interface ListingUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface ListingProductData {
  id: number;
  title: string;
}

export interface ListingData {
  id: number;
  created_on: string;
  updated_on: string;
  condition: 'new' | 'used';
  ask: number;
  is_active: boolean;
  is_repaired_before: boolean;
  explain_repair: string;
  condition_details: string;
  more_info: string;
  product: number;
  user: ListingUser;
  order: null;
  saleprice: number;
  is_flagged: boolean;
  product_data: ListingProductData;
  highest_offer: null;
  lowest_offer: null;
  listing_variants: null;
  images: ImageProps[];
}

export interface ListingsResponse {
  results: number;
  stats: Stats[];
  listings: ListingData[];
}
