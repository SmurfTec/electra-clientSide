import { Paper, Text } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import { Heart } from 'tabler-icons-react';

type CategoryCardProps = {
  name: string;
  capacity: string;
  image: StaticImageData;
  color: string;
  carrier: string;
  price: number;
  wishlist: boolean
};

export function CategoryCard({
  image,
  name,
  capacity,
  color,
  carrier,
  price,
  wishlist,
}: CategoryCardProps) {
  return (
    <Paper className="">
      {/* //TODO: need to make color appear from theme */}
      <Paper className="bg-[#F5F5F5] p-20 flex justify-center items-center">
        <Image src={image} alt={name} className="" />
      </Paper>
      <Paper className="flex justify-between mt-5">
        <Text>{name}</Text>
        <Heart className='cursor-pointer' size={23} strokeWidth={1.5} fill={wishlist ? "red": "white"} color={wishlist ? "red" : undefined}/>
      </Paper>
      <Paper className='grid grid-cols-3 gap-3 mt-5'>
        <Text size={"xs"}>Capacity <br /> <span className='font-bold'>{capacity}</span> </Text>
        <Text size={"xs"}>Color <br /> <span className='font-bold'>{color}</span> </Text>
        <Text size={"xs"}>Carrier <br /> <span className='font-bold'>{carrier}</span> </Text>
      </Paper>
      <Paper className='mt-5'>
        <Text size={"xs"} className='inline-block'>Used Starting at</Text> <Text size={"xs"} className='inline-block font-bold'>${price}</Text>
      </Paper>
    </Paper>
  );
}
