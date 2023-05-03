import { BottomLine, Logo, RightPanel, SocialButton, TitleHead } from '@elektra/components';
import { Modal } from '@elektra/customComponents';
import { useEmailVerificationModel } from '@elektra/hooks';
import { Button, Container, Grid, Group, PasswordInput, Text, TextInput, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextLink } from '@mantine/next';

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

export default function Signup() {
  const { classes } = useStyles();

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  const form = useForm({
    initialValues: initialValues,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({email:'dummy@example.com'});
  return (
    <Grid m={0}>
      <Modal
         
         children={emailModal}
         onClose={emailHandler.close}
         open={emailOpened}
       />
      <Grid.Col xs={12} sm={5} md={4}>
        <Container className="my-5">
          <Group className="mb-10">
            <Logo />
          </Group>
          <TitleHead title="Signup" description="Signup and explore the best products." />
          <SocialButton title="Signup" />
          <div className="mt-10">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <div className="space-y-5">
                <TextInput
                  placeholder="First Name"
                  label="FIRST NAME"
                  classNames={{ input: classes.input }}
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  placeholder="Last Name"
                  label="LAST NAME"
                  classNames={{ input: classes.input }}
                  {...form.getInputProps('lastName')}
                />
                <TextInput
                  placeholder="Email"
                  label="EMAIL ADDRESS"
                  classNames={{ input: classes.input }}
                  {...form.getInputProps('email')}
                />
                <PasswordInput
                  placeholder="Password"
                  label="PASSWORD"
                  classNames={{ input: classes.input, innerInput: classes.innerInput }}
                  {...form.getInputProps('password')}
                />
              </div>
              <div className="text-right mt-1">
                <Text size={'sm'}>Password Length must be between 6-15</Text>
              </div>
              <div className="space-y-4 mt-10">
                <Button type="submit" onClick={emailHandler.open} className="w-full h-16 font-medium text-base" uppercase>
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
      </Grid.Col>
      <Grid.Col xs={12} sm={7} md={8} className={classes.wrapper}>
        <RightPanel />
      </Grid.Col>
    </Grid>
  );
}
