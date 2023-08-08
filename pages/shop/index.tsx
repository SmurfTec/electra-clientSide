import { FooterProductCarousel, ProductCard, ProductCardProps, SectionTitle } from '@elektra/components';
import { baseURL } from '@elektra/customComponents';
import { fetchShopProducts, store } from '@elektra/store';
import { BackgroundImage, Button, Group, Image, Pagination, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { NextPageContext } from 'next';
import { useState } from 'react';
import { Product } from '../../types/slices';



export async function getServerSideProps(context: NextPageContext) {
  // id: 1 means homepage data
  const categoryId = context.query.category;
  const brandId = context.query.brand;
  const params = categoryId ? `&page=1&category=${categoryId}` : brandId ? `&page=1&brand=${brandId}` : undefined;
  const shopProducts = store.dispatch(fetchShopProducts(params));

  await Promise.all([shopProducts]);

  return {
    props: {
      shopProducts: store.getState().entities.specialProducts.list.shopProducts,
    },
  };
}

type ShopPageProps = {
  shopProducts: Product[];
};

export default function ShopPage({ shopProducts }: ShopPageProps) {
  const [activePage, setPage] = useState(1);
  // const [FilterModal, filterOpened, filterHandler] = useFilterModal();

  const matches = useMediaQuery('(max-width: 600px)');
  return (
    <>
      <Image className="mt-4" src="/images/shop/heroBanner.jpg" alt="banner" height={400} />
      <div className="my-4">
        {/* <Group position="apart">
          <Only when={matches}>
            <Button onClick={filterHandler.open} leftIcon={<Filter />}>
              Filter
            </Button>
          </Only>
        </Group>
        <Only when={!matches}>
          <ItemFilter />
        </Only> */}
      </div>
      <SectionTitle title="All Products" />
      {/* <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} /> */}
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-12 place-content-center mt-5">
        {shopProducts?.map((product, index) => {
          return (
            <div key={index} className="min-w-[15%]">
              <ProductCard
                id={product.id}
                image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                description={'9/10 condition with charger and box'}
                title={product.title}
                condition={product.condition}
                wishlist={false}
                lowestPrice={Number(product.lowest_price)}
                highestPrice={Number(product.highest_offer)}
                price={Number(product?.user_starting_price)}
              />
            </div>
          );
        })}
      </div>
      <Group position="center">
        <Text size="sm" color="black" className="font-bold">
          Page
        </Text>
        <Pagination
          className="my-16"
          withControls={false}
          position="center"
          value={activePage}
          onChange={setPage}
          total={10}
        />
      </Group>

      <BackgroundImage
        className="text-center min-h-[350px]  sm:min-h-[550px] relative"
        src="/images/shop/mobileBanner.png"
      >
        <div className="absolute top-1/2 sm:left-1/2 -translate-y-1/2 sm:-translate-x-1/2 space-y-8">
          <Title color="white" size={!matches ? 96 : 48} className="font-[300]">
            NOKIA 1.3
          </Title>
          <Text size={!matches ? 36 : 20} color="white" className="font-[100]">
            Get the newly released Nokia 1.3 and have the best expereince
          </Text>
          <Button
            component={NextLink}
            href="/product-listing"
            uppercase
            size="lg"
            bg={'white'}
            styles={{
              label: {
                fontWeight: 'lighter',
                color: 'black',
              },
              root: {
                '&:hover': {
                  backgroundColor: 'white !important',
                },
              },
            }}
          >
            PLACE OFFER
          </Button>
        </div>
      </BackgroundImage>
      <div className="mt-10">
        <FooterProductCarousel />
      </div>
    </>
  );
}
