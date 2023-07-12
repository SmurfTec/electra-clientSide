export type Profile = {
  id: number;
  firstname: string;
  lastname: string;
  mobile_no?: string | null
  username?: string | null;
  totalsales: number;
  coins: number;
  proceeds: number;
  marketplace_fees: number;
  available_funds: number;
  shipping_address_line_1?: string | null
  shipping_adress_line_2?: string | null
  shipping_country?: string | null
  shipping_stateorprovince?: string | null
  shipping_city?:string | null
  shipping_postalcode?: null | number;
  billing_firstname?: string | null
  billing_lastname?: string | null
  billing_address_line_1?: string | null
  billing_adress_line_2?: string | null
  billing_country?: string | null
  billing_state_or_province?: string | null
  billing_city?: string | null
  billing_postalcode?: null|number;
  is_two_step_verification_enabled?: null|boolean;
  receive_notifications?: null|boolean;
  image_url: string;
};