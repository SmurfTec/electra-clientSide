import { useStylesforGlobal } from '@elektra/customComponents';
import {
  Button,
  Chip,
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
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';

export const useCardModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { classes: button } = useStylesforGlobal();
  const theme = useMantineTheme();

  const initialValues = {
    cardType: 'visa',
    cardNo: '',
    cvc: '',
    expiry: '',
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
    console.log(value);
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
    console.log(data);
    return data;
  };

  const Modal = (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          <Grid.Col span={7}>
            <Text className="text-lg mb-4">Choose billing method</Text>
            <Chip.Group defaultValue={'visa'} {...form.getInputProps('cardType', { type: 'checkbox' })}>
              <Group position="apart">
                <Chip
                  color="blue"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                  value="visa"
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image alt="" height={50} width={50} fit="contain" src={'/images/visa.png'} />
                  </Group>
                </Chip>
                <Chip
                  color="blue"
                  value="master"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image alt="" height={50} width={50} fit="contain" src={'/images/master.png'} />
                  </Group>
                </Chip>
                <Chip
                  color="blue"
                  value="discover"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image alt="" height={50} width={50} fit="contain" src={'/images/discover.png'} />
                  </Group>
                </Chip>
                <Chip
                  color="blue"
                  value="paypal"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image alt="" height={50} width={50} fit="contain" src={'/images/paypal.png'} />
                  </Group>
                </Chip>
              </Group>
            </Chip.Group>
            <Paper radius={0} className="mt-4" bg="black">
              <Stack align="flex-start" h={200}>
                <Image
                  alt=""
                  height={50}
                  width={50}
                  sx={{ marginTop: '0.45rem', marginLeft: '1.5rem' }}
                  fit="contain"
                  src={`/images/${form.values.cardType}.png`}
                />
                <Image
                  alt=""
                  height={50}
                  width={50}
                  sx={{ marginTop: '-20px', marginLeft: '1.5rem' }}
                  fit="contain"
                  src={'/images/sim.png'}
                />
                <Text
                  color={'white'}
                  className="text-lg uppercase tracking-wider font-medium"
                  sx={{ marginTop: '-20px', marginLeft: '1.5rem' }}
                >
                  HUZAYFAH HANIF
                </Text>
                <Group position="apart" spacing={35}>
                  <div>
                    <Text
                      color={'white'}
                      className="text-lg uppercase tracking-wider font-medium"
                      sx={{ marginLeft: '1.5rem' }}
                    >
                      {getCardNumber(form.values.cardNo)}
                    </Text>
                    <Text
                      color={'white'}
                      fz="sm"
                      className=" uppercase tracking-wider font-semibold"
                      sx={{ marginLeft: '1.5rem' }}
                    >
                      Card Number
                    </Text>
                  </div>
                  <div>
                    <Text
                      color={'white'}
                      className="text-lg uppercase tracking-wider font-medium"
                      //sx={{ marginLeft: '1.5rem' }}
                    >
                      {getExpiryNumber(form.values.expiry)}
                    </Text>
                    <Text
                      color={'white'}
                      fz="sm"
                      className="uppercase tracking-wider font-semibold"
                      //sx={{ marginLeft: '4.5rem' }}
                    >
                      expiry
                    </Text>
                  </div>
                  <div>
                    <Text
                      color={'white'}
                      className="text-lg uppercase tracking-wider font-medium"
                      // sx={{ marginLeft: '1.5rem' }}
                    >
                      {getCvcNumber(form.values.cvc)}
                    </Text>
                    <Text color={'white'} fz="sm" className=" uppercase tracking-wider font-semibold">
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
          <Grid.Col span={8}>
            <Group className="ml-55 mt-4" spacing={'xl'}>
              <Button onClick={close} className="w-1/3" size={'lg'} classNames={{ root: button.grayButtonRoot }}>
                Cancel
              </Button>
              <Button type="submit" className="w-1/3" size={'lg'}>
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
  checkboxLabel: {
    height: '4.25rem',
    width: '5.25rem',
    borderRadius: 'unset',
  },
  checkboxiconWrapper: {
    display: 'none',
  },
}));
