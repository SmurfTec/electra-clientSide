import { Only } from '@elektra/ui';
import { Button, createStyles, Grid, Group, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Pencil } from 'tabler-icons-react';

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
  inputDisabled: {
    borderRadius: 'unset',
    border: 'none',
    padding: '0',
    fontSize: '16px',
    opacity: '1 !important',
    color: 'black !important',
    backgroundColor: 'white !important',
    margin: '0',
    marginTop: '-5px',
    height: '45px',
    cursor: 'unset !important',
  },
  innerInput: {
    height: '52px',
  },
}));

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
};

export function Profile() {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    firstName: 'Huzayfah',
    lastName: 'Hanif',
    email: 'huzayfahhanif@gmail.com',
    phone: '-',
    username: '3423vc',
  };
  const form = useForm({
    initialValues: initialValues,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleFormSubmit = (values: Profile) => {
    console.log(values);
  };

  return (
    <div className="m-0">
      <Stack align="flex-start" justify="space-around" spacing="lg">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Grid gutter={30} m={0}>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="First Name"
                placeholder="Enter First Name"
                className="font-bold uppercase"
                {...form.getInputProps('firstName')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Last Name"
                placeholder="Enter Last Name"
                className="font-bold uppercase"
                {...form.getInputProps('lastName')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Email Address"
                placeholder="Enter Email Address"
                className="font-bold uppercase"
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Phone No"
                placeholder="Enter Phone no"
                className="font-bold uppercase"
                {...form.getInputProps('phone')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="User Name"
                placeholder="Enter Username"
                className="font-bold uppercase"
                {...form.getInputProps('lastName')}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Only when={!isEditing}>
                <Button leftIcon={<Pencil />} onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </Only>
              <Only when={isEditing}>
                <Group>
                  <Button
                    onClick={() => setIsEditing(false)}
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
                  <Button type="submit">Update</Button>
                </Group>
              </Only>
            </Grid.Col>
          </Grid>
        </form>
      </Stack>
    </div>
  );
}
