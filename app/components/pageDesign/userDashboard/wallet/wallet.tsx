import { Only, http } from '@elektra/customComponents';
import { Box, Button, Divider, Grid, LoadingOverlay, Text } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { useState } from 'react';
import { Cashout } from './cashout';
import { WalletLeftSide } from './leftSide';
import { WalletRightSide } from './rightSide';
import { useRouter } from 'next/router';

export const Wallet = () => {
  const [value, toggle] = useToggle<boolean>([false, true]);
  const router=useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const [{error,message}, setError] = useState<{ error: boolean; message: string }>({ error: false, message: '' });
  const handleSubmit = async () => {
    setLoading(true);
    setError({ error: false, message: '' })
    const res = await http.request<{url:string}>({
      url: 'wallets/create-account',
      method: 'POST',
    });
    console.log(router?.query?.targetUrl,"router?.query?.targetUrl")
    if (res.isError) {
      setError({error:true,message:String(res?.errorPayload?.['message'])})
      setLoading(false);
    } else {
      let targetUrl:any=router?.query?.targetUrl
      if(targetUrl){
        router.push(targetUrl)
      }
      window.open(res.data.url, "_blank");
      setLoading(false);
    }
  };
  return (
    <Grid mt={20}>
      <Grid.Col md={6}>
        <Box pos="relative">
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <WalletLeftSide state={!value} toogle={toggle} />
          <Cashout state={value} toogle={toggle} />
        </Box>
      </Grid.Col>
      <Grid.Col md={6}>
        <Only when={!value}>
          <WalletRightSide />
        </Only>
        <Only when={value}>
          <Text className="text-2xl text-black">Connect to Stripe</Text>
          <Divider my="sm" />
          <Button onClick={handleSubmit} loading={loading}>
            Connect
          </Button>
          <Only when={error}><Text color='red' mt='md' size={'md'}>{message}</Text></Only>
        </Only>
      </Grid.Col>
    </Grid>
  );
};
