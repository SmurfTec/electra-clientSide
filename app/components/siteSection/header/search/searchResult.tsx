import { Badge, Group, Image, Paper, Stack, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Heart } from 'tabler-icons-react';

type ResultCardProps = {
  image: string;
  title: string;
  modal: string;
};

export const SearchResult = ({ image, title, modal }: ResultCardProps) => {
  return (
    <Stack  className="bg-transparent" align='flex-start' spacing={6}>
      <Image alt={title} src={image}  />
      <Group position="apart" align="center" className="bg-transparent w-full" spacing={0}>
        <Text className="text-[10px] md:text-base font-semibold text-black">{title}</Text>
        <Heart
            className="cursor-pointer"
            size={23}
            strokeWidth={1.5}
          />
      </Group>
      <Badge component={NextLink} href="/shop" bg='rgba(60, 130, 214, 1)' className='text-white' radius={2}>Model : {modal}</Badge>
    </Stack>
  );
};
