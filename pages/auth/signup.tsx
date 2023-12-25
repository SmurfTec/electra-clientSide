import { BottomLine, Logo, RightPanel, SocialButton, TitleHead } from '@elektra/components';
import { Modal, http, isAuthenticated } from '@elektra/customComponents';
import { useEmailVerificationModel } from '@elektra/hooks';
import { RootState, login, useAppDispatch, useSelector } from '@elektra/store';
import {
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  PasswordInput,
  ScrollArea,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { NextPageContext } from 'next';
import { useState } from 'react';

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (isAuth) {
    return { redirect: { permanent: false, destination: '/userdashboard' } };
  }
  return { props: {} };
}

export default function Signup() {
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  };
  const form = useForm({
    initialValues: initialValues,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be atleast 6 characters' : null),
      firstname: (value) => (value.length < 2 ? 'Firstname must be atleast 2 characters' : null),
      lastname: (value) => (value.length < 2 ? 'Lastname must be atleast 2 characters' : null),
    },
  });

  const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({
    email: form.values.email,
    purpose: 'signup',
  });
  const handleSignupSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const res = await http.request({
      url: 'auth/signup',
      data: values,
      method: 'POST',
    });

    if (res.isError) {
      form.setErrors({
        email: res.errorPayload?.['message'] ?? 'No recipients defined',
      });
      setLoading(false);
    } else {
      setLoading(false);
      emailHandler.open();
    }
  };
  const phone = useMediaQuery('(max-width: 600px)');

  return (
    <Grid m={0}>
      <Modal
        title="Email Verification"
        children={emailModal}
        onClose={emailHandler.close}
        open={emailOpened}
        closeOnClickOutside={false}
        closeOnEscape={false}
      />
      <Grid.Col order={2} orderSm={1} xs={12} sm={5} md={4}>
        <ScrollArea
          h={phone ? 'auto' : '100vh'}
          styles={{
            scrollbar: {
              '&[data-orientation="vertical"]': { marginRight: '-5px !important' },
            },
          }}
        >
          <LoadingOverlay visible={loading} />
          <Container className="my-5">
            <Group className="mb-10">
              <Logo />
            </Group>
            <TitleHead title="Signup" description="Signup and explore the best products." />
            <SocialButton title="Signup" setLoading={setLoading} />
            <div className="mt-10">
              <form onSubmit={form.onSubmit(handleSignupSubmit)}>
                <div className="space-y-5">
                  <TextInput
                    placeholder="First Name"
                    label="FIRST NAME"
                    classNames={{ input: classes.input }}
                    {...form.getInputProps('firstname')}
                    error={form.errors.firstname}
                  />
                  <TextInput
                    placeholder="Last Name"
                    label="LAST NAME"
                    classNames={{ input: classes.input }}
                    {...form.getInputProps('lastname')}
                    error={form.errors.lastname}
                  />
                  <TextInput
                    placeholder="Email"
                    label="EMAIL ADDRESS"
                    classNames={{ input: classes.input }}
                    {...form.getInputProps('email')}
                    error={form.errors.email}
                  />
                  <PasswordInput
                    placeholder="Password"
                    label="PASSWORD"
                    classNames={{ input: classes.input, innerInput: classes.innerInput }}
                    {...form.getInputProps('password')}
                    error={form.errors.password}
                  />
                </div>
                <div className="text-right mt-1">
                  <Text size={'sm'}>Password Length must be between 6-15</Text>
                </div>
                <div className="space-y-4 mt-10">
                  <Button type="submit" className="w-full h-16 font-medium text-base" uppercase>
                    SignUp
                  </Button>
                  <Button
                    className="w-full h-16 font-medium text-base"
                    color="blue"
                    href="/auth/login"
                    uppercase
                    component={NextLink}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
            <BottomLine />
          </Container>
        </ScrollArea>
      </Grid.Col>
      <Grid.Col order={1} orderSm={2} xs={12} sm={7} md={8} className={classes.wrapper}>
        <RightPanel />
      </Grid.Col>
    </Grid>
  );
}

export const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    padding: 0,
    margin: 0,
  },
  input: {
    borderRadius: 'unset',
    border: '1px solid black',
    height: '52px',
  },
  innerInput: {
    height: '52px',
  },
}));
