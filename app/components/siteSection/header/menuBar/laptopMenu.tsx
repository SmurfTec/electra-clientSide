import { CategoryCard } from '@elektra/components/card';
import { Container, Flex, Group, List, Text } from '@mantine/core';

export const LaptopMenu = () => {
  return (
    // <Container py={40}>
      <Group spacing={100} position='center'>
        <Flex gap="xs" justify="center" align="center" direction="column" wrap="wrap">
          <Text color="black" className="text-sm font-medium">
            Laptops
          </Text>
          <List type="unordered" icon={<></>}>
            <List.Item>HP</List.Item>
            <List.Item>Acer</List.Item>
            <List.Item>Apple</List.Item>
            <List.Item>Asus</List.Item>
            <List.Item>Dell</List.Item>
            <List.Item>Lenovo</List.Item>
          </List>
        </Flex>
        <Flex gap="xs" justify="center" align="center" direction="column" wrap="wrap">
          <Text color="black" className="text-sm font-medium">
            Modals
          </Text>
          <List type="unordered" icon={<></>}>
            <List.Item>HP Omen</List.Item>
            <List.Item>NoteBook</List.Item>
            <List.Item>EliteBook</List.Item>
            <List.Item>Asus</List.Item>
            <List.Item>Dell</List.Item>
            <List.Item>Lenovo</List.Item>
          </List>
        </Flex>
        <CategoryCard id={1} image={'/images/category.png'} title={'Laptops'} link={'#'} />
        <CategoryCard id={1} image={'/images/category.png'} title={'Laptops'} link={'#'} />
      </Group>
    // </Container>
  );
};
