import { Drawer, Only } from '@elektra/customComponents';
import { useSellerDetailDrawer, useTechinalSpecificationDrawer } from '@elektra/hooks';
import { Button, Checkbox, Chip, Grid, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { ChevronRight, Heart } from 'tabler-icons-react';
import { BiddingInput } from '../../inputs';

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
  scrollIntoView?: ({ alignment }?: any | undefined) => void;
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
  scrollIntoView,
}: ProductSpecificationProps) {
  const theme = useMantineTheme();
  const [SellerDetailModal, sellerDetailOpened, sellerDetailHandler] = useSellerDetailDrawer();
  const [TechinalSpecificationModal, techinalSpecificationOpened, techinalSpecificationHandler] =
    useTechinalSpecificationDrawer();

  const phone = useMediaQuery('(max-width: 600px)');
  return (
    <div>
      <div className="space-y-2 ">
        <Title className="uppercase" color={'#656565'} order={6}>
          About Product
        </Title>
        <Group position="apart" align="center">
          <Title className="font-bold uppercase" size={phone ? '20px' : '30px'} color={'black'} order={3}>
            {title}
          </Title>
          <span className="bg-[#D9E2E98F] rounded-2xl w-8 h-8 relative">
            <Heart className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </span>
        </Group>
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
          <Only when={condition !== 'New'}>
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
            <div className="space-y-3">
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

        {/* <div> */}
        <Grid m={'calc(-1.25rem / 2)'}>
          <Grid.Col span={6}>
            <BiddingInput title="Lowest Ask" value={169} />
          </Grid.Col>
          <Grid.Col span={6}>
            <BiddingInput title="Highest Offer" value={179} />
          </Grid.Col>
        </Grid>
        {/* </div> */}

        <div>
          <Grid m={'calc(-1.25rem / 2)'}>
            <Grid.Col span={6}>
              <Button
                component={NextLink}
                href={condition === 'New' ? '/buy-offer?condition=new' : '/buy-offer'}
                size={phone ? '16px' : '20px'}
                className="w-full h-10 uppercase font-[200]"
                bg="black"
              >
                BUY NOW
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                component={NextLink}
                href={condition === 'New' ? '/place-offer?condition=new' : '/place-offer'}
                size={phone ? '16px' : '20px'}
                className="w-full h-10 uppercase font-[200]"
                bg="black"
              >
                PLACE OFFER
              </Button>
            </Grid.Col>
            <Grid.Col span={12} className='mt-[-15px]'>
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
                Shop used starting at $400
              </Button>
           
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
    
  );
}
