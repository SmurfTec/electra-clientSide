import { ProductCard } from '@elektra/components/card';
import { Only, baseURL } from '@elektra/customComponents';
import { RootState, useSelector } from '@elektra/store';
import { Text } from '@mantine/core';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';

export function WishList() {
  const { favourites, results } = useSelector((state: RootState) => state.entities.userFavourite.list);
 
  const[list,setlist]=useState<any>(favourites)
  const[render,setrender]=useState(false)

 
  useEffect(()=>{
    console.log(list,"list")
  },[list])
 

  return (
    <>
      <Only when={results === 0}>
        <Text className="text-base">No wishList item to show.</Text>
      </Only>
      <Only when={results !== 0}>
        <div className="grid grid-cols-2 gap-12 mt-5 lg:grid-cols-5 md:grid-cols-4 place-content-center">
          {list.map((product:any, index:any) => {
            return (
              <div key={index} className="min-w-[15%]">
                <ProductCard
                  image={baseURL + '/' + (product?.images?.[0]?.filename ?? '')}
                  description={'9/10 condition with charger and box'}
                  // link={'/product-detail'}
                  id={product?.product.id}
                  title={product?.product.title}
                  usedPrice={Number(product.user_starting_price)}
                  condition={product?.product?.condition}
                  wishlist={product?.whislist || true}
                  lowestPrice={product?.lowest_price}
                  highestPrice={product?.highest_offer}
                  price={Number(product.user_starting_price)}
                  onClick={()=>
                 { 
                  
                  window.location.reload()
                  
                }
                  
                  }
                />
              </div>
            );
          })}
        </div>
      </Only>
    </>
  );
}
