import { Only, TransparentButton } from '@elektra/customComponents';
import { useCarouselModal } from '@elektra/hooks';
import { Variant } from '@elektra/types';
import { Grid, Group, Image, Modal, Paper, ScrollArea, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// import Image from 'next/image';

export type ItemCardProps = {
  status?: string;
  sale?: boolean;
  price?: number;
  date?: string;
  title: string;
  image: string | null;
  productVariants: Variant[];
};

export function ItemCard({ title, image, productVariants, date, price, sale, status, ...rest }: ItemCardProps) {
  const [carouselModal, carouselOpened, carouselHandler] = useCarouselModal();
  const phone = useMediaQuery('(max-width: 600px)', false);
  return (
    <Grid m={0} {...rest} gutter={phone ? 10 : 20}>
      <Only when={!!image}>
        <Grid.Col span={2}>
          <Paper bg={'#F5F5F5'} className="flex justify-center relative">
            <Image width={60} alt={title} src={image} onClick={carouselHandler.open} />
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
      </Only>
      <Grid.Col span={!image ? 12 :10} className={'space-y-2'}>
        <Group position="apart">
          <Group>
            <Text color="black" className="font-bold" size={!sale ? 20 : phone ? 14 : 'xl'}>
              {title}
            </Text>
            <Only when={!!sale}>
              <Text className="py-1 px-3 xs:px-8 h-[26px] xs:h-auto" bg={'black'} color={'white'} size="sm">
                Sale
              </Text>
            </Only>
          </Group>
          <Only when={!!price}>
            <Text className="font-bold text-black" size={phone ? 12 : 'xl'}>
              $ {price}
            </Text>
          </Only>
        </Group>
        <Group position="apart" spacing={0}>
          <Group align="top" spacing={phone ? 8 : 15}>
            {productVariants?.map((item, key) => (
              <div key={key + item.id + item.value}>
                <TransparentButton label={item.value} />
              </div>
            ))}
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
