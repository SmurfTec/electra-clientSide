import { baseURL } from '@elektra/customComponents';
import { Product } from '@elektra/types';
import { ProductCard } from '../../../card';
import { RootState, useSelector } from '@elektra/store';

export function WishList() {
  const { favourites, results } = useSelector((state: RootState) => state.entities.userFavourite.list);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-12 place-content-center mt-5">
      {favourites.map((product, index) => {
        return (
          <div key={index} className="min-w-[15%]">
            <ProductCard
              image={baseURL + '/' + (product?.images[0]?.filename ?? '')}
              description={'9/10 condition with charger and box'}
              link={'/product-detail'}
              title={product.title}
              rating={'New'}
              wishlist={false}
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
