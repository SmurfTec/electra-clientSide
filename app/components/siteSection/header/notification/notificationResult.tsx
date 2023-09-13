import { Badge, Flex, Image, Text } from '@mantine/core';
import moment from 'moment';
type NotificationResultProps = {
  title: string;
  subtitle?: string;
  image: string;
  date: Date;
};


export const NotificationResult = ({ date, image, subtitle, title }: NotificationResultProps) => {
  return (
    <>
      <Flex wrap={'nowrap'} gap={20} ml={15}>
        <Badge bg="#B9EF0E" size="xs" className="mt-1" variant="filled" />
        <Text className="text-[11px] md:text-sm font-medium -ml-2 md:-ml-1">
          {title}
          {/* <strong className="text-sm font-medium text-white">{subtitle}</strong> */}
        </Text>
        <Image src={image} width={70} height={55} fit="contain" alt={subtitle}></Image>
      </Flex>
      <Text className="ml-11 -mt-7 md:-mt-5 text-left text-[11px] font-medium">{moment(date).format("ddd MMM DD YYYY.")}</Text>
    </>
  );
};
