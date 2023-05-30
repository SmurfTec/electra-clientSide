import { useStylesforGlobal } from '@elektra/customComponents';
import {
  Button,
  Center,
  Chip,
  clsx,
  createStyles,
  Grid,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';

export const useCardModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { classes: button } = useStylesforGlobal();

  const initialValues = {
    cardType: 'visa',
    cardNo: '',
    cvc: '',
    expiry: '10/22',
    fistName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
  };

  const form = useForm({
    initialValues: initialValues,

    validate: {
      cardNo: (value) => (value.length < 16 ? 'Invalid card number' : null),
    },
  });

  const getCardNumber = (value: string): string => {
    //  const regexp = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    // if(regexp.test(value)){
    //   console.log(true)
    // }
    let data = value.toString();
    while (data.length < 16) {
      data += '0';
    }
    return String(data.match(/.{1,4}/g))
      .toString()
      .replaceAll(',', ' ')
      .substring(0, 19);
  };

  const getCvcNumber = (value: string): string => {
    let data = value.toString();
    while (data.length < 3) {
      data += '0';
    }
    return data;
  };

  const getExpiryNumber = (value: string): string => {
    let data = value.toString();

    return data;
  };

  const phone = useMediaQuery('(max-width: 800px)');

  const Modal = (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          <Grid.Col md={8} lg={8}>
            <Text className="mb-4">Choose billing method</Text>
            <Chip.Group defaultValue={'visa'} {...form.getInputProps('cardType', { type: 'checkbox' })}>
              {/* <Group position="apart"> */}
              <Grid >
                <Grid.Col p={0} span={3}>
                  <Chip
                    color="blue"
                    classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                    value="visa"
                  >
                    <Center sx={{ marginTop: '10px' }}>
                      <Image alt="" height={50} width={50} fit="contain" src={'/images/visa.png'} />
                    </Center>
                  </Chip>
                </Grid.Col>
                <Grid.Col p={0} span={3}>
                  <Chip
                    color="blue"
                    value="master"
                    classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                  >
                    <Center sx={{ marginTop: '10px' }}>
                      <Image alt="" height={50} width={50} fit="contain" src={'/images/master.png'} />
                    </Center>
                  </Chip>
                </Grid.Col>
                <Grid.Col p={0} span={3}>
                  <Chip
                    color="blue"
                    value="discover"
                    classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                  >
                    <Center sx={{ marginTop: '10px' }}>
                      <Image alt="" height={50} width={50} fit="contain" src={'/images/discover.png'} />
                    </Center>
                  </Chip>
                </Grid.Col>
                <Grid.Col p={0} span={3}>
                  <Chip
                    color="blue"
                    value="paypal"
                    classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                  >
                    <Center sx={{ marginTop: '10px' }}>
                      <Image alt="" height={50} width={50} fit="contain" src={'/images/paypal.png'} />
                    </Center>
                  </Chip>
                </Grid.Col>
              </Grid>
              {/* </Group> */}
            </Chip.Group>
            <Paper radius={0} className="mt-4" bg="black">
              <Stack align="flex-start" h={230}>
                <Image
                  alt=""
                  height={50}
                  width={50}
                  sx={{ marginTop: '0.45rem', marginLeft: '1.5rem' }}
                  fit="contain"
                  src={`/images/${form.values.cardType}.png`}
                />
                <Image
                  alt="sim"
                  height={50}
                  width={50}
                  // mt={1}
                  sx={{ marginTop: '-10px', marginLeft: '1.5rem' }}
                  fit="contain"
                  src={'/images/sim.png'}
                />
                <Text
                  color={'white'}
                  className={clsx("uppercase tracking-wider font-medium pt-3",classes.font)}
                  sx={{ marginTop: '-20px', marginLeft: '1.5rem' }}
                  // size={phone ? "13px" : "auto"}
                >
                  HUZAYFAH HANIF
                </Text>
                <Group position="apart" spacing={phone ? 15 : 35}>
                  <div>
                    <Text
                      color={'white'}
                      className={clsx("uppercase tracking-wider font-medium",classes.font)}
                      sx={{ marginLeft: '1.5rem' }}
                    >
                      {getCardNumber(form.values.cardNo)}
                    </Text>
                    <Text
                      color={'white'}
                      
                      className={clsx("uppercase tracking-wider font-medium",classes.font)}
                      sx={{ marginLeft: '1.5rem' }}
                    >
                      Card Number
                    </Text>
                  </div>
                  <div>
                    <Text
                      color={'white'}
                      className={clsx("uppercase tracking-wider font-medium",classes.font)}
                      //sx={{ marginLeft: '1.5rem' }}
                    >
                      {getExpiryNumber(form.values.expiry)}
                    </Text>
                    <Text
                      color={'white'}
                      className={clsx("uppercase tracking-wider font-medium",classes.font)}
                      //sx={{ marginLeft: '4.5rem' }}
                    >
                      expiry
                    </Text>
                  </div>
                  <div>
                    <Text
                      color={'white'}
                      className={clsx("uppercase tracking-wider font-medium",classes.font)}
                      // sx={{ marginLeft: '1.5rem' }}
                    >
                      {getCvcNumber(form.values.cvc)}
                    </Text>
                    <Text
                      color={'white'}
                      className={clsx("uppercase tracking-wider font-medium",classes.font)}
                    >
                      cvc
                    </Text>
                  </div>
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col mb={'-25px'} mt={'10px'} span={12}>
            <Text className="bg-red font-[300]" color={'white'} size="xl">
              Credit Card Info
            </Text>
          </Grid.Col>
          <Grid.Col span={6} mt={'20px'}>
            <NumberInput
              name="cardNo"
              hideControls
              placeholder="Enter Card No"
              classNames={{ input: classes.input }}
              {...form.getInputProps('cardNo')}
              parser={(value) => {
                if (Number(value) > 9999999999999999) {
                  return value.slice(0, value.length - 1);
                }
                return value;
              }}
              formatter={(value) => value}
            />
          </Grid.Col>
          <Grid.Col span={6} mt={'20px'}>
            <NumberInput
              hideControls
              placeholder="CVC"
              classNames={{ input: classes.input }}
              {...form.getInputProps('cvc')}
              parser={(value) => {
                if (Number(value) > 999) {
                  return value.slice(0, value.length - 1);
                }
                return value;
              }}
              formatter={(value) => value}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              placeholder="Expiry Date"
              classNames={{ input: classes.input }}
              {...form.getInputProps('expiry')}
              formatter={(value) =>
                value
                  .replace(
                    /^([1-9]\/|[2-9])$/g,
                    '0$1/' // 3 > 03/
                  )
                  .replace(
                    /^(0[1-9]|1[0-2])$/g,
                    '$1/' // 11 > 11/
                  )
                  .replace(
                    /^([0-1])([3-9])$/g,
                    '0$1/$2' // 13 > 01/3
                  )
                  .replace(
                    /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
                    '$1/$2' // 141 > 01/41
                  )
                  .replace(
                    /^([0]+)\/|[0]+$/g,
                    '0' // 0/ > 0 and 00 > 0
                  )
                  .replace(
                    /[^\d\/]|^[\/]*$/g,
                    '' // To allow only digits and `/`
                  )
                  .replace(
                    /\/\//g,
                    '/' // Prevent entering more than 1 `/`
                  )
              }
            />
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>

          <Grid.Col mb={'-25px'} mt={'10px'} span={12}>
            <Text className="bg-red font-[300]" color={'white'} size="xl">
              Billing Info
            </Text>
          </Grid.Col>
          <Grid.Col span={6} mt={'20px'}>
            <TextInput
              placeholder="Enter First Name (Required)"
              classNames={{ input: classes.input }}
              {...form.getInputProps('fistName')}
            />
          </Grid.Col>
          <Grid.Col span={6} mt={'20px'}>
            <TextInput
              placeholder="Enter Last Name (Required)"
              classNames={{ input: classes.input }}
              {...form.getInputProps('lastName')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              placeholder="Search Address"
              classNames={{ input: classes.input }}
              {...form.getInputProps('address1')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              placeholder="Search Address (Optional)"
              classNames={{ input: classes.input }}
              {...form.getInputProps('address2')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              rightSection={<ChevronDown strokeWidth={3} size="1.2rem" />}
              rightSectionWidth={60}
              placeholder="Country (Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Pakistan', 'India', 'China', 'USA']}
              {...form.getInputProps('country')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              rightSection={<ChevronDown strokeWidth={3} size="1.2rem" />}
              rightSectionWidth={60}
              searchable
              placeholder="State/Province (Required)"
              nothingFound="No options"
              classNames={{ input: classes.input }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Punjab', 'Sindh', 'Balochistan', 'KPK']}
              {...form.getInputProps('state')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              rightSection={<ChevronDown strokeWidth={3} size="1.2rem" />}
              rightSectionWidth={60}
              searchable
              placeholder="City (Required)"
              nothingFound="No options"
              classNames={{ input: classes.input }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Lahore', 'Islamabad', 'Karachi', 'Multan', 'Rawalpindi']}
              {...form.getInputProps('city')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              placeholder="Postal (Required)"
              classNames={{ input: classes.input }}
              {...form.getInputProps('postalCode')}
            />
          </Grid.Col>
          <Grid.Col xs={8}>
            <Group className="ml-55 mt-4" spacing={'xl'}>
              <Button onClick={close} size={'lg'} classNames={{ root: button.grayButtonRoot }}>
                Cancel
              </Button>
              <Button type="submit" size={'lg'}>
                Update
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
  return [Modal, opened, { open, close }];
};
const useStyles = createStyles((theme) => ({
  input: {
    borderRadius: 'unset',
    border: '2px solid black',
    height: '45px',
    backgroundColor: '#F1F1F1',
  },
  description: {
    display: 'inline-block',
    marginLeft: '5px',
  },
  label: {
    fontWeight: 'bold',
  },
  font: {
    fontSize:18,
    [theme.fn.smallerThan(980)]: {
      fontSize:16,
    },
    [theme.fn.smallerThan(400)]: {
      fontSize:12,
    },
  },
  checkboxLabel: {
    height: '4.25rem',
    width: '5.25rem',
    [theme.fn.smallerThan(430)]:{
      width: '4.25rem',
    },
    [theme.fn.smallerThan(361)]:{
      width: '4rem',
    },
    borderRadius: 'unset',
  },
  checkboxiconWrapper: {
    display: 'none',
  },
}));

