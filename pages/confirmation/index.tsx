import { PageTitle, ProductCarousel, ProductDetails } from '@elektra/components';
import { ListItem, Only, Modal } from '@elektra/customComponents';
import { useCardModal } from '@elektra/hooks';
import { Button, Checkbox, Grid, Group, Image, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import { Check } from 'tabler-icons-react';

const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Lorem ipsum dolor sit amet,',
  'No chips or cracks in front or back glass',
  'Mauris id lacus gravida erat rutrum facilisis.',
  'Sed et quam pretium, laoreet metus sed,',
];

export default function Confirmation() {
  const phone = useMediaQuery('(max-width: 600px)');
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const router = useRouter();
  const condition = router.query['condition'] === 'new' ? 'New' : 'Used';
  return (
    <div>
      <PageTitle title="Confirmation" className="mt-14" />
      <Grid>
        <Grid.Col sm={6} mt={50}>
          <Stack align="center" justify="center">
            <Only when={condition !== 'New'}>
              <div className="ml-10">
                <ProductCarousel />
              </div>
            </Only>
            <Only when={condition === 'New'}>
              <Image alt="product image" src="/images/productImage.png" />
            </Only>
          </Stack>
        </Grid.Col>
        <Grid.Col sm={6}>
          <div className="space-y-2 mt-8 xs:mt-auto">
            <Title className="uppercase" color={'#656565'} order={6}>
              About Product
            </Title>
            <Title className="font-bold uppercase" size={phone ? '20px' : '40px'} color={'black'} order={3}>
              IPhone 14 Pro Max
            </Title>
          </div>

          <Group className="space-x-10">
            <div className="mt-2">
              <Text className="text-[13px] font-[500]" color="black">
                My Ask
              </Text>
              <Text className="text-[48px] font-[600]" color="black">
                $168
              </Text>
            </div>
            <div className="mt-2">
              <Text className="text-[13px] font-[500]" color="black">
                After Fee
              </Text>
              <Text className="text-[48px] font-[600]" color="black">
                $190
              </Text>
            </div>
          </Group>

          <div className="space-y-4 mt-4">
            <ProductDetails
              text={'CARD DETAILS'}
              details="3454 **** **** ****"
              iconDisplay={true}
              onClick={cardHandler.open}
            />

            <ProductDetails
              text={'Shipping Address'}
              details="Street abc1, City Abc, USA,45464"
              iconDisplay={true}
              onClick={cardHandler.open}
            />
            <ProductDetails text={'Condition'} details={condition} />

            <Only when={condition === 'Used'}>
              <div>
                <Title className="font-[600]" order={6}>
                  What accessories are included
                </Title>
              </div>
              <Group>

              </Group>
            </Only>
            <ListItem
              className="space-y-4"
              data={description}
              icon={<Check size={20} strokeWidth={2} color={'black'} />}
            />

            <ProductDetails text={'Capacity'} details="128GB" />
            <ProductDetails text={'Carrier'} details="AT&T" />
            <ProductDetails text={'Color'} details="Blue" />

            <Group pt={14} align="top">
              <Checkbox maw={'20%'} styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }} value={'First'} />
              <Text mt={-7} maw={'80%'} size="13px" color="black">
                By Checking this you are confirming your device meets the condition requirments stated above
              </Text>
            </Group>
            <Group mt={14} align="top">
              <Checkbox maw={'20%'} styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }} value={'First'} />
              <Text mt={-7} maw={'80%'} size="13px" color="black">
                You understand you are subject to a <span className="font-[600]">12% cancelation fee</span> if the item
                fails verifcation.
              </Text>
            </Group>
          </div>
          <div className="space-y-2 mt-8">
            <Button
              className="font-[400]"
              uppercase
              fullWidth
              size="xl"
              styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
              bg={'black'}
              component={NextLink}
              href="/buying-summary?type=offer"
            >
              Confirm
            </Button>
            <Button
              className="font-[400]"
              uppercase
              fullWidth
              size="xl"
              styles={{ root: { color: 'black', '&:hover': { color: 'white' } } }}
              bg={'#D9D9D9'}
            >
              Cancel
            </Button>
          </div>
        </Grid.Col>
      </Grid>

      <Modal
        className="mx-0 px-0 xs:mx-10 mb-7 mt-4"
        title={'Buying INFO'}
        titlePosition="left"
        size={900}
        children={CardModal}
        onClose={cardHandler.close}
        open={cardOpened}
      />
    </div>
  );
}
