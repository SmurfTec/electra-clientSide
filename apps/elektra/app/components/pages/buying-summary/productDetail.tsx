type ProductDetailProps = {
  image: string;
  title: string;
  space: string;
  color: string;
  company: string;
  condition: string;
  expiration: string;
  cardDetails: string;
  address: string;
};

export function ProductDetail(data: ProductDetailProps) {
  return <div>
    {data.title}
  </div>;
}
