import {
  ProductCarousel,
  ProductCharts,
  // ProductCharts,
  ProductFilter,
  ProductSpecification,
  ProductStats,
  SalesTable,
  SectionTitle,
} from '@elektra/components';
import { Modal, Only } from '@elektra/customComponents';
import { useFilterModal } from '@elektra/hooks';
import { loadProductData, rehydrateProductData, store, useAppDispatch } from '@elektra/store';

import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Pagination,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useMediaQuery, useScrollIntoView } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArrowDown, Filter, ShoppingCart } from 'tabler-icons-react';
import { ProductData } from '../../types/slices';

const productSpecification = [
  //NEW PRODUCT
  {
    title: 'Iphone 14 Pro Max',
    condition: 'New',
    colorData: ['Black', 'Blue', 'Purple', 'Matte Black', 'White'],
    color: 'Blue',
    capacityData: ['16GB', '64Gb', '128Gb', '256GB'],
    capacity: '128GB',
    carrierData: ['AT&T', 'T-Mobile', 'Verizon', 'Factory Unlocked'],
    carrier: 'Verizon',

    lowestAsk: 169,
    highestAsk: 179,
    price: 400,
  },
  //USED PRODUCT
  {
    title: 'Iphone 14 Pro Max',
    condition: 'Used',
    colorData: ['Black', 'Blue', 'Purple', 'Matte Black', 'White'],
    color: 'Blue',
    capacityData: ['16GB', '64Gb', '128Gb', '256GB'],
    capacity: '128GB',
    carrierData: ['AT&T', 'T-Mobile', 'Verizon', 'Factory Unlocked'],
    carrier: 'Verizon',

    sellerCondition: 'Used/Fair',
    sellerColor: 'Black',
    sellerCapacity: '128GB',
    sellerCarrier: 'Verizon',
    lowestAsk: 169,
    highestAsk: 179,
    price: 400,
  },
];
// const productData: ProductCardProps[] = [
//   {
//     image: '/images/product.png',
//     link: '#',
//     title: 'Iphone X',
//     description: '9/10 condition with charger and box',
//     rating: 'New',
//     wishlist: true,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',
//     link: '#',
//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',
//     link: '#',
//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',
//     link: '#',
//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone X',
//     description: '9/10 condition with charger and box',
//     rating: 'New',
//     wishlist: true,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',
//     link: '#',
//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',
//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',

//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
//   {
//     image: '/images/product.png',
//     link: '#',
//     title: 'Iphone 14 Pro max',
//     description: '9/10 condition with charger and box',
//     wishlist: false,
//     lowestPrice: null,
//     highestPrice: 500,
//     price: 187,
//   },
// ];

export type condition = 'New' | 'Used';

const items = [
  { title: 'Elektra', href: '/' },
  { title: 'Accessories', href: '/shop' },
  { title: 'Phones', href: '/shop' },
  { title: 'Apple', href: '/shop' },
  { title: 'Iphone 14 Pro Max', href: '/product-detail' },
].map((item, index) => (
  <Anchor
    className={`text-xs font-medium underline ${item.title === 'Iphone 14 Pro Max' ? 'font-[900]' : ''}`}
    component={NextLink}
    href={item.href}
    key={index}
  >
    {item.title}
  </Anchor>
));

export async function getServerSideProps(context: NextPageContext) {
  // id: 1 means homepage data
  const productData = store.dispatch(loadProductData(Number(context.query.id)));

  await Promise.all([productData]);

  return {
    props: {
      productDetail: store.getState().entities.productDetail.list,
    },
  };
}

type ProductPageProps = {
  productDetail: ProductData;
};

export default function ProductPage({ productDetail }: ProductPageProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateProductData(productDetail));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [FilterModal, filterOpened, filterHandler] = useFilterModal();
  const [limit, setLimit] = useState(5);
  const matches = useMediaQuery('(max-width: 800px)', false);
  const filters = useMediaQuery('(max-width: 1100px)', false);
  const isNew = router.query['condition'] === 'new';
  const productSpecificationData = isNew ? productSpecification[0] : productSpecification[1];
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 100,
  });
  return (
    <>
      {!matches && (
        <Breadcrumbs separator=">" mt={30} mb={20}>
          {items}
        </Breadcrumbs>
      )}
      <Grid>
        <Grid.Col md={6} mt={matches ? 0 : 40}>
          <Stack align="center" justify="center" className="w-full">
            <Only when={!isNew}>
              <div className=" md:w-auto w-screen ">
                <ProductCarousel images={productDetail?.product?.images ?? []} />
              </div>
            </Only>
            <Only when={isNew}>
              <Image className="md:mt-[-80px]" alt="product image" src="/images/productImage.png" />
            </Only>
            <Text className="text-xs font-medium">Have this item?</Text>
            <Button component={NextLink} href="/product-listing" leftIcon={<ShoppingCart />}>
              Sell Now
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col md={6}>
          <ProductSpecification
            title={productDetail?.product?.title || ""}
            productVariants={productDetail?.product?.product_variants || []}
            // condition={productSpecificationData.condition as condition}
            condition='New'
            // capacity={productSpecificationData.capacity}
            // capacityData={productSpecificationData.capacityData}
            // carrier={productSpecificationData.carrier}
            // carrierData={productSpecificationData.carrierData}
            // color={productSpecificationData.color}
            // colorData={productSpecificationData.colorData}
            highestAsk={productSpecificationData.highestAsk}
            lowestAsk={productSpecificationData.lowestAsk}
            price={productSpecificationData.price}
            sellerCondition={productSpecificationData.sellerCondition}
            sellerColor={productSpecificationData.sellerColor}
            sellerCapacity={productSpecificationData.sellerCapacity}
            sellerCarrier={productSpecificationData.sellerCarrier}
            scrollIntoView={scrollIntoView}
          />
        </Grid.Col>
      </Grid>
      <Divider className="my-4" />
      <Group position="apart" align="top">
        <SectionTitle title="Used iPhone 14 Pro Max" />
        <Only when={filters}>
          <Button onClick={filterHandler.open} leftIcon={<Filter />}>
            Filter
          </Button>
        </Only>
      </Group>
      <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} />
      <Only when={!filters}>
        <ProductFilter />
      </Only>
      {/* <div ref={targetRef} className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-12 place-content-center mt-5">
        {productData.slice(0, limit).map((product, index) => {
          return (
            <ProductCard
              key={index}
              image={product.image}
              description={product.description}
              link={product.link}
              title={product.title}
              rating={product.rating}
              wishlist={product.wishlist}
              lowestPrice={product.lowestPrice ?? null}
              highestPrice={product.highestPrice ?? null}
              price={product.price}
            />
          );
        })}
      </div> */}

      <Center className="mt-20 space-x-3">
        <Only when={limit <= 5}>
          <Text size={16} className="font-[600]" color="black">
            View More
          </Text>

          <ActionIcon
            variant="outline"
            className="rounded-xl w-9 border-black"
            onClick={() => setLimit((prev) => prev + 10)}
          >
            <ArrowDown size={20} color="black" />
          </ActionIcon>
        </Only>
        <Only when={limit > 5}>
          <Pagination
            className="mb-16"
            withControls={false}
            position="center"
            value={activePage}
            onChange={setPage}
            total={10}
          />
        </Only>
      </Center>
      <div className="mt-4">
        <ProductStats />
      </div>
      <Only when={!isNew}>
        <div className="mt-10">
          <Paper withBorder radius={0}>
            <Text size={24} className="font-bold text-black p-5">
              Sales History
            </Text>
            <Divider />
            <div className="py-5 px-2">
              <SalesTable />
            </div>
          </Paper>
        </div>
      </Only>
      <div className="my-10">
        <ProductCharts />
      </div>
      {/* <div className="">
        <SectionTitle title="Recommended New Items" />
        <ScrollArea h={380} type="scroll" scrollbarSize={5}>
          <Center className="space-x-8 md:space-x-16">
            {productData.slice(0, 5).map((product, index) => {
              return (
                <ProductCard
                  key={index}
                  image={product.image}
                  description={product.description}
                  link={product.link}
                  title={product.title}
                  rating={product.rating}
                  wishlist={product.wishlist}
                  lowestPrice={product.lowestPrice ?? null}
                  highestPrice={product.highestPrice ?? null}
                  price={product.price}
                />
              );
            })}
          </Center>
        </ScrollArea>
      </div> */}
    </>
  );
}
