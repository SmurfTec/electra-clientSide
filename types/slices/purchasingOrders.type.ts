export type PurchasingOrders = {
  purchasingActiveOrders: OrderPurchasingActive;
  purchasingCompletedOrders: OrderPurchasingCompleted;
  purchasingPendingOrders: OrderPurchasingCompleted;
};

export type OrderPurchasingCompleted = {
  results: number;
  orderStats: OrderStat[];
  orders: Order[];
};

type OrderStat = Partial<{
  total_value: number;
  pending_orders: string;
  total_spent: number;
  no_of_purchases: string;
  points_earned_buyer: string;
  pending_sales: string;
  gross_value_pending: number;
  net_value_pending: number;
  total_sales: string;
  gross_value_completed: number;
  net_value_completed: number;
  points_earned: string;
  completed_sales: string;
  rejectd_sales: string;
}>;

export type Order = Partial<{
  id: number;
  created_on: string;
  updated_on: string;
  status: string;
  saleprice: number;
  trackingid: string;
  product: Product;
  buyer: Buyer;
  seller: Seller;
  points_earned: number;
  bid_price: number;
  ask_price: number;
  protection_plan: ProductProtectionPlan;
  listing?: number;
  highest_offer: number;
  lowest_offer: number;
  ship_in: string;
  receipt: null | any;
  receipt_fees: any[];
  product_variants: ProductVariant[];
}>;
type ProductVariant = {
  id: number;
  variant: string;
  value: string;
};

type Buyer = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};
type Attachment = {
  id: number;
  url: string;
  filename: string;
};

type Specification = {
  id: number;
  title: string;
  value: string;
};

type Product = {
  id: number;
  title: string;
  attachments: Attachment[];
  specs: Specification[];
};
type Seller = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};

type ProductProtectionPlan = {
  id?: number;
  name?: string;
};

export type OrderPurchasingActive = {
  results: number;
  bidStats: BidStats;
  bids: Bid[];
};

type BidStats = {
  active_bids: string;
  total_bids: string;
  total_value: number;
};

type Bid = {
  id: number;
  my_offer: number;
  highest_offer?: number;
  lowest_price?: number;
  lowest_ask?: number;
  expiration_date: string;
  shipping_address: string;
  card_details_number: string;
  card_details_expiration_date: string;
  card_details_cvv: string;
  is_active: boolean;
  listing: Listing;
  offer_date: string;
  product: PurchasingActiveProduct2;
  user: User;
};

type Listing = {
  id?: number;
  ask?: number;
  is_active?: boolean;
  product?: PurchasingActiveProduct;
};

type PurchasingActiveProduct = {
  id: number;
  title: string;
  is_active: boolean;
};

type PurchasingActiveProduct2 = {
  id?: number;
  title?: string;
  is_active?: boolean;
  attachments?: Attachment[];
  specs?: Spec[];
};

type Spec = {
  id: number;
  title: string;
  value: string;
};

type User = {
  id: number;
  email: string;
  is_active: boolean;
};
