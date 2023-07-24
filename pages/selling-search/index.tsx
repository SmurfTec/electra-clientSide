import { AutoCompleteItem, FooterMenu, NotHeader } from '@elektra/components';
import { baseURL, http } from '@elektra/customComponents';
import { Product } from '@elektra/types';
import { Autocomplete, Container, Loader, Text } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [debounced] = useDebouncedValue(value, 500);
  const [data, setData] = useState<Array<productDataType>>([]);
  const handleChange = async (val: string) => {
    setLoading(true);
    setValue(val)
    const res = await http.request({
      url: `products/?title=%${val}%&limit=3&page=1`,
      method: 'GET',
    });
    if (res.isError) {
      setLoading(false);
    } else {
      const productData = res?.data?.['products']?.map((item: Product) => ({
        image: baseURL + '/' + item.images?.[0].filename,
        link: `/product-listing/${item.id}`,
        title: item?.title,
        modal: 'NID',
        value: item?.title,
        label: item?.title,
        category: item.category.name,
      }));
      setData(productData);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debounced) {
      handleChange(debounced);
    }
  }, [debounced]);
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
          data={[...data, { value: '__show-more', label: 'Show more', link: `/showing-more?show-more=${value}` }]}
          mt={20}
          filter={(value, item) =>{
            if(value==='')
            return false
            return item['title']?.toLowerCase()?.includes(String(value)?.toLowerCase()?.trim()) || item.value === '__show-more'
          }}
          value={value}
          onChange={handleChange}
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
          rightSection={loading ? <Loader /> : undefined}
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
