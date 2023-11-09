import { http, useStylesforGlobal } from '@elektra/customComponents';
import { RootState, updateUser, useAppDispatch, useSelector } from '@elektra/store';
import { Button, createStyles, Grid, Group, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import Joi from 'joi';
import { useState } from 'react';

export const usePhoneModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { classes: button } = useStylesforGlobal();
  const profile = useSelector((state: RootState) => state.auth.profile);
  console.log(profile);
  const defaultCountry = 'US';
  const initialValues = {
    mobile_no: profile?.mobile_no ?? '',
  };
  const schema = Joi.object({
    mobile_no: Joi.string().optional(),
  });
  const form = useForm({
    initialValues: initialValues,
    validate: joiResolver(schema),
  });
  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);

    const data = {
      mobile_no: values.mobile_no,
    };
    const res = await http.request({
      url: 'users/me',
      method: 'PATCH',
      data,
    });
    if (res.isError) {
      setLoading(false);
    } else {
      const user = res.data['user'];
      const profile = user['profile'];
      delete user['profile'];
      dispatch(updateUser({ isAuthenticated: true, user, profile }));
      setLoading(false);
      close();
    }
  };

  const Modal = (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col xs={12}>
            <TextInput
              className="uppercase"
              label="Mobile No."
              description="(Required)"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              {...form.getInputProps('mobile_no')}
            />
          </Grid.Col>
          <Grid.Col xs={8}>
            <Group className="ml-55 mt-4" spacing={'xl'}>
              <Button
                onClick={close}
                disabled={loading}
                className="xs:w-1/3"
                size={'lg'}
                classNames={{ root: button.grayButtonRoot }}
              >
                Cancel
              </Button>
              <Button type="submit" loading={loading} className="xs:w-1/3" size={'lg'}>
                Update
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
  return [Modal, opened, { open, close }];
};
const useStyles = createStyles((theme) => ({
  input: {
    borderRadius: 'unset',
    border: '2px solid black',
    height: '45px',
  },
  description: {
    display: 'inline-block',
    marginLeft: '5px',
  },
  label: {
    fontWeight: 'bold',
  },
}));
