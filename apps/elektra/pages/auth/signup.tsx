import { BottomLine, Logo, RightPanel, SocialButton, TitleHead } from '@elektra/components';
import { Form } from '@elektra/ui';
import { Button, Container, createStyles, Grid, Group } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Joi from 'joi';

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

  //TODO: Need to properly typecast this
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
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
    firstName: '',
    lastName: '',
    password: '',
  };

  return (
    <Grid m={0}>
      <Grid.Col xs={12} sm={5} md={4}>
        <Container className="my-5">
          <Group className="mb-10">
            <Logo />
          </Group>
          <TitleHead title="Signup" description="Signup and explore the best products." />
          <SocialButton title="Signup" />
          <div className="mt-10">
            <Form initialValues={initialValues} onFormSubmit={() => console.log('hey')} schema={schema}>
              <div className="space-y-5">
                <Form.FormField
                  name="firstName"
                  placeholder="First Name"
                  label="FIRST NAME"
                  classNames={{ input: classes.input }}
                />
                <Form.FormField
                  name="lastName"
                  placeholder="Last Name"
                  label="LAST NAME"
                  classNames={{ input: classes.input }}
                />
                <Form.FormField
                  name="email"
                  placeholder="Email"
                  label="EMAIL ADDRESS"
                  classNames={{ input: classes.input }}
                />
                <Form.PasswordField
                  name="password"
                  placeholder="Password"
                  label="PASSWORD"
                  classNames={{ input: classes.input, innerInput: classes.innerInput }}
                />
              </div>
              <div className="space-y-4 mt-10">
                <Form.FormButton type="submit" className="w-full h-16" label="Signup" />
                <Button className="w-full h-16" color="blue" href="/auth/login" component={NextLink} >Login</Button>
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
