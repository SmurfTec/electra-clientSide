import { ItemCard } from '@elektra/components';
import { Button, Center, Divider, Group, Image, List, Select, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { CaretDown } from 'tabler-icons-react';

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

export const useOfferModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      days: '',
    },
  });
  const handleSubmit = (code: string) => {
    console.log(code);
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
          searchable
          nothingFound="No options"
          maxDropdownHeight={130}
          zIndex={10}
          data={['7 Days', '14 Days', '21 Days']}
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
  return [Modal, opened, { open, close }];
};

export const useOfferPlaceModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" justify="center" px={10} spacing={0} className="mt-6">
      <div className="w-full space-y-5">
        <ItemCard
          color={productDetailData.color}
          company={productDetailData.company}
          image={productDetailData.image}
          space={productDetailData.space}
          title={productDetailData.title}
          key={productDetailData.title}
        />
        <Divider variant="dashed" />
      </div>
      <div className="w-full space-y-5 mt-5">
        <List type="ordered" icon={<></>}>
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
      <div >
        <Center inline className='space-x-72'>
          <Text className="font-semibold text-black" size={12}>
            View your offers
          </Text>
         
          <Button
            styles={{
              root: {
                borderRadius: 20,
              },
            }}
            variant="outline"
          >
            <Image alt='arrow' fit="contain" src={'/images/carousel/ArrowRight.png'} className="w-full" />
          </Button>
          </Center>
        
      </div>
      <Button mt={50}>CONTINUE EXPLORING</Button>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
