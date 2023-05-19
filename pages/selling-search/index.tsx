import { AutoCompleteItem, FooterMenu, NotHeader } from '@elektra/components';
import { Autocomplete, Container, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Search } from 'tabler-icons-react';

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
    modal: 'Model No : 34354',
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
    modal: 'Model No : 34356',
    value: '3',
    label: 'Iphone X',
    category: 'Phone',
  },
];

export function SellingSearch() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const phone = useMediaQuery('(max-width: 800px)', false);
  const handleSubmit = (item: productDataType) => {
    setValue(item.title);
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
          data={[
            ...productData,
            { value: '__show-more', label: 'Show more', link: `/showing-more?show-more=${value}` },
          ]}
          mt={20}
          filter={(value, item) =>
            item['modal']?.toLowerCase().includes(value.toLowerCase().trim()) ||
            item['title']?.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.value === '__show-more'
          }
          value={value}
          onChange={setValue}
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
      {/* FOOTER MOBILE FIXED MENU*/}
      {phone && <FooterMenu />}
    </div>
  );
}

export default SellingSearch;
