import { OrderPurchasingCompleted } from "./purchasingOrders.type";

export type SellingOrders ={
  sellingActiveOrders: OrdersSellingActive;
  sellingCompletedOrders:  OrderPurchasingCompleted;
  sellingPendingOrders:  OrderPurchasingCompleted;
};

export type OrdersSellingActive = {
  results: number
  askStats: AskStats
  asks: Ask[]
}

 type AskStats = {
  active_asks: string
  no_of_listing: string
  gross_value: number
  net_value: number
}

 type Ask  = {
  highest_offer: any;
  lowest_ask: any;
  highest_bid:any;
  bid_id: number
  my_offer: number
  highest_ask: number
  expiration_date: string
  shipping_address: string
  card_details_number: string
  card_details_expiration_date: string
  card_details_cvv: string
  is_active: boolean
  offer_date: string
  product: Product
  user: User
}
 type Product = {
  id: number
  title: string
  is_active: boolean
  attachments: Attachment[]
  specs: Spec[]
}

 type Attachment = {
  id: number
  url: string
  filename: string
}

type Spec = {
  id: number
  title: string
  value: string
}

 type User = {
  id: number
  email: string
  is_active: boolean
}
