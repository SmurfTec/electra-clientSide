import { http, useStylesforGlobal } from '@elektra/customComponents';
import { RootState, updateUser, useAppDispatch, useSelector } from '@elektra/store';
import { Button, createStyles, Grid, Group, Select, SelectItem, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { City, Country, State } from 'country-state-city';
import Joi from 'joi';
import { useState } from 'react';
import { CaretDown } from 'tabler-icons-react';

export const useBillingChangeModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { classes: button } = useStylesforGlobal();
  const profile = useSelector((state: RootState) => state.auth.profile);
  const defaultCountry = 'US';
  const initialValues = {
    address1: profile?.billing_address_line_1 ?? '',
    address2: profile?.billing_adress_line_2 ?? '',
    country: profile?.billing_country_code ?? defaultCountry,
    state: profile?.billing_state_or_province_code ?? '',
    city: profile?.billing_city ?? '',
    postalCode: profile?.billing_postalcode ?? '',
  };
  const schema = Joi.object({
    address1: Joi.string().optional(),
    address2: Joi.string().optional(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
  });

  const form = useForm({
    initialValues: initialValues,
    validate: joiResolver(schema),
  });
  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const country = Country.getCountryByCode(values.country);
    const state = State.getStateByCodeAndCountry(values.state,values.country);
    const data = {
      billing_address_line_1:values.address1,
      billing_address_line_2:values.address2,
      billing_country_code:values.country,
      billing_country:country?.name,
      billing_state_or_province_code:values.state,
      billing_state_or_province:state?.name,
      billing_city:values.city,
      billing_postalcode:Number(values.postalCode)
    }
      const res = await http.request({
        url: 'users/me',
        method: 'PATCH',
        data
      });
      if (res.isError) {
        setLoading(false);
      } else {
        const user = res.data['user'];
        const profile = user['profile'];
        delete user['profile'];
        dispatch(updateUser({ isAuthenticated: true, user, profile }));
        setLoading(false);
        close()
    }

  };

  const countryTransformer = () => {
    const country = Country.getCountryByCode(defaultCountry);
    return [{ value: String(country?.isoCode), label: String(country?.name) }] as SelectItem[];
  };
  const stateTransformer = () => {
    const states = State.getStatesOfCountry(defaultCountry);
    return states.map((state) => ({ value: String(state.isoCode), label: String(state?.name) } as SelectItem));
  };
  const cityTransformer = () => {
    if (form.values.state) {
      const cities = City.getCitiesOfState(defaultCountry, form.values.state);
      return cities.map((city) => (String(city?.name)));
    }
    return [];
  };

  const Modal = (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col xs={12}>
            <TextInput
              className="uppercase"
              label="Address#1"
              description="(Required)"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              {...form.getInputProps('address1')}
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextInput
              className="uppercase"
              label="Address#2"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              description="(Optional)"
              {...form.getInputProps('address2')}
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <Select
              rightSection={<CaretDown fill="black" size="1rem" />}
              rightSectionWidth={30}
              className="uppercase"
              label="Country"
              description="(Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={countryTransformer()}
              {...form.getInputProps('country')}
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <Select
              rightSection={<CaretDown fill="black" size="1rem" />}
              rightSectionWidth={30}
              label="State/Province"
              className="uppercase"
              description="(Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={stateTransformer()}
              {...form.getInputProps('state')}
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <Select
              rightSection={<CaretDown fill="black" size="1rem" />}
              rightSectionWidth={30}
              label="City"
              className="uppercase"
              description="(Required)"
              searchable
              nothingFound="No options"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={cityTransformer()}
              {...form.getInputProps('city')}
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <TextInput
              className="uppercase"
              description="(Required)"
              classNames={{ input: classes.input, description: classes.description, label: classes.label }}
              label="Postal Code"
              {...form.getInputProps('postalCode')}
            />
          </Grid.Col>
          <Grid.Col xs={8}>
            <Group className="ml-55 mt-4" spacing={'xl'}>
              <Button onClick={close} disabled={loading} className="xs:w-1/3" size={'lg'} classNames={{ root: button.grayButtonRoot }}>
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
