import { useStylesforGlobal } from '@elektra/components';
import { Button, Chip, createStyles, Grid, Group, Image, Paper, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { CaretDown } from 'tabler-icons-react';

export const useCardModel = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { classes: button } = useStylesforGlobal();

  const initialValues = {
    cardType: 'visa',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
  };

  const form = useForm({
    initialValues: initialValues,

    validate: {},
  });


  const Modal = (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          <Grid.Col span={7}>
            <Text className="text-lg mb-4">Choose billing method</Text>
            <Chip.Group defaultValue={'visa'}  {...form.getInputProps('cardType', { type: 'checkbox' })}  >
              <Group position="left">
                <Chip
                  color="blue"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                  value="visa"
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image height={50} width={50} fit="contain" src={'/images/visa.png'} />
                  </Group>
                </Chip>
                <Chip
                  color="blue"
                  value="master"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image height={50} width={50} fit="contain" src={'/images/master.png'} />
                  </Group>
                </Chip>
                <Chip
                  color="blue"
                  value="discover"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image height={50} width={50} fit="contain" src={'/images/discover.png'} />
                  </Group>
                </Chip>
                <Chip
                  color="blue"
                  value="paypal"
                  classNames={{ label: classes.checkboxLabel, iconWrapper: classes.checkboxiconWrapper }}
                >
                  <Group position="center" sx={{ marginTop: '10px' }}>
                    <Image height={50} width={50} fit="contain" src={'/images/paypal.png'} />
                  </Group>
                </Chip>
              </Group>
            </Chip.Group>

            <Paper radius={0} className="mt-4" bg="black">
              <Stack align="flex-start" h={200}>
                <Image
                  height={50}
                  width={50}
                  sx={{ marginTop: '0.45rem', marginLeft: '1.5rem' }}
                  fit="contain"
                  src={`/images/${form.values.cardType}.png`}
                />
                <Image
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
                <Group spacing={'xl'}>
                  <Text
                    color={'white'}
                    className="text-lg uppercase tracking-wider font-medium"
                    sx={{ marginLeft: '1.5rem' }}
                  >
                    0000 0000 0000 0000
                  </Text>
                  <Text
                    color={'white'}
                    className="text-lg uppercase tracking-wider font-medium"
                    sx={{ marginLeft: '1.5rem' }}
                  >
                    -/-
                  </Text>
                  <Text
                    color={'white'}
                    className="text-lg uppercase tracking-wider font-medium"
                    sx={{ marginLeft: '1.5rem' }}
                  >
                    000
                  </Text>
                </Group>
                <Group sx={{ marginTop: '-18px' }} spacing={55}>
                  <Text
                    color={'white'}
                    fz="sm"
                    className=" uppercase tracking-wider font-semibold"
                    sx={{ marginLeft: '1.5rem' }}
                  >
                    Card Number
                  </Text>
                  <Text
                    color={'white'}
                    fz="sm"
                    className="uppercase tracking-wider font-semibold"
                    sx={{ marginLeft: '4.5rem' }}
                  >
                    expiry
                  </Text>
                  <Text color={'white'} fz="sm" className=" uppercase tracking-wider font-semibold">
                    cvc
                  </Text>
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              className="uppercase"
              label="Address#1"
              description="(Required)"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              {...form.getInputProps('address1')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              className="uppercase"
              label="Address#2"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              description="(Optional)"
              {...form.getInputProps('address2')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              rightSection={<CaretDown fill="black" size="1rem" />}
              rightSectionWidth={30}
              className="uppercase"
              label="Country"
              description="(Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Pakistan', 'India', 'China', 'USA']}
              {...form.getInputProps('country')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              rightSection={<CaretDown fill="black" size="1rem" />}
              rightSectionWidth={30}
              label="State/Province"
              className="uppercase"
              description="(Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Punjab', 'Sindh', 'Balochistan', 'KPK']}
              {...form.getInputProps('state')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              rightSection={<CaretDown fill="black" size="1rem" />}
              rightSectionWidth={30}
              label="City"
              className="uppercase"
              description="(Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Lahore', 'Islamabad', 'Karachi', 'Multan', 'Rawalpindi']}
              {...form.getInputProps('city')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              className="uppercase"
              description="(Required)"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              label="Postal Code"
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
