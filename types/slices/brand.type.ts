type Brand = {
  id: number;
  created_on: string;
  updated_on: string;
  title: string;
  image: {
    id: number;
    url: string;
    filename: string;
    mime_type: string;
    size: number;
  };
  products_count: string;
};

export type BrandsResponse = {
  results: number;
  count: number;
  brands: Brand[];
};
