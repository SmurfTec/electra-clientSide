import { NextImage } from '@elektra/ui';
import { Button, Group, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';

type ProductDetailProps = {
  image: string;
  title: string;
  space: string;
  color: string;
  company: string;
  condition: string;
  expiration: string;
  cardDetails: string;
  address: string;
};

export function ProductDetail({
  image,
  title,
  space,
  color,
  company,
  condition,
  expiration,
  cardDetails,
  address,
}: ProductDetailProps) {
  const theme = useMantineTheme();
  return (
    <div style={{ border: '1px solid', borderColor: theme.other.color.borderColor }} className="p-8 rounded-xl">
      <Group className="space-x-4">
        <div>
          <Paper bg={theme.other.color.productBackground} className="py-2 px-6 flex justify-center items-center">
            <NextImage height={40} width={35} alt={title} src={image} />
          </Paper>
        </div>
        <div className="space-y-4">
          <Text className="font-bold" size="xl">
            {title}
          </Text>
          <Group>
            <Button variant="outline" className="font-bold rounded-2xl" px="20" h={30}>
              {space}
            </Button>
            <Button variant="outline" className="font-bold rounded-2xl" px="20" h={30}>
              {color}
            </Button>
            <Button variant="outline" className="font-bold rounded-2xl" px="20" h={30}>
              {company}
            </Button>
          </Group>
        </div>
      </Group>

      <div className='mt-6 space-y-4'>
        <div>
          <Title className='font-[600]' order={6}>CONDITION</Title>
          <Text className='font-bold' size="md">{condition}</Text>
        </div>

        <div>
          <Title className='font-[600]' order={6}>OFFER EXPIRATION</Title>
          <Text className='font-bold' size="md">{expiration}</Text>
        </div>

        <div>
          <Title className='font-[600]' order={6}>OFFER EXPIRATION</Title>
          <Text className='font-bold' size="md">{expiration}</Text>
        </div>

        <div>
          <Title className='font-[600]' order={6}>CARD DETAILS</Title>
          <Text className='font-bold' size="md">{cardDetails}</Text>
        </div>

        <div>
          <Title className='font-[600]' order={6}>SHIPPING ADDRESS</Title>
          <Text className='font-bold' size="md">{address}</Text>
        </div>
      </div>
    </div>
  );
}
