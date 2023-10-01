export type Payouts = {
  id: number;
  created_on: string;
  updated_on: string;
  amount: number;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
};
