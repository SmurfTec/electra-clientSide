import { ItemCard } from '@elektra/components';
import { Modal as ProductModal } from '@elektra/customComponents';
import { Variant } from '@elektra/types';
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  Image,
  List,
  NumberInput,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCounter, useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { CaretDown, Minus, Plus } from 'tabler-icons-react';

const productDetailData = {
  image: '/images/product.png',
  title: 'Iphone 14 Pro Max',
  space: '128 GB',
  color: 'Black',
  company: 'AT&T',
  condition: 'New',
  expiration: '23/10/2023',
  cardDetails: '3646 **** **** ****',
  address: '16 Street , Town Abc, City, USA , 213434',
  saleDate: '23/10/2023',
};

export type OfferModalProductProps = {
  image: string;
  title: string;
  productVariant: Variant[];
  condition: string;
  expiration: string;
  cardDetails: string;
  address: string;
  saleDate: string;
};

export const useOfferModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }, string] => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      days: '',
    },
  });
  const handleSubmit = (code: string) => {
   
  };
  const Modal = (
    <Stack align="center" spacing="xl" className="mt-6">
      <Text size="sm" className="font-semibold">
        Update Offer Expiration Date
      </Text>
      <form onSubmit={form.onSubmit(({ days }) => handleSubmit(days))}>
        <Select
          className="w-[100%] mr-20"
          size="lg"
          rightSection={<CaretDown fill="black" size="1rem" />}
          rightSectionWidth={30}
          withinPortal
          searchable
          nothingFound="No options"
          maxDropdownHeight={130}
          zIndex={10000}
          data={[{label:'7 Days', value: "7"}, {label:'14 Days', value: "14"}, {label:'21 Days', value: "21"}]}
          styles={{
            input: {
              borderRadius: 'unset',
              border: '1px solid black',
            },
          }}
          {...form.getInputProps('days')}
        />
        <div className="text-center mt-4">
          <Button type="submit" uppercase>
            Add
          </Button>
        </div>
      </form>
    </Stack>
  );
  return [Modal, opened, { open, close }, form.values.days];
};

export const useOfferPlaceModal = (
  productDetailData: OfferModalProductProps
): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" justify="center" px={10} spacing={0} className="mt-4">
      <div className="w-full space-y-5">
        <ItemCard
          productVariants={productDetailData?.productVariant || []}
          image={productDetailData?.image}
          title={productDetailData?.title}
          key={productDetailData?.title}
        />
        <Divider variant="dashed" />
      </div>
      <div className="w-full space-y-5 mt-5">
        <List size={12} type="ordered" icon={<></>}>
          <Text className="ml-3 uppercase text-black font-semibold" size={12}>
            Note
          </Text>
          <List.Item>
            <strong>1 -</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </List.Item>
          <List.Item>
            <strong>2 -</strong> Quisque ornare consectetur dolor vitae facilisis. Maecenas ac nisi nulla. Aenean ac
            accumsan mi.{' '}
          </List.Item>
          <List.Item>
            <strong>3 -</strong>To start development server run npm start command
          </List.Item>
          <List.Item>
            <strong>4 -</strong> Run tests to make sure your changes do not break the build
          </List.Item>
          <List.Item>
            <strong>5 -</strong> Submit a pull request once you are done
          </List.Item>
        </List>
        <Divider variant="dashed" />
      </div>
      <Group position="apart" className="w-full" mt={10}>
        {/* <Center> */}
        <Text className="font-semibold text-black" size={12}>
          View your offers
        </Text>

        <Button
          component={NextLink}
          href="/userdashboard?tab=purchasing"
          styles={{
            root: {
              borderRadius: 20,
            },
          }}
          variant="outline"
        >
          <Image alt="right arrow" fit="contain" src={'/images/carousel/ArrowRight.png'} className="w-full" />
        </Button>
        {/* </Center> */}
      </Group>
      <Button component={NextLink} href="/shop" mt={40}>
        CONTINUE EXPLORING
      </Button>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};

export const useOfferEditModal = (
  productDetailData: OfferModalProductProps
): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal(productDetailData);
  const [count, handlers] = useCounter(0, { min: 0 });
  const Modal = (
    <Stack align="center" justify="center" px={10} spacing={0} className="mt-4">
      <div className="w-full space-y-5">
        <div className="ml-7 md:ml-16">
          <ItemCard
            // color={productDetailData.color}
            // company={productDetailData.company}
            image={productDetailData?.image}
            productVariants={[]}
            // space={productDetailData.space}
            title={productDetailData?.title}
            key={productDetailData?.title + productDetailData?.image}
          />
        </div>
        <Divider variant="dashed" />
      </div>
      <ProductModal
        title={'Offer Placed!'}
        children={OfferPlaceModal}
        onClose={offerPlaceHandler.close}
        open={offerPlaceOpened}
      />
      <Text className="text-sm font-medium mt-5">Type your new offer here</Text>
      <Group position="center" spacing={0} className="mt-6 py-4 px-8 border-solid border-2 border-black">
        <ActionIcon component="button" size="lg" color="dark" radius={0} variant="filled" onClick={handlers.decrement}>
          <Minus size={16} color="white" />
        </ActionIcon>
        <NumberInput
          hideControls
          value={count}
          maw={150}
          onChange={handlers.set}
          styles={{
            input: {
              border: 'unset',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          }}
        />
        <ActionIcon component="button" size="lg" radius={0} color="dark" variant="filled" onClick={handlers.increment}>
          <Plus size={16} color="white" />
        </ActionIcon>
      </Group>
      <Center className="space-x-5 mt-5">
        <Button
          styles={{
            root: {
              width: 140,
            },
          }}
          bg="rgba(222, 222, 222, 1)"
        >
          CANCEL
        </Button>
        <Button
          styles={{
            root: {
              width: 140,
            },
          }}
          onClick={offerPlaceHandler.open}
        >
          DONE
        </Button>
      </Center>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
