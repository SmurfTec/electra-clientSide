import { Only, baseURL, http } from '@elektra/customComponents';
import { Product, ProductDisplayData } from '@elektra/types';
import { Button, Center, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useEffect, useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { HeaderSearch } from './headerSearch';
import { SearchResult } from './searchResult';
import { useRouter } from 'next/router';

const categoryData = [
  {
    id: 1,
    image: '/images/search/search1.png',
    title: 'Laptops',
    modal: '24053',
  },
  {
    id: 2,
    image: '/images/search/search2.png',
    title: 'Phones',
    modal: '24053',
  },
  {
    id: 3,
    image: '/images/search/search3.png',
    title: 'Phones',
    modal: '24053',
  },
  {
    id: 4,
    image: '/images/search/search4.png',
    title: 'Phones',
    modal: '24053',
  },
  {
    id: 5,
    image: '/images/search/search2.png',
    title: 'Phones',
    modal: '24053',
  },
  {
    id: 3,
    image: '/images/search/search3.png',
    title: 'Phones',
    modal: '24053',
  },
  {
    id: 4,
    image: '/images/search/search4.png',
    title: 'Phones',
    modal: '24053',
  },
  {
    id: 5,
    image: '/images/search/search2.png',
    title: 'Phones',
    modal: '24053',
  },
  // {
  //   id: 6,
  //   image: '/images/search/search1.png',
  //   title: 'Phones',
  //   modal: '24053',
  // },
  // {
  //   id: 7,
  //   image: '/images/search/search3.png',
  //   title: 'Phones',
  //   modal: '24053',
  // },
];

type SearchProps = {
  close: () => void;
};

export const Search = ({ close }: SearchProps) => {
  const router = useRouter()
  const [search, setSearch] = useState('');
  const [data, setdata] = useState<
    Array<{
      id: number;
      image: string;
      title: string;
      modal: string;
    }>
  >([]);
  const [suggestions, setSuggestions] = useState<Array<{title:string}>>([]);
  const [loading, setLoading] = useState(false);
  const [debounced] = useDebouncedValue(search, 500);
  const handleChange = async (val: string) => {
    setLoading(true);
    const res = await http.request({
      url: `products/?title=%${val}%&limit=7&page=1`,
      method: 'GET',
    });
    const sug = await http.request({
      url: `products/suggestions/${val}`,
      method: 'GET',
    });
    if (res.isError || sug.isError) {
      setLoading(false);
    } else {
      const productData = res?.data?.['products']?.map((item: ProductDisplayData) => ({
        id: item?.id,
        title: item?.title,
        image: baseURL + '/' + item.images?.[0].filename,
        modal: item?.product_properties?.model_no,
      }));
      setdata(productData);
      setSuggestions(sug.data['products']);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debounced) {
      handleChange(debounced);
    }
  }, [debounced]);
  return (
    <Stack className="relative" spacing={0} bg="rgba(232, 232, 232, 1)">
      <HeaderSearch close={close} state={search} setState={setSearch} loading={loading} />
      <Divider color="black" size={2} />
      <Only when={debounced !== ''}>
        <div className="md:p-8 p-6 w-full absolute top-[60px]  bg-inherit z-10">
          <SimpleGrid
            cols={7}
            spacing={40}
            breakpoints={[
              { maxWidth: '92rem', cols: 5, spacing: 30 },
              { maxWidth: '72rem', cols: 4, spacing: 20 },
              { maxWidth: '58rem', cols: 3, spacing: 10 },
              { maxWidth: '36rem', cols: 2, spacing: 10 },
            ]}
          >
            {data?.length !== 0 ? (
              data?.map((item, index) => (
                <SearchResult
                  id={item.id}
                  key={index}
                  image={item.image}
                  modal={item.modal}
                  title={item.title}
                  close={close}
                />
              ))
            ) : (
              <Center>No Item</Center>
            )}
          </SimpleGrid>
          {suggestions?.length !== 0 && (
            <div className="mt-16">
              <Text className="text-sm font-medium">Suggestions</Text>
              <Group position="apart">
                <Center className="space-x-4">
                  {suggestions.map((item, index) => (
                    <Text
                      key={item.title + index}
                      className="text-base font-medium cursor-pointer"
                      onClick={()=>{
                        router.push(`/showing-more?show-more=${item.title}`)
                        close()
                      }}
                    >
                      {item.title}
                    </Text>
                  ))}
                </Center>
                <Center className="space-x-3">
                  <Text className="text-base font-semibold text-black">More Results</Text>
                  <Button
                    className="rounded-3xl px-4 h-7"
                    onClick={close}
                    styles={{
                      root: {
                        '&:not([data-disabled]):hover': {
                          backgroundColor: 'white',
                        },
                      },
                      rightIcon: {
                        marginLeft: 0,
                      },
                    }}
                    rightIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
                    variant="outline"
                    component={NextLink}
                    href={`/showing-more?show-more=${search}`}
                  />
                </Center>
              </Group>
            </div>
          )}
        </div>
      </Only>
    </Stack>
  );
};
