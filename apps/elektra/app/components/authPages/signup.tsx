import {
  Container,
  createStyles,
  Grid,
  Group,
  Image,
  Text,
} from '@mantine/core';

import { Form } from '@elektra/ui';
import { Button, FacebookButton, GoogleButton } from '@elektra/ui';
import Joi from 'joi';

const useStyles = createStyles((theme) => ({
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

  bottomAlign: {
    textAlign:"center",
    position: "absolute",
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
  const password_pattern =
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/;

  //TODO: Need to properly typecast this
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .regex(password_pattern)
      .required()
      .label('User Password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'object.regex': 'Must have at least 8 characters',
        'string.pattern.base':
          'User Password must have at least 8 characters one uppercase and special character',
      }),
  });

  const initialValues: any = {
    email: null,
    password: null,
  };

  return (
    <Grid m={0}>
      <Grid.Col xs={12} sm={5} md={4}>
        <Container className="my-5">
          <Group className="mb-20">
            <Text size="md" className="font-bold" color={'black'}>
              dummy logo
            </Text>
          </Group>

          <div>
            <Text size="xl" className="font-bold" color={'black'}>
              Log in
            </Text>
            <Text size="xs" className="font-bold" color={'grey'}>
              Login to buy & sell on our platform.
            </Text>
          </div>

          <Group className="space-1 mt-10">
            <GoogleButton className="w-full h-24 font-normal">
              Login with Google
            </GoogleButton>
            <FacebookButton className="w-full h-24 font-normal">
              Login in with Facebook
            </FacebookButton>
          </Group>

          <div className="mt-10">
            <Form
              initialValues={initialValues}
              onFormSubmit={() => console.log('')}
              schema={schema}
            >
              <div className="space-y-5">
                <Form.FormField
                  className=""
                  name="email"
                  description={'Email Address'}
                />
                <Form.PasswordField
                  
                  name="password"
                  description={'Password'}
                />
              </div>
              <div className="text-right mt-2">
                <Button
                  className="bg-white hover:bg-white text-slate-300 px-0"
                  label="Forgot Password ?"
                  component="a"
                  // rightIcon=""
                />
              </div>

              <div className="space-y-4 mt-10">
                <Button className="w-full h-24" label="Login" />
                <Button
                  className="w-full h-24 bg-[#3C82D6] hover:bg-[#3C82D6]"
                  label="Signup"
                />
              </div>
            </Form>
          </div>
        </Container>
      </Grid.Col>
      <Grid.Col xs={12} sm={7} md={8} className={classes.wrapper}>
        <Image
          alt="background-image"
          height="100vh"
          className="m-0"
          src="/images/auth/loginBG.png"
        />
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
          <Text className='font-bold mb-2' size="xl" color="white">Buy the best items on our site.</Text>
          <Text size="xs" color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
            molestie dui, a consequat magna.{' '}
          </Text>
        </div>
      </Grid.Col>
    </Grid>
    // </Container>
  );
}
