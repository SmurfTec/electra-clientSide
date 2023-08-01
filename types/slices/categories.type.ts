export type GenericeCategory =  {
    id: number;
    created_on: string;
    updated_on: string;
    name: string;
    fees: string;
    products: number;
    image: {
      id: number;
      url: string;
      filename: string;
      mime_type: string;
      size: number;
    } | null;
    variants: {
      id: number;
      title: string;
    }[] | null;
  }
  
  export type CategoryResponse = {
    results: number;
    stats: {
      all_categories: string;
    }[];
    categories: GenericeCategory[];
  }
  