import { AutoCompleteItem, NotHeader } from '@elektra/components';
import { Autocomplete, Button, Container, Flex, Group, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import { Home, Search } from 'tabler-icons-react';

type productDataType = {
  image: string;
  link: string;
  value: string;
  title: string;
  modal: string;
  label: string;
  category: string;
};

const productData: productDataType[] = [
  {
    image: '/images/product.png',
    link: '/product-listing',
    value: '1',
    title: 'Iphone X',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    title: 'Iphone 11',
    value: '2',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    title: 'Iphone 11 Pro Max',
    modal: 'Model No : 34355',
    value: '3',
    label: 'Iphone X',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    title: 'Iphone 12 Pro',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    value: '4',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    title: 'Iphone 13 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    value: '5',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    title: 'Iphone 13 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    value: '6',
    category: 'Phone',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    title: 'Iphone 14 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
    value: '7',
  },
  {
    image: '/images/product.png',
    link: '/product-listing',
    title: 'Iphone 14 Pro Max',
    modal: 'Model No : 34355',
    label: 'Iphone X',
    category: 'Phone',
    value: '8',
  },
];

export function SellingSearch() {
  const router = useRouter();

  const handleSubmit = (item: productDataType) => {
    router.push(item.link);
  };

  return (
    <div>
      <NotHeader />
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
