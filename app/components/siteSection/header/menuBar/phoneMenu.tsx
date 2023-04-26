import { CategoryCard } from '@elektra/components/card';
import { Container, Flex, Group, List, Text } from '@mantine/core';

export const PhoneMenu = () => {
  return (
    <Container size={1200} py={50}>
      <Group spacing={100} position="center">
        <Flex gap="xs" justify="center" align="center" direction="column" wrap="wrap">
          <List type="unordered" icon={<></>}>
            <Text color="black" className="text-sm font-medium ml-3">
              Phones
            </Text>
            <List.Item>HPa</List.Item>
            <List.Item>Acer</List.Item>
            <List.Item>Apple</List.Item>
            <List.Item>Asus</List.Item>
            <List.Item>Dell</List.Item>
            <List.Item>Lenovo</List.Item>
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
        <CategoryCard id={1} image={'/images/menu/lptpimg2.png'} title={'Laptops'} link={'#'} />
        <CategoryCard id={1} image={'/images/menu/lptpimg2.png'} title={'Laptops'} link={'#'} />
      </Group>
    </Container>
  );
};
