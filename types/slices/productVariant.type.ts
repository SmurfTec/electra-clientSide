export type Variant = {
  id: number;
  title: string;
  created_on: string;
  updated_on: string;
  datatype: string;
  background_color: string;
  color: string;
  values: string[]; // Assuming the values are always an array of strings
};

// Define the main data type
export type ProductVariant = {
  results: number;
  stats: { all_variants: string }[]; // Assuming stats will always have an array with a single object
  variants: Variant[];
};
