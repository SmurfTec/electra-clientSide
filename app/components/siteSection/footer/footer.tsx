import {
  ActionIcon,
  Affix,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import { FooterCard, FooterCardProps } from '../../card';

import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Bell, Box, BrandFacebook, BrandLinkedin, BrandTwitter, Home, ListCheck, User } from 'tabler-icons-react';

const footerCardData: FooterCardProps[] = [
  {
    icon: '/images/footer/target.png',
    heading: 'Accurate Market Data',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    icon: '/images/footer/target.png',
    heading: 'Quality Guaranteed',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    icon: '/images/footer/target.png',
    heading: 'Secure Payments',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    icon: '/images/footer/target.png',
    heading: '24/7 Support',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
];

export function Footer() {
  const router = useRouter();
  const phone = useMediaQuery('(max-width: 600px)');
  // console.log(router)
  return (
    <div className="mt-24">
      <Container size={1300}>
        <section className="my-8">
          <Grid gutter={50} gutterXs={0}>
            {footerCardData.map((item, key) => {
              return (
                <Grid.Col className="px-0" span={6} md={3} sm={3} key={key}>
                  <FooterCard icon={item.icon} heading={item.heading} description={item.description} />
                </Grid.Col>
              );
            })}
          </Grid>
        </section>
      </Container>
      <section>
        <Paper bg={'black'} radius="xs">
          <Container size={1300}>
            <Paper className="pt-8 xs:py-16 relative" bg={'black'}>
              <Image className="absolute left-0 bottom-0" src={'/images/footer/footerVector.svg'} alt={'line'} />
              <Grid>
                <Grid.Col span={6}>
                  <Title color={'white'} className="font-[600]" order={2} size={phone ? '16px' : undefined}>
                    Place to explore the best products.
                  </Title>
                </Grid.Col>

                <Grid.Col span={6} className="text-right">
                  <Button
                    component={NextLink}
                    href="/auth/signup"
                    variant="outline"
                    radius="xs"
                    size="md"
                    className="xs:px-16"
                    styles={{
                      root: {
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          backgroundColor: 'unset',
                        },
                      },
                    }}
                  >
                    SIGN UP
                  </Button>
                </Grid.Col>
              </Grid>
              <Grid className="mt-4 xs:mt-10">
                <Grid.Col xs={12} sm={7}>
                  <Text className="font-light leading-10" color={'white'} size={phone ? '13px' : 'md'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit enim, suscipit a nunc et,
                    pellentesque tempus leo. Donec vulputate sed erat sit amet fermentume tempus leo. Donec vulputate
                    sed erat sit amet fermentum. Donec vulputate sed erat sit amet fermentume tempus leo.
                  </Text>
                </Grid.Col>
              </Grid>
            </Paper>
          </Container>
          <Divider my="sm" className="mt-4 xs:mt-16" />
          <Paper className=" pb-4" bg={'black'}>
            <Container size={1300}>
              <Group position="apart" className="border-2 border-red relative space-y-4">
                <Group position="apart" className="xs:space-x-20">
                  <Group position="apart" align="top">
                    <Title color={'white'} order={4} className="leading-0">
                      Elektra
                    </Title>
                    <Group align="end" className="xs:space-x-2">
                      <Text size={phone ? '12px' : 'md'} className="inline-block" color={'#B4B4B4'}>
                        Privacy Policy
                      </Text>
                      <Text size={phone ? '12px' : 'md'} className="inline-block" color={'#B4B4B4'}>
                        .
                      </Text>
                      <Text
                        size={phone ? '12px' : 'md'}
                        component={NextLink}
                        href="/contact"
                        className="inline-block"
                        color={'#B4B4B4'}
                      >
                        Help Center
                      </Text>
                      <Text size={phone ? '12px' : 'md'} className="inline-block" color={'#B4B4B4'}>
                        .
                      </Text>
                      <Text
                        size={phone ? '12px' : 'md'}
                        component={NextLink}
                        href="/how-it-works"
                        className="inline-block"
                        color={'#B4B4B4'}
                      >
                        About
                      </Text>
                    </Group>
                  </Group>
                </Group>

                <Group position="apart">
                  <Text size="md" className="inline-block" color={'#B4B4B4'}>
                    Info@lorem.com
                  </Text>
                  <div className="space-x-4">
                    <BrandFacebook color="white" />
                    <BrandTwitter color="white" />
                    <BrandLinkedin color="white" />
                  </div>
                </Group>
              </Group>
            </Container>
          </Paper>
        </Paper>
      </section>

      {/* FOOTER MOBILE FIXED MENU*/}
      {phone && (
        <Affix position={{ bottom: 0 }} className="h-16 flex items-end" bg="black">
          <Tabs
            value={router.pathname as string}
            onTabChange={(value) => router.push(value as string)}
            className="w-full"
            styles={{
              tabsList: { color: 'white' },
              tab: {
                '&[data-active] div': {
                  
                  color: 'white', 
                  borderBottom: '6px solid #3C82D6',
                  borderRadius: '5px 5px 0px 0px',
                },
              },
            }}
          >
            <Tabs.List className="w-[100vw]" grow>
              <Tabs.Tab value="/">
                <ActionIcon size={30}>
                  <Stack align="center" spacing={0}>
                    <Home size={30} />
                    <Text size={10} color='inherit' className="font-medium">
                      Home
                    </Text>
                  </Stack>
                </ActionIcon>
              </Tabs.Tab>
              <Tabs.Tab value="/product-listing">
                <ActionIcon size={30}>
                  <Stack align="center" spacing={0}>
                    <Box size={30} />
                    <Text color='inherit' size={10} className="font-medium">
                      List Now
                    </Text>
                  </Stack>
                </ActionIcon>
              </Tabs.Tab>
              <Tabs.Tab value="/shop">
                <ActionIcon size={30}>
                  <Stack align="center" spacing={0}>
                    <ListCheck size={30} />
                    <Text color='inherit' size={10} className="font-medium">
                      My Listing
                    </Text>
                  </Stack>
                </ActionIcon>
              </Tabs.Tab>
              <Tabs.Tab value="/notifications">
                <ActionIcon size={30}>
                  <Stack align="center" spacing={0}>
                    <Bell size={30} />
                    <Text color='inherit' size={10} className="font-medium">
                      Notifications
                    </Text>
                  </Stack>
                </ActionIcon>
              </Tabs.Tab>
              <Tabs.Tab value="/userdashboard">
                <ActionIcon size={30}>
                  <Stack align="center" spacing={0}>
                    <User size={30} />
                    <Text color='inherit' size={10} className="font-medium">
                      Profile
                    </Text>
                  </Stack>
                </ActionIcon>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Affix>
      )}
    </div>
  );
}


