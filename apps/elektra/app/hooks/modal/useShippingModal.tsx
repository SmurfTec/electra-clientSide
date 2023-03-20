import { Button, createStyles, Grid, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { CaretDown } from 'tabler-icons-react';
import { useStylesforGlobal } from '../../components/theme';

export const useShippingChangeModel = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { classes: button } = useStylesforGlobal();

  const initialValues = {
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
              rightSection={<CaretDown  fill='black' size="1rem" />}
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
              rightSection={<CaretDown fill='black'  size="1rem" />}
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
              rightSection={<CaretDown fill='black'  size="1rem" />}
              rightSectionWidth={30}
              label="City"
              className="uppercase"
              description="(Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Lahore', 'Islamabad', 'Karachi', 'Multan','Rawalpindi']}
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
}));
