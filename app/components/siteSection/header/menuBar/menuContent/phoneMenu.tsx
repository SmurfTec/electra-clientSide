import { CategoryCard } from '@elektra/components/card';
import { Center, Container, Flex, Group, List, Text } from '@mantine/core';
import { useRouter } from 'next/router';

export const PhoneMenu = () => {
  const router = useRouter()
  return (
    <Container size={1200} py={50}>
      <Group spacing={100} position="center">
        <Flex gap="xs" justify="center" align="center" direction="column" wrap="wrap">
          <List type="unordered" icon={<></>}>
            <Text color="black" className="text-sm font-medium ml-3">
              Phones
            </Text>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>HPa</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Acer</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Apple</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Asus</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Dell</List.Item>
            <List.Item onClick={()=> router.push("/shop")} className='cursor-pointer'>Lenovo</List.Item>
          </List>
        </Flex>
        <Flex gap="xs" justify="center" align="center" direction="column" wrap="wrap">
          <List type="unordered" icon={<></>}>
            <Text color="black" className="text-sm font-medium ml-3">
              Modals
            </Text>
            <List.Item>HP Omen</List.Item>
            <List.Item>NoteBook</List.Item>
            <List.Item>EliteBook</List.Item>
            <List.Item>Asus</List.Item>
            <List.Item>Dell</List.Item>
            <List.Item>Lenovo</List.Item>
          </List>
        </Flex>
        <Center className='space-x-6 md:space-x-28'>
        <CategoryCard id={1} image={'/images/menu/lptpimg2.png'} title={'Laptops'} link={'/shop'} />
        <CategoryCard id={1} image={'/images/menu/lptpimg2.png'} title={'Laptops'} link={'/shop'} />
        </Center>
      </Group>
    </Container>
  );
};
