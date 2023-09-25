import { http } from '@elektra/customComponents';
import { Button, createStyles, Grid, NumberInput, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { ArrowUpRight } from 'tabler-icons-react';

export const ContactUsForm = () => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
    order: 0,
  };
  const form = useForm({
    initialValues,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (data: typeof initialValues) => {
    setLoading(true);
    const res = await http.request({
      url: 'supports',
      method: 'POST',
      data,
    });
    if (res.isError) {
      setLoading(false);
    } else {
      setStatus(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid columns={12}>
        <Grid.Col xs={7}>
          <Grid columns={6} grow>
            <Grid.Col xs={3}>
              <TextInput
                label="First Name"
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('firstname')}
              />
            </Grid.Col>
            <Grid.Col xs={3}>
              <TextInput
                label="Last Name"
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('lastname')}
              />
            </Grid.Col>
            <Grid.Col xs={3}>
              <TextInput
                label="Email"
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col xs={3}>
              <TextInput
                label="Phone No"
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('phone')}
              />
            </Grid.Col>
            <Grid.Col xs={3}>
              <NumberInput
                label="Order No"
                hideControls
                className="uppercase font-semibold"
                classNames={{ input: classes.input }}
                {...form.getInputProps('order')}
              />
            </Grid.Col>
            <Grid.Col xs={3}></Grid.Col>
            <Grid.Col xs={6}>
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
            <Grid.Col xs={2}>
              {status ? (
                <Button className="" color="blue" size={'lg'} uppercase>
                  Message Sent
                </Button>
              ) : (
                <Button type="submit" loading={loading} className="" size={'lg'} uppercase rightIcon={<ArrowUpRight />}>
                  Send Message
                </Button>
              )}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={5}></Grid.Col>
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
