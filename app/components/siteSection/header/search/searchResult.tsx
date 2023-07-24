import { Badge, Group, Image, Paper, Stack, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

import { Heart } from 'tabler-icons-react';

type ResultCardProps = {
  id:number,
  image: string;
  title: string;
  modal: string;
  close: () => void;
};

export const SearchResult = ({ id,image, title, modal,close }: ResultCardProps) => {
  const router = useRouter()
  return (
    <Stack className="bg-transparent cursor-pointer" align='flex-start' spacing={6} onClick={()=>{
      close()
      router.push('/product-detail/'+id)}}>
      <Image alt={title} src={image}  />
      <Group position="apart" align="center" className="bg-transparent w-full" spacing={0}>
        <Text className="text-[10px] md:text-base font-semibold text-black">{title}</Text>
        <Heart
            className="cursor-pointer"
            size={23}
            strokeWidth={1.5}
          />
      </Group>
      {/* <Badge component={NextLink} href="/shop" bg='rgba(60, 130, 214, 1)' className='text-white' radius={2}>Model : {modal}</Badge> */}
    </Stack>
  );
};
