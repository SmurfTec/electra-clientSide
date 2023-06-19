import { Divider, Grid, Loader, LoadingOverlay, Switch } from '@mantine/core';
import { Security } from './security';
import { RootState, updateUser, useAppDispatch, useSelector } from '@elektra/store';
import { useState } from 'react';
import { http } from '@elektra/customComponents';
import { PageTitle } from '@elektra/components';

export function Settings() {
  const  profile  = useSelector((state: RootState) => state.auth.profile);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleNotification = async (value:boolean) =>{
    setLoading(true)
    const res = await http.request({
      url: 'users/me',
      method: 'PATCH',
      data: {
        receive_notifications:value
      },
    });
    if(res.isError){
      console.log(res.errorPayload)
      setLoading(false)
    }
    else{
      const user = res.data['user'];
      const profile = user['profile'];
      delete user['profile'];
      dispatch(updateUser({ isAuthenticated: true, user, profile }));
      setLoading(false)
    }
  }
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
            thumbIcon={<LoadingOverlay visible={loading} radius={'lg'}  />}
            onChange={(event) => handleNotification(event.currentTarget.checked)}
            checked={profile?.receive_notifications??false}
            className='text-black font-semibold'
            label="Recieve notifications from our marketplace regarding listings,updates and new releases."
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
