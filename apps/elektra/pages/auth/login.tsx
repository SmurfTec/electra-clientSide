import { BottomLine, Logo, RightPanel, SocialButton, TitleHead } from '@elektra/components';
import { Form } from '@elektra/ui';
import { Button, Container, Grid, Group } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Joi from 'joi';
import { useStyles } from './signup';

export default function Login() {
  const { classes } = useStyles();

  //TODO: Need to properly typecast this
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label('Email'),
    password: Joi.string()
      .min(8)
      .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
      .required()
      .label('Password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'object.regex': 'Must have at least 8 characters',
        'string.pattern.base': 'User Password must have at least 8 characters one uppercase and special character',
      }),
  });

  const initialValues: any = {
    email: '',
    password: '',
  };

  return (
    <Grid m={0}>
      <Grid.Col xs={12} sm={5} md={4}>
        <Container className="my-5">
          <Group className="mb-8">
            <Logo />
          </Group>
          <TitleHead title="Log in" description="Login to buy & sell on our platform." />
          <SocialButton title="Login" />
          <div className="mt-10">
            <Form initialValues={initialValues} onFormSubmit={() => console.log('')} schema={schema}>
              <div className="space-y-5">
                <Form.FormField
                  name="email"
                  placeholder="Enter Email"
                  label="EMAIL ADDRESS"
                  classNames={{ input: classes.input }}
                />
                <Form.PasswordField
                  name="password"
                  placeholder="Password Here"
                  label="PASSWORD"
                  classNames={{ input: classes.input, innerInput: classes.innerInput }}
                />
              </div>
              <div className="text-right mt-2">
                <Button className="bg-white hover:bg-white text-slate-300 px-0">Forgot Password ?</Button>
              </div>
              <div className="space-y-4 mt-10">
                <Button className="w-full h-16" href="/auth/login" component={NextLink}>
                  Login
                </Button>
                <Button color="blue" component={NextLink} href={'/auth/signup'} className="w-full h-16">
                  Signup
                </Button>
              </div>
            </Form>
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
