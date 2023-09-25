import { CategoryCard } from '@elektra/components/card';
import { Center, Container, Flex, Group, List } from '@mantine/core';
import { useRouter } from 'next/router';

type LaptopMenuProps = {
  brands: {
    title: string;
    id: number;
    image: string;
  }[] | undefined;
};

export const LaptopMenu = ({ brands }: LaptopMenuProps) => {
  const router = useRouter();

  return (
    <Container size={1200} py={50}>
      <Group spacing={100} position="center">
        <Flex gap="xs" justify="center" align="center" direction="column" wrap="wrap">
          <List type="unordered" icon={<></>}>
            {/* <Text onClick={()=> router.push("/shop")} color="black" className="text-sm font-medium ml-3">
              Laptops
            </Text> */}
            {brands?.map((item) => (
              <List.Item onClick={() => router.push(`/shop?brand=${item.id}`)} className="cursor-pointer">
                {item.title}
              </List.Item>
            ))}
          </List>
        </Flex>
        {/* <Flex gap="xs" justify="center" align="center" direction="column" wrap="wrap">
          <List type="unordered" icon={<></>}>
            <Text color="black" className="text-sm font-medium ml-3">
              Modals
            </Text>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>HP Omen</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>NoteBook</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>EliteBook</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Asus</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Dell</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Lenovo</List.Item>
          </List>
        </Flex> */}
        <Center className="space-x-6 md:space-x-28">
          <CategoryCard id={1} image={'/images/menu/lptpimg.png'} title={'Laptops'} link={'/shop'} />
          <CategoryCard id={1} image={'/images/menu/lptpimg2.png'} title={'Laptops'} link={'/shop'} />
        </Center>
      </Group>
    </Container>
  );
};
