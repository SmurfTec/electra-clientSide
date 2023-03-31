import { Button, createStyles, Grid, NumberInput, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ArrowUpRight } from 'tabler-icons-react';

export const ContactUsForm = () => {
  const { classes } = useStyles();
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
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Grid columns={12}>
        <Grid.Col span={7}>
          <Grid columns={6} grow>
            <Grid.Col span={3}>
              <TextInput
                label="First Name"
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('firstName')}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                label="Last Name"
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('lastName')}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                label="Email"
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="Phone No"
                hideControls
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('phone')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Textarea
                label="Message"
                className="uppercase font-semibold"
                styles={{
                  input: {
                    borderRadius: 'unset',
                    border: '1px solid black',
                    height: '180px',
                  },
                }}
                {...form.getInputProps('message')}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Button type="submit" className='w-1/2' size={'lg'} uppercase rightIcon={<ArrowUpRight />}>
                Send Message
              </Button>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={5}></Grid.Col>
      </Grid>
    </form>
  );
};

const useStyles = createStyles((theme) => ({
  input: {
    borderRadius: 'unset',
    border: '1px solid black',
    height: '52px',
    width: '100%',
  },
}));
