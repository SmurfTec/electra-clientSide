// export type Fee = {
//   id: number;
//   created_on: string;
//   updated_on: string;
//   type: string;
//   fees: string;
//   category: {
//     id: number | null;
//     name: string | null;
//   };
// };

interface Fee {
  id: number;
  created_on: string;
  updated_on: string;
  type: string;
  fees: string;
  category: {
    id: number | null;
    name: string | null;
  };
  value_type: 'percentage' | 'value';
}

export type FeeData = {
  results: number;
  fees: Fee[];
};
