export type Fee = {
  id: number;
  created_on: string;
  updated_on: string;
  type: string;
  fees: string;
  category: {
    id: number | null;
    name: string | null;
  };
};

export type FeeData = {
  results: number;
  fees: Fee[];
};
