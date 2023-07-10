type Stats= {
  stats: {
    price_premium: number;
    avg_sale_price: number;
    no_of_sales: string;
    min_max_saleprice: {
      min_saleprice: number;
      max_saleprice: number;
    }[];
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
}

type ProductProperty= {
  id: number;
  description: string;
  listings: number;
  sold: number;
}

type Category= {
  id: number;
  name: string;
  fees: number;
}

type Brand ={
  id: number;
  title: string;
  image: string;
}

type TechnicalSpecification ={
  title: string;
  value: string;
}

 export type ImageProps ={
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
}

export type ProductVariant ={
  id: number;
  variant: string;
  value: string;
  values: string[];
  background_color: string;
  color: string;
}

type Bid = {
  id: number;
  price: number;
  expiration_date: string;
  user: {
    id: number;
    email: string;
  };
}

type  Ask = {
  id: number;
  price: number;
  expiration_date: string;
  user: {
    id: number;
    email: string;
  };
}

type Product = {
  id: number;
  title: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
  clicks: number;
  interactions: number;
  product_properties: ProductProperty;
  category: Category;
  brand: Brand;
  technical_specifications: TechnicalSpecification[];
  images: ImageProps[];
  product_variants: ProductVariant[];
  bids: Bid[];
  asks: Ask[];
}

export type ProductData = {
  stats: Stats;
  product: Product;
};
