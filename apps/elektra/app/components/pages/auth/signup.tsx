import { Button, FacebookButton, Form, GoogleButton, NextImage, Title } from '@elektra/ui';
import { Container, createStyles, Grid, Group, Image, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Joi from 'joi';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    padding: 0,
    margin: 0,
  },

  centerAlign: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  topAlign: {
    position: 'absolute',
    top: '0',
    left: '0',
  },
  input:{
    borderRadius:'unset',
    border:"1px solid black",
    height:'52px'
  },
  bottomAlign: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '3%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function Signup() {
  const { classes } = useStyles();
  const password_pattern = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/;

  //TODO: Need to properly typecast this
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().min(8).regex(password_pattern).required().label('User Password').messages({
      'string.min': 'Must have at least 8 characters',
      'object.regex': 'Must have at least 8 characters',
      'string.pattern.base': 'User Password must have at least 8 characters one uppercase and special character',
    }),
  });

  const initialValues: any = {
    email: "",
    firstName:"",
    lastName:"",
    password: "",
  };

  return (
    <Grid m={0}>
      <Grid.Col xs={12} sm={5} md={4}>
        <Container className="my-5">
          <Group className="mb-10">
            <Title  className="font-bold" color={'black'}>
              dummy logo
            </Title>
          </Group>

          <div>
            <Text size="xl" className="font-bold" color={'black'}>
              Signup
            </Text>
            <Text size="xs" className="font-bold" color={'grey'}>
              Signup and explore the best products.
            </Text>
          </div>

          <Group className="space-1 mt-10">
            <GoogleButton className="w-full h-20 font-normal">Signup with Google</GoogleButton>
            <FacebookButton className="w-full h-20 font-normal">Signup in with Facebook</FacebookButton>
          </Group>

          <div className="mt-10">
            <Form initialValues={initialValues} onFormSubmit={() => console.log('')} schema={schema}>
              <div className="space-y-5">
                <Form.FormField name="firstName"  label='FIRST NAME' classNames={{input:classes.input}}/>
                <Form.FormField name="lastName" label='LAST NAME' classNames={{input:classes.input}}/>
                <Form.FormField name="email" label='EMAIL ADDRESS'classNames={{input:classes.input,}}/>
                <Form.PasswordField name="password" label='PASSWORD' classNames={{input:classes.input}}/>
              </div>
              <div className="text-right mt-2">
                <Button
                  className="bg-white hover:bg-white text-slate-300 px-0"
                  label="Forgot Password ?"
                  // href="/auth/login"
                  // component={NextLink}
                />
              </div>
              <div className="space-y-4 mt-10">
                <Button component={NextLink} href={'/auth/signup'} className="w-full h-24" label="Signup" />
                <Button
                  className="w-full h-24  bg-[#3C82D6] hover:bg-[#3C82D6]"
                  label="Login"
                  href="/auth/login"
                  component={NextLink}
                />
              </div>
            </Form>
          </div>
          <div className="mt-20 space-x-4">
            <Text className="inline-block" color="dark">
              Privacy Policy
            </Text>
            <Text className="inline-block" color="dark">
              Help Center
            </Text>
            <Text className="inline-block" color="dark">
              .
            </Text>
            <Text className="inline-block" color="dark">
              About
            </Text>
          </div>
        </Container>
      </Grid.Col>
      <Grid.Col xs={12} sm={7} md={8} className={classes.wrapper}>
        <NextImage alt="background-image" className="m-0 h-screen" layout="fill" src="/images/auth/loginBG.png" />
        <div className={classes.centerAlign}>
          <Image alt="center-image" src="/images/auth/loginCenter.png" />
        </div>
        <div>
          <Image
            alt="top-image"
            height={'150px'}
            width={'150px'}
            className={classes.topAlign}
            src="/images/auth/loginTopLeft.png"
          />
        </div>

        <div className={classes.bottomAlign}>
          <Text className="font-bold mb-2" size="xl" color="white">
            Buy the best items on our site.
          </Text>
          <Text size="xs" color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec molestie dui, a consequat magna.
          </Text>
        </div>
      </Grid.Col>
    </Grid>
    // </Container>
  );
}
