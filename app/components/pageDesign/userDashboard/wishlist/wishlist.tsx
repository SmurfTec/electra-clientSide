import { Product } from '@elektra/types';
import { ProductCard } from '../../../card';
import { baseURL } from '@elektra/customComponents';

type WishlistProps = {
  wishlist: Product[];
};

export function WishList({ wishlist }: WishlistProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-12 place-content-center mt-5">
      {wishlist.map((product, index) => {
        return (
          <div key={index} className="min-w-[15%]">
            <ProductCard
              image={baseURL + '/' + (product?.images[0]?.filename ?? '')}
              description={product.description || '9/10 condition with charger and box'}
              link={'/product-detail'}
              title={product.title}
              rating={product.rating || 'New'}
              wishlist={product.wishlist || false}
              lowestPrice={product.lowest_price || 500}
              highestPrice={product.highest_offer || 500}
              price={product.user_starting_price || 500}
            />
          </div>
        );
      })}
    </div>
  );
}
