import { BottomLine, Logo, RightPanel, SocialButton, TitleHead } from '@elektra/components';
import { Modal, http, isAuthenticated } from '@elektra/customComponents';
import { useEmailVerificationModel, usePasswordChangeModal } from '@elektra/hooks';
import { login, useAppDispatch } from '@elektra/store';
import { Button, Container, Grid, Group, LoadingOverlay, PasswordInput, ScrollArea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStyles } from './signup';
import { setCookie } from 'cookies-next';

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (isAuth) {
    return { redirect: { permanent: false, destination: '/userdashboard' } };
  }
  return { props: {} };
}

export default function Login() {
  const { classes } = useStyles();
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };
  const form = useForm({
    initialValues: initialValues,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  useEffect(() => {
    router.prefetch('/userdashboard');
  }, [router]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const [EmailModal, emailOpened, emailHandler] = useEmailVerificationModel({
    email: form.values.email,
    purpose: 'passwordChange',
  });
  const phone = useMediaQuery('(max-width: 600px)');
  const handleLoginSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const res = await http.request({
      url: 'auth/login',
      data: values,
      method: 'POST',
    });
    if (res.isError) {
      form.setErrors({
        email: res.errorPayload?.['message'] ?? 'Invalid email or password',
        password: res.errorPayload?.['message'] ?? 'Invalid email or password',
      });
      setLoading(false);
    } else {
      const user = res.data['user'];
      const profile = user['profile'];
      const is_stripe_account = user['is_stripe_account'];
      delete user['profile'];
      const authToken = String(res.data['authentication']);
      const refreshToken = String(res.data['refresh']);
      setCookie('authentication', authToken);
      setCookie('refresh', refreshToken);
      dispatch(login({ isAuthenticated: true, user, profile, is_stripe_account }));
      const targetUrl: any = router.query.targetUrl || '/userdashboard/?tab=settings';
      router.push(targetUrl);
      setLoading(false);
    }
  };
  const handleForgetPassword = async () => {
    const { hasError } = form.validateField('email');
    if (!hasError) {
      setLoading(true);
      const { email } = form.values;
      const res = await http.request({
        url: 'auth/forgot-password',
        data: { email },
        method: 'POST',
      });
      if (res.isError) {
        form.setErrors({
          email: res.errorPayload?.['message'] ?? 'user not found',
        });
        setLoading(false);
      } else {
        emailHandler.open();
        setLoading(false);
      }
    }
  };
  return (
    <Grid m={0}>
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
            <Group className="mb-8">
              <Logo />
            </Group>
            <TitleHead title="Log in" description="Login to buy & sell on our platform." />
            <SocialButton title="Login" setLoading={setLoading} />
            <div className="mt-10">
              <form onSubmit={form.onSubmit(handleLoginSubmit)}>
                <div className="space-y-5">
                  <TextInput
                    placeholder="Enter Email"
                    label="EMAIL ADDRESS"
                    classNames={{ input: classes.input }}
                    {...form.getInputProps('email')}
                  />
                  <PasswordInput
                    placeholder="Password Here"
                    label="PASSWORD"
                    classNames={{ input: classes.input, innerInput: classes.innerInput }}
                    {...form.getInputProps('password')}
                  />
                </div>
                <div className="-mt-2 text-right">
                  <Button
                    styles={{
                      root: {
                        padding: 'unset',
                        border: 'unset',
                        borderRadius: 'unset',
                      },
                      inner: {
                        color: '#B4B4B4',
                        background: 'white',
                      },
                    }}
                    onClick={handleForgetPassword}
                  >
                    Forgot Password ?
                  </Button>
                </div>
                <div className="mt-10 space-y-4">
                  <Button type="submit" className="w-full h-16 text-base font-medium" uppercase>
                    Login
                  </Button>
                  <Button
                    color="blue"
                    uppercase
                    component={NextLink}
                    href={'/auth/signup'}
                    className="w-full h-16 text-base font-medium"
                  >
                    Signup
                  </Button>
                </div>
              </form>
            </div>
            <BottomLine />
          </Container>
        </ScrollArea>
      </Grid.Col>
      <Modal title="Email Verfication" children={EmailModal} onClose={emailHandler.close} open={emailOpened} />
      <Grid.Col order={1} orderSm={2} xs={12} sm={7} md={8} className={classes.wrapper}>
        <RightPanel />
      </Grid.Col>
    </Grid>
  );
}
