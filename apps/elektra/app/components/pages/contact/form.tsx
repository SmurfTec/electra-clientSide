import { Button, Grid, NumberInput, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ArrowUpRight } from 'tabler-icons-react';
import { useStylesforInput } from '../../theme';

export const ContactUsForm = () => {
  const { classes } = useStylesforInput();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form className="mr-1/2" onSubmit={form.onSubmit((values) => console.log(values))}>
      <Grid columns={2} grow>
        <Grid.Col span={1}>
          <TextInput
            label="First Name"
            className="uppercase font-semibold"
            classNames={{ input: classes.input }}
            {...form.getInputProps('firstName')}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput
            label="Last Name"
            className="uppercase font-semibold"
            classNames={{ input: classes.input }}
            {...form.getInputProps('lastName')}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput
            label="Email"
            className="uppercase font-semibold"
            classNames={{ input: classes.input }}
            {...form.getInputProps('email')}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput
            label="Phone No"
            hideControls
            className="uppercase font-semibold"
            classNames={{ input: classes.input }}
            {...form.getInputProps('phone')}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Textarea
            label="Message"
            className="uppercase font-semibold"
            styles={{
              input: {
                borderRadius: 'unset',
                border: '1px solid black',
                height: '180px',
                width: '900px',
              },
            }}
            {...form.getInputProps('message')}
          />
        </Grid.Col>
        <Grid.Col>
          <Button type="submit" className="w-1/4" size={'lg'} uppercase rightIcon={<ArrowUpRight />}>
            Send Message
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};
