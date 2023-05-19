import { Affix, Stack, Tabs, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { Bell, Box, Home, ListCheck, User } from 'tabler-icons-react';

export const FooterMenu = () => {
  const router = useRouter();
  return (
    <Affix position={{ bottom: -5 }} className="h-20 flex pb-2  items-end" bg="black">
      <Tabs
        value={router.pathname as string}
        onTabChange={(value) => router.push(value as string)}
        styles={{
          tabsList: { borderBottom: 'unset' },
          tab: {
            color: 'white',
            '&[data-active]': {
              color: 'white',

              borderBottom: '5px solid #3C82D6',

              borderRadius: '15px 15px 0px 0px',
            },
          },
        }}
      >
        <Tabs.List className="w-screen" grow>
          <Tabs.Tab value="/">
            <Stack align="center" spacing={0}>
              <Home size={30} />
              <Text size={10} color="inherit" className="font-medium">
                Home
              </Text>
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab value="/selling-search">
            <Stack align="center" spacing={0}>
              <Box size={30} />
              <Text color="inherit" size={10} className="font-medium">
                List Now
              </Text>
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab value="/userdashboard?tab=selling">
            <Stack align="center" spacing={0}>
              <ListCheck size={30} />
              <Text color="inherit" size={10} className="font-medium">
                My Listing
              </Text>
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab value="/notifications">
            <Stack align="center" spacing={0}>
              <Bell size={30} />
              <Text color="inherit" size={10} className="font-medium">
                Notifications
              </Text>
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab value="/auth/login">
            <Stack align="center" spacing={0}>
              <User size={30} />
              <Text color="inherit" size={10} className="font-medium">
                Profile
              </Text>
            </Stack>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Affix>
  );
};
