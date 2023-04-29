import { Badge, Flex, Image, Text } from '@mantine/core';

export const Notification = () => {
  return (
    <>
      <Flex wrap={'nowrap'} gap={20} ml={15}>
        <Badge bg="#B9EF0E" size="xs" className='mt-1' variant="filled" />
        <Text className="text-sm font-medium -ml-1">
          Buy new iphone 14 today. <strong className="text-sm font-medium text-white">View product now</strong>
        </Text>
        <Image src={'/images/notification/product.png'} width={70} height={55} fit="contain" alt="pi"></Image>
      </Flex>
      <Text className="ml-11 -mt-5 text-left">{new Date().toDateString()}</Text>
    </>
  );
};
