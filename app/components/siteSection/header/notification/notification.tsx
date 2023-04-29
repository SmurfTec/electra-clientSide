import { Badge, Flex, Group, Image, Stack, Text } from '@mantine/core';

export const Notification = () => {
  return (
    <>
      <Flex wrap={'nowrap'} gap={5} ml={10} >
        <Badge bg="#B9EF0E" size="xs" variant="filled" />
        <Stack align="flex-start" spacing={5}>
          <Text className="text-sm font-medium">
            Buy new iphone 14 today. <strong className="text-sm font-medium text-white">View product now</strong>
          </Text>
          <Text>{new Date().toDateString()}</Text>
        </Stack>
        <Image src={'/images/notification/product.png'} width={150} height={55} fit="contain" alt="pi"></Image>
      </Flex>
    </>
  );
};
