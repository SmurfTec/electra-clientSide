import { Text, Title, useTheme } from '@elektra/ui';
import { Divider, Grid, Image, Paper, SimpleGrid, Container, Button, useMantineTheme } from '@mantine/core';
import { Group } from '@mantine/core';
import { NextLink } from '@mantine/next';

import {
  BrandFacebook,
  BrandLinkedin,
  BrandTwitter,
  Lifebuoy,
  ShieldCheck,
  Tags,
  TruckDelivery,
} from 'tabler-icons-react';
import { FooterCard, FooterCardProps } from '../card/footerCard';

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
  const theme = useMantineTheme();
  return (
    <div>
      <section className="my-14">
        <Grid m={0}>
          {footerCardData.map((item, key) => {
            return (
              <Grid.Col xs={12} md={3} sm={3} key={key}>
                <FooterCard icon={item.icon} heading={item.heading} description={item.description} />
              </Grid.Col>
            );
          })}
        </Grid>
      </section>
      <section>
        <Paper bg={theme.other.color.primary} radius="xs">
          <Paper className="px-20 py-16 relative" bg={theme.other.color.primary}>
            <Image className="absolute left-0 bottom-0" src={'/images/footer/footerVector.svg'} alt={'line'} />
            <Group position="apart">
              <Title color={theme.other.color.lightPrimary} order={2}>
                Place to explore the best products.
              </Title>

              <Button
                component={NextLink}
                href="/auth/signup"
                variant="outline"
                radius="xs"
                size="md"
                className="px-16"
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
            </Group>
            <Grid className="mt-10">
              <Grid.Col xs={12} sm={7}>
                <Text className="font-light leading-10" color={theme.other.color.lightPrimary} size={'md'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit enim, suscipit a nunc et,
                  pellentesque tempus leo. Donec vulputate sed erat sit amet fermentume tempus leo. Donec vulputate sed
                  erat sit amet fermentum. Donec vulputate sed erat sit amet fermentume tempus leo.
                </Text>
              </Grid.Col>
            </Grid>
          </Paper>
          <Divider my="sm" className="mt-40" />
          <Paper className="px-20 pb-8" bg={theme.other.color.primary}>
            <div className="border-2 border-red relative">
              <Grid>
                <Grid.Col sm={6}>
                  <Group position="left" className="space-x-20">
                    <Group>
                      <Title color={theme.other.color.lightPrimary} order={4}>
                        Logo
                      </Title>
                    </Group>
                    <div className="space-x-2">
                      <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                        Privacy Policy
                      </Text>
                      <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                        .
                      </Text>
                      <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                        Help Center
                      </Text>
                      <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                        .
                      </Text>
                      <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                        About
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
                <Grid.Col sm={6}>
                  <div>
                    <Group position="right">
                      <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                        Info@lorem.com
                      </Text>
                      <BrandFacebook color="white" />
                      <BrandTwitter color="white" />
                      <BrandLinkedin color="white" />
                    </Group>
                  </div>
                </Grid.Col>
              </Grid>
              {/* <SimpleGrid className="" cols={3}>
                <Group position="left" className="space-x-20">
                  <Group>
                    <Title color={theme.other.color.lightPrimary} order={4}>
                      Logo
                    </Title>
                  </Group>
                  <div className="space-x-2">
                    <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                      Privacy Policy
                    </Text>
                    <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                      .
                    </Text>
                    <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                      Help Center
                    </Text>
                    <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                      .
                    </Text>
                    <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                      About
                    </Text>
                  </div>
                </Group>
                <div></div>
                <Group position="right">
                  <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                    Info@lorem.com
                  </Text>
                  <BrandFacebook color="white" />
                  <BrandTwitter color="white" />
                  <BrandLinkedin color="white" />
                </Group>
              </SimpleGrid> */}
            </div>
          </Paper>
        </Paper>
      </section>
    </div>
  );
}
