import { Grid, Switch } from '@mantine/core';
import { PageTitle } from '../../../AppTitle';
import { Security } from './security';

export function Settings() {
  return (
    <div className="my-5">
      <Grid gutter={40}>
        <Grid.Col span={6}>
          <Security />
        </Grid.Col>
        <Grid.Col span={6}>
          <PageTitle title="Notification" />
          <Switch
            size={'md'}
            labelPosition="left"
            className='text-black font-semibold'
            label="Recieve notifications from our marketplace regarding listings,updates and new releases."
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
