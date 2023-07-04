import { ProductCard } from '@elektra/components/card';
import { Only, baseURL } from '@elektra/customComponents';
import { RootState, useSelector } from '@elektra/store';
import { Text } from '@mantine/core';

export function WishList() {
  const { favourites, results } = useSelector((state: RootState) => state.entities.userFavourite.list);
  return (
    <>
    <Only when={results===0}>
      <Text className='text-base'>No wishList item to show.</Text>
    </Only>
    <Only when={results!==0}>
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
    </Only>
    </>
  );
}
