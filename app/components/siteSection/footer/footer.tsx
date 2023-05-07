import { Button, Container, Divider, Grid, Group, Image, Paper, Text, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { FooterCard, FooterCardProps } from '../../card';

import { BrandFacebook, BrandLinkedin, BrandTwitter } from 'tabler-icons-react';

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
  return (
    <div className="mt-48">
      <section className="my-14">
        <Grid>
          {footerCardData.map((item, key) => {
            return (
              <Grid.Col span={6} md={3} sm={3} key={key}>
                <FooterCard icon={item.icon} heading={item.heading} description={item.description} />
              </Grid.Col>
            );
          })}
        </Grid>
      </section>
      <section>
        <Paper bg={'black'} radius="xs">
          <Container size={1300}>
            <Paper className="py-16 relative" bg={'black'}>
              <Image className="absolute left-0 bottom-0" src={'/images/footer/footerVector.svg'} alt={'line'} />
              <Group position="apart">
                <Title color={'white'} order={2}>
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
                  <Text className="font-light leading-10" color={'white'} size={'md'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur velit enim, suscipit a nunc et,
                    pellentesque tempus leo. Donec vulputate sed erat sit amet fermentume tempus leo. Donec vulputate
                    sed erat sit amet fermentum. Donec vulputate sed erat sit amet fermentume tempus leo.
                  </Text>
                </Grid.Col>
              </Grid>
            </Paper>
          </Container>
          <Divider my="sm" className="mt-16" />
          <Paper className="px-20 pb-4" bg={'black'}>
            <Container size={1300}>
              <div className="border-2 border-red relative">
                <Grid>
                  <Grid.Col sm={6}>
                    <Group position="left" className="space-x-20">
                      <Group>
                        <Title color={'white'} order={4}>
                          Elektra
                        </Title>
                      </Group>
                      <div className="space-x-2">
                        <Text size="md" className="inline-block" color={'#B4B4B4'}>
                          Privacy Policy
                        </Text>
                        <Text size="md" className="inline-block" color={'#B4B4B4'}>
                          .
                        </Text>
                        <Text size="md" component={NextLink} href="/contact" className="inline-block" color={'#B4B4B4'}>
                          Help Center
                        </Text>
                        <Text size="md" className="inline-block" color={'#B4B4B4'}>
                          .
                        </Text>
                        <Text
                          size="md"
                          component={NextLink}
                          href="/how-it-works"
                          className="inline-block"
                          color={'#B4B4B4'}
                        >
                          About
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <div>
                      <Group position="right">
                        <Text size="md" className="inline-block" color={'#B4B4B4'}>
                          Info@lorem.com
                        </Text>
                        <BrandFacebook color="white" />
                        <BrandTwitter color="white" />
                        <BrandLinkedin color="white" />
                      </Group>
                    </div>
                  </Grid.Col>
                </Grid>
              </div>
            </Container>
          </Paper>
        </Paper>
      </section>
    </div>
  );
}
