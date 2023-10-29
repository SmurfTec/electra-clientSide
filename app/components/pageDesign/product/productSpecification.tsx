import { Drawer, Only } from '@elektra/customComponents';
import { useSellerDetailDrawer, useTechinalSpecificationDrawer } from '@elektra/hooks';
import { likeProduct, store } from '@elektra/store';
import { TechnicalSpecification, Variant } from '@elektra/types';
import { Button, Chip, Grid, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useState } from 'react';
import { ChevronRight, Heart } from 'tabler-icons-react';
import { BiddingInput } from '../../inputs';

export type ProductSpecificationProps = {
  title: string;
  id: number;
  condition: 'new' | 'used';
  productVariants: Variant[];
  lowestAsk: number;
  highestAsk: number;
  price: number;
  scrollIntoView?: ({ alignment }?: any | undefined) => void;
  technicalSpecification: TechnicalSpecification[];
  isListingVisible: boolean;
  more_info?: string;
  lowest_ask?: any;
};

export function ProductSpecification({
  condition,
  title,
  id,
  productVariants,
  highestAsk,
  lowestAsk,
  price,
  scrollIntoView,
  technicalSpecification,
  isListingVisible,
  more_info,
  lowest_ask,
}: ProductSpecificationProps) {
  const [SellerDetailModal, sellerDetailOpened, sellerDetailHandler] = useSellerDetailDrawer({
    more_info: more_info || '',
  });
  const [TechinalSpecificationModal, techinalSpecificationOpened, techinalSpecificationHandler] =
    useTechinalSpecificationDrawer({ techinalSpecificationDrawerData: technicalSpecification });
  const [isLike, setIsLike] = useState(false);
  const phone = useMediaQuery('(max-width: 600px)');

  return (
    <div>
      <div className="space-y-2 ">
        <Title className="mt-6 uppercase md:mt-0" color={'#656565'} order={6}>
          About Product
        </Title>
        <Grid align="top">
          <Grid.Col span={11}>
            <Title
              align="initial"
              className="font-bold uppercase"
              size={phone ? '20px' : '30px'}
              color={'black'}
              order={3}
            >
              {title}
            </Title>
          </Grid.Col>
          <Grid.Col span={1}>
            <span className="bg-[#D9E2E98F] rounded-2xl w-8 h-8 relative mb-2">
              <Heart
                onClick={() => {
                  store.dispatch(likeProduct(condition === 'new' ? { product: id } : { listing: id }));
                  setIsLike(!isLike);
                }}
                fill={isLike ? 'red' : 'white'}
                color={isLike ? 'red' : undefined}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer left-1/2 top-1/2"
              />
            </span>
          </Grid.Col>
        </Grid>
      </div>
      <form>
        <div className="space-y-4">
          <Drawer
            title="Technical Specification"
            children={TechinalSpecificationModal}
            onClose={techinalSpecificationHandler.close}
            open={techinalSpecificationOpened}
            position={phone ? 'bottom' : 'right'}
          />
          <Button
            onClick={techinalSpecificationHandler.open}
            className="w-full h-14"
            rightIcon={<ChevronRight />}
            styles={{
              root: {
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              },
              label: {
                fontSize: '16px',
                fontWeight: 'lighter',
              },
              inner: {
                justifyContent: 'space-between',
              },
            }}
            bg="black"
          >
            Technical Specifications
          </Button>
          <Only when={condition !== 'new'}>
            <Drawer
              title="Details from seller"
              children={SellerDetailModal}
              onClose={sellerDetailHandler.close}
              open={sellerDetailOpened}
              position={phone ? 'bottom' : 'right'}
            />
            <Button
              onClick={sellerDetailHandler.open}
              className="w-full h-14"
              rightIcon={<ChevronRight />}
              styles={{
                root: {
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '6px',
                  '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                  },
                },
                label: {
                  fontSize: '16px',
                  fontWeight: 'lighter',
                },
                inner: {
                  justifyContent: 'space-between',
                },
              }}
              bg="black"
            >
              Details From Seller
            </Button>
          </Only>

          {/* <Only when={condition === 'new'}> */}
          <div className="space-y-3">
            <div>
              <Title className="uppercase font-[600]" order={6}>
                CONDITION
              </Title>
              <Text size="sm" mt={4}>
                {condition}
              </Text>
            </div>
            {productVariants?.map((item, key) => {
              return (
                <div key={key + item.color}>
                  <div>
                    <Title className="uppercase font-[600]" order={6}>
                      {item.variant}
                    </Title>
                    <ChipDisplay data={[item.value]} item={item.value} />
                  </div>
                </div>
              );
            })}
          </div>
          {/* </Only> */}
        </div>

        {/* <div> */}
        <Grid m={'calc(-1.25rem / 2)'}>
          <Grid.Col span={6}>
            <BiddingInput title="Lowest Asks" value={lowestAsk} />
          </Grid.Col>
          <Grid.Col span={6}>
            <BiddingInput title="Highest Offer" value={highestAsk} />
          </Grid.Col>
        </Grid>
        {/* </div> */}

        <div>
          <Grid m={'calc(-1.25rem / 2)'}>
            <Grid.Col span={6}>
              <Button
                component={NextLink}
                href={condition === 'new' ? '/buy-offer' : '/buy-offer/listing'}
                size={phone ? '16px' : '20px'}
                className="w-full h-10 uppercase font-[200]"
                bg="black"
                // disabled={lowestAsk === 0 && highestAsk === 0}
                disabled={lowestAsk == null ? true : false}
              >
                BUY NOW
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                component={NextLink}
                href={condition === 'new' ? '/place-offer' : '/place-offer/listing'}
                size={phone ? '16px' : '20px'}
                className="w-full h-10 uppercase font-[200]"
                bg="black"
                disabled={false}
              >
                PLACE OFFER
              </Button>
            </Grid.Col>
            <Only when={isListingVisible}>
              <Grid.Col span={12} className="mt-[-15px]">
                <Button
                  onClick={() => {
                    if (scrollIntoView) {
                      scrollIntoView();
                    }
                  }}
                  size="16px"
                  className="font-[500] h-10 w-full"
                  bg="#3C82D6"
                >
                  Shop used starting at {price}
                </Button>
              </Grid.Col>
            </Only>
          </Grid>
        </div>
      </form>
    </div>
  );
}

export type ChipDisplayProps = {
  data: string[];
  item: string;
};

export function ChipDisplay({ data, item }: ChipDisplayProps) {
  const theme = useMantineTheme();
  return (
    <Chip.Group value={item}>
      <Group className="space-x-4">
        {data?.map((value, index) => (
          <Chip
            key={index}
            value={value}
            styles={{
              iconWrapper: {
                display: 'none',
              },
              label: {
                color: '#656565',
                padding: '0 !important',
                border: 'none !important',
                '&[data-checked]': {
                  color: 'black',
                  padding: '0 !important',
                  borderBottom: '1px solid black !important',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'unset',
                  },
                },
              },
              checkIcon: {
                display: 'none',
              },
            }}
          >
            {value}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
}
