import { Button, createStyles, Grid, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

export const useShippingChangeModel = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

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
    <div className="p-5">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              className="uppercase"
              label="Address#1"
              description="(Required)"
              classNames={{ input: classes.input }}
              {...form.getInputProps('address1')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              className="uppercase"
              label="Address#2"
              classNames={{ input: classes.input }}
              description="(Optinal)"
              {...form.getInputProps('address2')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              className="uppercase"
              classNames={{ input: classes.input }}
              label="Country"
              {...form.getInputProps('country')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              className="uppercase"
              classNames={{ input: classes.input }}
              label="State/Province"
              {...form.getInputProps('state')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              className="uppercase"
              classNames={{ input: classes.input }}
              label="City"
              {...form.getInputProps('city')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              className="uppercase"
              classNames={{ input: classes.input }}
              label="Postal Code"
              {...form.getInputProps('postalCode')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Group className='ml-55' spacing={'xl'}>
              <Button
                onClick={close}
                className='w-1/3'
                styles={{
                  root: {
                    backgroundColor: 'rgba(180, 180, 180, 0.47)',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'rgba(180, 180, 180, 0.47)',
                      color: 'white',
                    },
                  },
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className='w-1/3'>Update</Button>
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
}));
