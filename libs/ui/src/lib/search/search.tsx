import { Autocomplete, Avatar, Badge, Group, MantineColor, SelectItemProps, Text } from '@mantine/core';
import { forwardRef } from 'react';

const charactersList = [
  {
    image: '/images/product.png',
    label: 'Iphone 14',
    badges: ['128', '64', '264'],
  },
  {
    image: '/images/product.png',
    label: 'Iphone 15',
    badges: ['128', '64', '264'],
  },
  {
    image: '/images/product.png',
    label: 'Iphone 16',
    badges: ['128', '64', '264'],
  },
  {
    image: '/images/product.png',
    label: 'Iphone 17',
    badges: ['128', '64', '264'],
  },

  {
    image: '/images/product.png',
    label: 'Iphone 13',
    badges: ['128', '64', '264'],
  },
  {
    image: '/images/product.png',
    label: 'Iphone 12',
    badges: ['128', '64', '264'],
  },
];

const data = charactersList.map((item) => ({ ...item, value: item.label }));

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  badges: Array<string>;
  image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ badges, value, image, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text>{value}</Text>
          {badges.map((item)=><Badge >{item}</Badge>)}
        </div>
      </Group>
    </div>
  )
);

export function Demo() {
  return (
    <Autocomplete
      label="Search Box"
      placeholder="Pick one"
      itemComponent={AutoCompleteItem}
      data={data}
      filter={(value, item) =>
        item.value.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
