import { BottomLine, Logo, RightPanel, SocialButton, TitleHead } from '@elektra/components';
import { Button, Container, Grid, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextLink } from '@mantine/next';
import { useStyles } from './signup';
import { useRouter } from 'next/router';
import { usePasswordChangeModal } from '@elektra/hooks';
import { Modal } from '@elektra/customComponents';

export default function Login() {
  const { classes } = useStyles();
  const [PasswordChangeModal, passwordOpened, passwordHandler] = usePasswordChangeModal({login:true});
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
const router = useRouter()
  return (
    <Grid m={0}>
      <Grid.Col order={2} orderSm={1} xs={12} sm={5} md={4}>
        <Container className="my-5">
          <Group className="mb-8">
            <Logo />
          </Group>
          <TitleHead title="Log in" description="Login to buy & sell on our platform." />
          <SocialButton title="Login" />
          <div className="mt-10">
            <form onSubmit={form.onSubmit((values) => router.push("/userdashboard"))}>
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
              <div className="text-right -mt-2">
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
                  onClick={passwordHandler.open}
                >
                  Forgot Password ?
                </Button>
              </div>
              <div className="space-y-4 mt-10">
                <Button type="submit" className="w-full h-16 font-medium text-base"   uppercase>
                  Login
                </Button>
                <Button color="blue" uppercase component={NextLink} href={'/auth/signup'} className="w-full h-16  text-base font-medium">
                  Signup
                </Button>
              </div>
            </form>
          </div>
          <BottomLine />
        </Container>
      </Grid.Col>
      <Modal
          title="Changing Password"
          children={PasswordChangeModal }
          onClose={passwordHandler.close}
          open={passwordOpened}
        />
      <Grid.Col order={1} orderSm={2} xs={12} sm={7} md={8} className={classes.wrapper}>
        <RightPanel />
      </Grid.Col>
    </Grid>
  );
}
