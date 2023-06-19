import { Only, http, useStylesforGlobal } from '@elektra/customComponents';
import { RootState, updateUser, useAppDispatch, useSelector } from '@elektra/store';
import { Button, Grid, Group, Stack, TextInput, createStyles } from '@mantine/core';
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


export function Profile() {
  const { classes } = useStyles();
  const { user, profile } = useSelector((state: RootState) => state.entities.auth);
  const { classes: button } = useStylesforGlobal();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const initialValues = {
    firstname: profile?.firstname ?? '-',
    lastname: profile?.lastname ?? '-',
    email: user?.email ?? '-',
    mobile_no: profile?.mobile_no ?? '-',
    username: profile?.username ?? '-',
  };
  const form = useForm({
    initialValues: initialValues,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    if (user?.email === values.email) {
      const res = await http.request({
        url: 'users/me',
        method: 'PATCH',
        data: values,
      });
      if (res.isError) {
        setLoading(false)
      } else {
        const user = res.data['user'];
        const profile = user['profile'];
        delete user['profile'];
        dispatch(updateUser({ isAuthenticated: true, user, profile }));
        setLoading(false)
        setIsEditing(false)

      }
    }
  };
  // const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({ email: 'dummy@example.com' });

  return (
    <div className="m-0">
      {/* <Modal title="Email Verification" children={emailModal} onClose={emailHandler.close} open={emailOpened} /> */}
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
                {...form.getInputProps('firstname')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Last Name"
                placeholder="Enter Last Name"
                className="text-black text-sm font-semibolduppercase"
                {...form.getInputProps('lastname')}
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
                {...form.getInputProps('mobile_no')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="User Name"
                placeholder="Enter Username"
                className="text-black text-sm font-semibold uppercase"
                {...form.getInputProps('username')}
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
                    disabled={loading}
                    onClick={() => setIsEditing(false)}
                    classNames={{ root: button.grayButtonRoot }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" loading={loading}>
                    Update
                  </Button>
                </Group>
              </Only>
            </Grid.Col>
          </Grid>
        </form>
      </Stack>
    </div>
  );
}
