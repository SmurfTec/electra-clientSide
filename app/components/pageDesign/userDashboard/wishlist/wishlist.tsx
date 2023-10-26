import { ProductCard } from '@elektra/components/card';
import { Only, baseURL } from '@elektra/customComponents';
import { RootState, removeFavourite, store, useSelector } from '@elektra/store';
import { Text } from '@mantine/core';

export function WishList() {
  const { favourites, results } = useSelector((state: RootState) => state.entities.userFavourite.list);

  return (
    <>
      <Only when={results === 0}>
        <Text className="text-base">No wishList item to show.</Text>
      </Only>
      <Only when={results !== 0}>
        <div className="grid grid-cols-2 gap-12 mt-5 lg:grid-cols-5 md:grid-cols-4 place-content-center">
          {favourites.map((product, index) => {
            return (
              <div key={index} className="min-w-[15%]">
                <ProductCard
                  image={baseURL + '/' + (product?.images?.[0]?.filename ?? '')}
                  description={'9/10 condition with charger and box'}
                  id={product?.product.id}
                  title={product?.product.title}
                  usedPrice={Number(product.user_starting_price)}
                  condition={product?.product?.condition}
                  wishlist={true}
                  lowestPrice={Number(product?.lowest_price)}
                  highestPrice={Number(product?.highest_offer)}
                  price={Number(product?.user_starting_price)}
                  onClick={() => {
                    store.dispatch(removeFavourite({ id: product?.product.id }));
                  }}
                  isWishlist={true}
                />
              </div>
            );
          })}
        </div>
      </Only>
    </>
  );
}
