type OrderStatus = "waiting-for-seller" | "shipped" | "delivered" | "canceled"; // Add more status options as needed

interface Order {
  saleprice: number;
  trackingid: string;
  product: number;
  buyer: string;
  seller: number;
  ask_price: number;
  points_earned: number;
  protection_plan: number;
  id: number;
  status: OrderStatus;
  ship_in: string;
  created_on: string;
  updated_on: string;
}

interface ReceiptFee {
  id: number;
  fees: number;
  title: string;
}

interface Receipt {
  id: number;
  created_on: string;
  updated_on: string;
  product: string;
  image: string;
  specs: string; // Change this to appropriate type if needed, based on the actual data
  buyer: string;
  phone: string;
  email: string;
  address: string;
  item_price: number;
  purchase_price: number;
  order: number;
  receipt_fees: ReceiptFee[];
}

// Main data structure
export interface ProductBuyOrderData {
  order: Order;
  receipt: Receipt;
}
