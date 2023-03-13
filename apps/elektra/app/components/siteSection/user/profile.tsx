import { Only, Text, Title } from '@elektra/ui';
import { Button, createStyles, Grid, NumberInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Pencil } from 'tabler-icons-react';

export function Profile() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      userName: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <>
      <div className="mt-6">
        <Stack align="flex-start" justify="space-around" spacing="lg">
          <Only when={!isEditing}>
            <Grid gutter={30} m={0}>
              <Grid.Col xs={4}>
                <Title order={5} color="black">
                  FIRST NAME
                </Title>
                <Text color="black" className="text-lg">
                  Huzafa
                </Text>
              </Grid.Col>
              <Grid.Col xs={4}>
                <Title order={5} color="black">
                  LAST NAME
                </Title>
                <Text color="black" className="text-lg">
                  Hanif
                </Text>
              </Grid.Col>
              <Grid.Col xs={4}>
                <Title order={5} color="black">
                  EMAIL ADDRESS
                </Title>
                <Text color="black" className="text-lg">
                  huzafy@gmail.com
                </Text>
              </Grid.Col>
              <Grid.Col xs={4}>
                <Title order={5} color="black">
                  PHONE NO
                </Title>
                <Text color="black" className="text-lg">
                  4523554555
                </Text>
              </Grid.Col>
              <Grid.Col xs={4}>
                <Title order={5} color="black">
                  USERNAME
                </Title>
                <Text color="black" className="text-lg">
                  Huzafa123455
                </Text>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Button className="mt-6" leftIcon={<Pencil />} onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </Grid.Col>
            </Grid>
          </Only>
          <Only when={isEditing}>
            <form
              onSubmit={form.onSubmit((values) => {
                console.log(values);
              })}
            >
              <Grid gutter={30} m={0}>
                <Grid.Col xs={4}>
                  <TextInput
                    classNames={{ input: classes.inputEnabled }}
                    className="uppercase font-semibold"
                    label="First Name"
                    {...form.getInputProps('firstName')}
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <TextInput
                    classNames={{ input: classes.inputEnabled }}
                    className="uppercase font-semibold"
                    label="Last Name"
                    {...form.getInputProps('lastName')}
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <TextInput
                    classNames={{ input: classes.inputEnabled }}
                    className="uppercase font-semibold"
                    label="Email"
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <NumberInput
                    label="Phone No"
                    hideControls
                    className="uppercase font-semibold"
                    classNames={{ input: classes.inputEnabled }}
                    {...form.getInputProps('phone')}
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <TextInput
                    classNames={{ input: classes.inputEnabled }}
                    className="uppercase font-semibold"
                    label="Username"
                    {...form.getInputProps('userName')}
                  />
                </Grid.Col>

                <Grid.Col xs={12} className='space-x-3'>
                  <Button onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type='submit'>
                    Update
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Only>
        </Stack>
      </div>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    padding: 0,
    margin: 0,
  },
  inputEnabled: {
    borderRadius: 'unset',
    border: '2px solid black',
    height: '45px',
  },
  innerInput: {
    height: '52px',
  },
}));
