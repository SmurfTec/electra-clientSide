import { Grid, Group, Modal, Paper, ScrollArea, Text } from '@mantine/core';
import { useCarouselModal } from '@elektra/hooks';
import { Only, TransparentButton } from '@elektra/customComponents';
import Image from 'next/image';

export type ItemCardProps = {
  status?: string;
  sale?: boolean;
  price?: number;
  date?: string;
  title: string;
  image: string;
  space: string;
  color: string;
  company: string;
};

export function ItemCard({ title, image, space, color, company, date, price, sale, status, ...rest}: ItemCardProps) {
  const [carouselModal, carouselOpened, carouselHandler] = useCarouselModal();

  return (
    <Grid {...rest} >
      <Grid.Col span={2}>
        <Paper bg={'#F5F5F5'} className="pt-2 flex justify-center  relative">
          <Image height={70} width={60} alt={title} src={image} onClick={carouselHandler.open} />
          <Modal
            scrollAreaComponent={ScrollArea}
            fullScreen
            overlayProps={{
              color: 'black',
              opacity: 0.6,
              blur: 2,
            }}
            styles={{
              content: {
                background: 'transparent',
                zIndex: 10,
              },
              header: {
                background: 'transparent',
                position: 'relative',
                // height: "12vh"
              },
              body: {
                marginTop: '85px',
                scrollbarColor: 'transparent !important',
                overflow: 'invisible !important',
              },
              close: {
                position: 'absolute',
                top: 30,
                right: 40,
                zIndex: 1000,
                color: 'white',
                borderRadius: 'unset',
                '&:hover': {
                  backgroundColor: 'unset',
                  color: 'white',
                },
              },
            }}
            className="bg-transparent"
            keepMounted={false}
            closeButtonProps={{ size: 'lg' }}
            children={carouselModal}
            onClose={carouselHandler.close}
            opened={carouselOpened}
          />
          <Only when={!!status}>
            <Text align="center" className="absolute bottom-0 w-full" bg={'black'} color={'white'} size="sm">
              {status}
            </Text>
          </Only>
        </Paper>
      </Grid.Col>
      <Grid.Col span={10} className="space-y-4">
        <Group position="apart">
          <Group>
            <Text className="font-bold" size="xl">
              {title}
            </Text>
            <Only when={!!sale}>
              <Text className="py-1 px-8" bg={'black'} color={'white'} size="sm">
                Sale
              </Text>
            </Only>
          </Group>
          <Only when={!!price}>
            <Text className="font-bold" size="xl">
              $ {price}
            </Text>
          </Only>
        </Group>
        <Group position="apart">
          <Group>
            <TransparentButton label={space} />
            <TransparentButton label={color} />
            <TransparentButton label={company} />
          </Group>
          <Only when={!!date}>
            <Text color="#656565" size="sm">
              {date}
            </Text>
          </Only>
        </Group>
      </Grid.Col>
    </Grid>
  );
}
