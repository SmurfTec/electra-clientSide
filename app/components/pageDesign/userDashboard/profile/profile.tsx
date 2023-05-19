import { Modal, Only, useStylesforGlobal } from '@elektra/customComponents';
import { useEmailSentModal, useEmailVerificationModel } from '@elektra/hooks';
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
  const { classes: button } = useStylesforGlobal();
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
  const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({email:'dummy@example.com'});

  return (
    <div className="m-0">
      <Modal
      title="Email Verification"
         children={emailModal}
         onClose={emailHandler.close}
         open={emailOpened}
       />
      <Stack align="flex-start" justify="space-around" spacing="lg">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Grid gutter={30} m={0}>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="First Name"
                placeholder="Enter First Name"
                className="text-black text-sm font-semibold uppercase"
                {...form.getInputProps('firstName')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Last Name"
                placeholder="Enter Last Name"
                className="text-black text-sm font-semibolduppercase"
                {...form.getInputProps('lastName')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Email Address"
                placeholder="Enter Email Address"
                className="text-black text-sm font-semibold uppercase"
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Phone No"
                placeholder="Enter Phone no"
                className="text-black text-sm font-semibold uppercase"
                {...form.getInputProps('phone')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="User Name"
                placeholder="Enter Username"
                className="text-black text-sm font-semibold uppercase"
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
                  <Button onClick={() => setIsEditing(false)} classNames={{ root: button.grayButtonRoot }}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={emailHandler.open}>Update</Button>
                </Group>
              </Only>
            </Grid.Col>
          </Grid>
        </form>
      </Stack>
    </div>
  );
}
