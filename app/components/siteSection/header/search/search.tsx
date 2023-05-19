import { Only } from '@elektra/customComponents';
import { Button, Center, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { HeaderSearch } from './headerSearch';
import { SearchResult } from './searchResult';

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
  const [search, setSearch] = useState('');
  const [data, setdata] = useState(categoryData);
  return (
    <Stack className='relative'  spacing={0} bg="rgba(232, 232, 232, 1)">
      <HeaderSearch close={close} state={search} setState={setSearch} />
      <Divider color="black" size={2} />
      <Only when={search !== ''}>
        <div className="md:p-8 p-6 w-full absolute top-[68px] md:top-[76px] bg-inherit z-10">
          <SimpleGrid
            cols={5}
            spacing={40}
            breakpoints={[
              { maxWidth: '92rem', cols: 5, spacing: 30 },
              { maxWidth: '72rem', cols: 4, spacing: 20 },
              { maxWidth: '58rem', cols: 3, spacing: 10 },
              { maxWidth: '36rem', cols: 2, spacing: 10 },
            ]}
          >
            {data.map((item, index) => (
              <SearchResult key={index} image={item.image} modal={item.modal} title={item.title} />
            ))}
          </SimpleGrid>
          <div className="mt-16 md:mt-36">
            <Text className="text-sm font-medium">Suggestions</Text>
            <Group position="apart">
              <Center className="space-x-4">
                <Text className="text-base font-medium" component={NextLink} href={'/product-detail'} onClick={close}>
                  Iphone 14 Pro Max
                </Text>
                <Text className="text-base font-medium" component={NextLink} href={'/product-detail'} onClick={close}>
                  Iphone 13 Pro Max
                </Text>
                <Text className="text-base font-medium" component={NextLink} href={'/product-detail'} onClick={close}>
                  Iphone 12 Pro Max
                </Text>
                <Text className="text-base font-medium" component={NextLink} href={'/product-detail'} onClick={close}>
                  Iphone 11 Pro
                </Text>
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
        </div>
      </Only>
    </Stack>
  );
};
