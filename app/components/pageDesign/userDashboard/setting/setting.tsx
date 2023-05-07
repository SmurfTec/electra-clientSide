import { Divider, Grid, Switch } from '@mantine/core';
import { PageTitle } from '../../../AppTitle';
import { Security } from './security';

export function Settings() {
  return (
    <div className="my-5">
      <Grid gutter={40}>
        <Grid.Col span={12} md={6}>
        <PageTitle title="Security" className='hidden md:block' />
          <Security />
        </Grid.Col>
        
        <Grid.Col span={12} md={6}>
          <PageTitle title="Notification" className='hidden md:block' />
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
