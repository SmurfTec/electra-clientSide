import { Form, Only, useFormContext } from '@elektra/ui';
import { Button, createStyles, Grid, Group, Stack } from '@mantine/core';
import Joi from 'joi';
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
    margin: '0',
    marginTop: '-5px',
    height: '45px',
  },
  innerInput: {
    height: '52px',
  },
}));

type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  username: string;
};

export function Profile() {
  const { classes } = useStyles();
  const [is_editing, setIsEditing] = useState(false);

  const enabledSchema = Joi.object({
    first_name: Joi.string().required().label('First Name'),
    last_name: Joi.string().required().label('Last Name'),
    email: Joi.string()
      .required()
      .required()
      .email({ tlds: { allow: false } })
      .label('Email'),
    phone: Joi.number().required(),
    username: Joi.string().required(),
  });

  const disabledSchema = Joi.object({
    first_name: Joi.string().label('First Name'),
    last_name: Joi.string().label('Last Name'),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label('Email'),
    phone: Joi.number(),
    username: Joi.string(),
  });

  const initialValues: Profile = {
    first_name: 'Huzayfah',
    last_name: 'Hanif',
    email: 'huzayfahhanif@gmail.com',
    phone: null,
    username: '3423vc',
  };

  const { form } = useFormContext<Profile>();

  const handleFormSubmit = (values: Profile) => {
    console.log(values);
    console.log('HELLOW WORLD');
    setIsEditing(!is_editing);
  };

  return (
    <div className="m-0">
      <Stack align="flex-start" justify="space-around" spacing="lg">
        <Form
          initialValues={initialValues}
          onFormSubmit={handleFormSubmit}
          schema={is_editing ? enabledSchema : disabledSchema}
        >
          <Grid gutter={30} m={0}>
            <Grid.Col xs={4}>
              <Form.FormField
                classNames={{ input: is_editing ? classes.inputEnabled : classes.inputDisabled }}
                name="first_name"
                placeholder="Enter First Name"
                label="FIRST NAME"
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <Form.FormField
                classNames={{ input: is_editing ? classes.inputEnabled : classes.inputDisabled }}
                name="last_name"
                placeholder="Enter Last Name"
                label="LAST NAME"
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <Form.FormField
                classNames={{ input: is_editing ? classes.inputEnabled : classes.inputDisabled }}
                name="email"
                placeholder="Enter Email Address"
                label="EMAIL ADDRESS"
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <Form.FormField
                classNames={{ input: is_editing ? classes.inputEnabled : classes.inputDisabled }}
                name="phone"
                placeholder="Enter Phone no"
                label="PHONE NO"
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <Form.FormField
                classNames={{ input: is_editing ? classes.inputEnabled : classes.inputDisabled }}
                name="username"
                placeholder="Enter Username"
                label="USERNAME"
              />
            </Grid.Col>

            <Grid.Col xs={12}>
              <Only when={!is_editing}>
                <Button leftIcon={<Pencil />} onClick={() => setIsEditing(!is_editing)}>
                  Edit Profile
                </Button>
              </Only>

              <Only when={is_editing}>
                <Group>
                  <Button
                    styles={{
                      root: {
                        backgroundColor: 'rgba(180, 180, 180, 0.47)',
                        color: 'black',
                        '&:hover': {
                          backgroundColor: 'rgba(180, 180, 180, 0.47)',
                        },
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Form.FormButton
                    // onClick={() => setIsEditing(!is_editing)}
                    type="submit"
                    label="Update"
                  />
                </Group>
              </Only>
            </Grid.Col>
          </Grid>
        </Form>
      </Stack>
    </div>
  );
}
