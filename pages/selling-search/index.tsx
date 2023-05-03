import { AutoCompleteItem } from '@elektra/components';
import { Autocomplete, Button, Container, Flex, Group, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import { Home, Search } from 'tabler-icons-react';

type productDataType = {
  image: string;
  link: string;
  value: string;
  modal: string;
  label: string;
  category: string;
};

const productData: productDataType[] = [
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone X',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone 11',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone 11 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone 12 Pro',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone 13 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone 13 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone 14 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: 'Iphone 14 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
];

export function SellingSearch() {
  const router = useRouter();

  const handleSubmit = (item: productDataType) => {
    router.push(item.link);
  };

  return (
    <div>
      <Flex
        mih={60}
        className="bg-black text-white font-normal text-xs md:text-base"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Group position="apart" className="w-full" px={25}>
          <Text component={NextLink} href="/" color="white" className="font-bold ml-6 md:ml-3">
            Elektra
          </Text>
          <Button color="black" bg={'black'} leftIcon={<Home />}>
            Go to home
          </Button>
        </Group>
      </Flex>
      <Container size={1300} mt={30}>
        <Text size={24} className="font-semibold text-black">
          Choose product you want to list.
        </Text>
        <Autocomplete
          data={productData}
          mt={20}
          limit={40}
          onItemSubmit={handleSubmit}
          withinPortal={true}
          nothingFound={<div>No Product Found</div>}
          styles={{
            item: {},
            input: { backgroundColor: '#F1F1F1' },
          }}
          radius={'md'}
          itemComponent={AutoCompleteItem}
          size="xl"
          maw={1000}
          icon={<Search />}
          placeholder="Search product by name and model no"
        />
      </Container>
    </div>
  );
}

export default SellingSearch;
