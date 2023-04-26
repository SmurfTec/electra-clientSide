import { Drawer, Only } from '@elektra/customComponents';
import { useSellerDetailDrawer, useTechinalSpecificationDrawer } from '@elektra/hooks';
import { Button, Chip, Grid, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';
import { BiddingInput } from '../../inputs';
import { NextLink } from '@mantine/next';

export type ProductSpecificationProps = {
  title: string;
  colorData: string[];
  color: string;
  capacityData: string[];
  capacity: string;
  carrierData: string[];
  carrier: string;
  condition: 'New' | 'Used';

  sellerCondition?: string;
  sellerColor?: string;
  sellerCapacity?: string;
  sellerCarrier?: string;
  lowestAsk: number;
  highestAsk: number;
  price: number;
};

export function ProductSpecification({
  condition,
  title,
  colorData,
  color,
  capacity,
  capacityData,
  carrier,
  carrierData,
  highestAsk,
  lowestAsk,
  price,
  sellerCapacity,
  sellerCarrier,
  sellerColor,
  sellerCondition,
}: ProductSpecificationProps) {
  const theme = useMantineTheme();
  const [SellerDetailModal, sellerDetailOpened, sellerDetailHandler] = useSellerDetailDrawer();
  const [TechinalSpecificationModal, techinalSpecificationOpened, techinalSpecificationHandler] =
    useTechinalSpecificationDrawer();
  return (
    <div>
      <Title className="uppercase" color={'#656565'} order={6}>
        About Product
      </Title>
      <Title className="font-bold uppercase" size={'40px'} color={'black'} order={3}>
        {title}
      </Title>
      <form>
        <div className="space-y-4">
          <Drawer
            title="Technical Specification"
            children={TechinalSpecificationModal}
            onClose={techinalSpecificationHandler.close}
            open={techinalSpecificationOpened}
          />
          <Button
            onClick={techinalSpecificationHandler.open}
            className="w-full h-24"
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
          <Drawer
            title="Details from seller"
            children={SellerDetailModal}
            onClose={sellerDetailHandler.close}
            open={sellerDetailOpened}
          />
          <Button
            onClick={sellerDetailHandler.open}
            className="w-full h-24"
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

          <Only when={condition === 'Used'}>
            <div className="space-y-5">
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  CONDITION
                </Title>
                <Text size="sm" mt={4}>
                  {sellerCondition}
                </Text>
              </div>
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  Color
                </Title>
                <Text size="sm" mt={4}>
                  {sellerColor}
                </Text>
              </div>
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  Capacity
                </Title>
                <Text size="sm" mt={4}>
                  {sellerCapacity}
                </Text>
              </div>
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  Carrier
                </Title>
                <Text size="sm" mt={4}>
                  {sellerCarrier}
                </Text>
              </div>
            </div>
          </Only>

          <Only when={condition === 'New'}>
            <div className="space-y-5">
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  CONDITION
                </Title>
                <Text size="sm" mt={4}>
                  {condition}
                </Text>
              </div>
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  Color
                </Title>
                <ChipDisplay data={colorData} item={color} />
              </div>
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  Capacity
                </Title>
                <ChipDisplay data={capacityData} item={capacity} />
              </div>
              <div>
                <Title className="uppercase font-[600]" order={6}>
                  Carrier
                </Title>
                <ChipDisplay data={carrierData} item={carrier} />
              </div>
            </div>
          </Only>
        </div>

        <div>
          <Grid>
            <Grid.Col span={6}>
              <BiddingInput title="Lowest Ask" value={169} />
            </Grid.Col>
            <Grid.Col span={6}>
              <BiddingInput title="Highest Offer" value={179} />
            </Grid.Col>
          </Grid>
        </div>

        <div>
          <Grid>
            <Grid.Col span={6}>
              <Button component={NextLink} href="/buying-summary"  size="20px" className="w-full h-16 uppercase font-[200]" bg="black">
                BUY NOW
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button component={NextLink} href="/product-listing" size="20px" className="w-full h-16 uppercase font-[200]" bg="black">
                PLACE OFFER
              </Button>
            </Grid.Col>
            <Grid.Col span={12}>
              <Button component={NextLink} href="/shop" size="16px" className="font-[500] h-12 w-full" bg="#3C82D6">
                Shop used starting at $400
              </Button>
              <Text mt={14} size="md" color="rgba(101, 101, 101, 0.55)">
                {' '}
                First Time buying click to see{' '}
                <Text component="a" size="md" color="black" href="/how-it-works">
                  how it works
                </Text>{' '}
              </Text>
            </Grid.Col>
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
    <div>
      <Chip.Group>
        <Group className="space-x-4">
          {data.map((value, index) => (
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
    </div>
  );
}
