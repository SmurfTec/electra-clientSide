import { Modal, Only, http, useStylesforGlobal } from '@elektra/customComponents';
import { useEmailVerificationModel } from '@elektra/hooks';
import { RootState, updateUser, useAppDispatch, useSelector } from '@elektra/store';
import { Button, Grid, Group, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { omit } from 'lodash';
import { useState,useEffect } from 'react';
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
  const { user, profile } = useSelector((state: RootState) => state.auth);
  const { classes: button } = useStylesforGlobal();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<{ error: boolean; message: string }>({ error: false, message: '' });
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
      username: (value) => (value === '-' ? null : value.length < 2 ? 'username must have at least 2 letters' : null),
      firstname: (value) => (value.length < 2 ? 'username must have at least 2 letters' : null),
      lastname: (value) => (value.length < 2 ? 'username must have at least 2 letters' : null),
      mobile_no: (value) => (value === '-' ? null : value.length < 11 ? 'username must have at least 11 digits' : null),
    },
  });
  const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({
    email: String(user?.email),
    purpose: 'emailChange',
  });
  const handleFormSubmit = async (values: typeof initialValues) => {
    setError({ error: false, message: '' });
    if (form.isDirty()) {
      setLoading(true);
      let data = values as Partial<typeof initialValues>;
      if (!form.isDirty('mobile_no')) data = omit(data, 'mobile_no');
      if (!form.isDirty('email')) data = omit(data, 'email');
      if (!form.isDirty('firstname')) data = omit(data, 'firstname');
      if (!form.isDirty('lastname')) data = omit(data, 'lastname');
      if (!form.isDirty('username')) data = omit(data, 'username');
      const res = await http.request({
        url: 'users/me',
        method: 'PATCH',
        data: data,
      });
      if (res.isError) {
        setLoading(false);
        setError({ error: true, message: res.errorPayload?.['message'] });
      } else {
        const user = res.data['user'];
        const profile = user['profile'];
        delete user['profile'];
        dispatch(updateUser({ isAuthenticated: true, user, profile }));
        if (!user['is_active']) emailHandler.open();
        setLoading(false);
        setIsEditing(false);
      }
      form.resetDirty();
    } else setIsEditing(false);
  };
  const getuser=async()=>{
    const res = await http.request({
      url: '/users/me',
      method: 'GET',
      
    });
    if(!res.isError){
      const{profile,...restdata}=res.data
    
      const user = restdata
      
  dispatch(updateUser({ isAuthenticated: true, user, profile }));
    }
    
  }
  useEffect(()=>{
    getuser();
  },[])
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
                className="text-sm font-semibold text-black uppercase"
                {...form.getInputProps('firstname')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Last Name"
                placeholder="Enter Last Name"
                className="text-sm text-black font-semibolduppercase"
                {...form.getInputProps('lastname')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Email Address"
                placeholder="Enter Email Address"
                className="text-sm font-semibold text-black uppercase"
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="Phone No"
                placeholder="Enter Phone no"
                className="text-sm font-semibold text-black uppercase"
                {...form.getInputProps('mobile_no')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                disabled={!isEditing}
                classNames={{ input: isEditing ? classes.inputEnabled : classes.inputDisabled }}
                label="User Name"
                placeholder="Enter Username"
                className="text-sm font-semibold text-black uppercase"
                {...form.getInputProps('username')}
              />
            </Grid.Col>
            <Modal title="Email Verfication" children={emailModal} onClose={emailHandler.close} open={emailOpened} />
            {error.error && (
              <Text color="red" className="ml-4 text-sm">
                {error.message}
              </Text>
            )}
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
