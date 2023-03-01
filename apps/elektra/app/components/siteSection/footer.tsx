import { Button, Text, Title, useTheme } from '@elektra/ui';
import { Divider, Grid, Image, Paper, SimpleGrid, Container } from '@mantine/core';
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

export function Footer() {
  const theme = useTheme();
  return (
    <div>
      <section>
        <Container size={"xl"}>
          <Paper bg="#D9D9D921" py={16} radius="xs">
            <SimpleGrid cols={5}>
              <Group position="center">
                <TruckDelivery />
                <div>
                  <Text className="font-[600]" size="xl">
                    Free Shipping
                  </Text>
                  <Text color={theme.other.color.subTitle} size="sm">
                    Lorem ipsum dolor si
                  </Text>
                </div>
              </Group>
              <Group position="center">
                <TruckDelivery />
                <div>
                  <Text className="font-[600]" size="xl">
                    Money Return
                  </Text>
                  <Text color={theme.other.color.subTitle} size="sm">
                    Lorem ipsum dolor si
                  </Text>
                </div>
              </Group>
              <Group position="center">
                <ShieldCheck />
                <div>
                  <Text className="font-[600]" size="xl">
                    Secure Payment
                  </Text>
                  <Text color={theme.other.color.subTitle} size="sm">
                    Lorem ipsum dolor si
                  </Text>
                </div>
              </Group>
              <Group position="center">
                <Lifebuoy />
                <div>
                  <Text className="font-[600]" size="xl">
                    24/7 Support
                  </Text>
                  <Text color={theme.other.color.subTitle} size="sm">
                    Lorem ipsum dolor si
                  </Text>
                </div>
              </Group>
              <Group position="center">
                <Tags />
                <div>
                  <Text className="font-[600]" size="xl">
                    Daily Offers
                  </Text>
                  <Text color={theme.other.color.subTitle} size="sm">
                    Lorem ipsum dolor si
                  </Text>
                </div>
              </Group>
            </SimpleGrid>
          </Paper>
        </Container>
      </section>
      <section>
        <Paper bg={theme.other.color.primary} radius="xs">
          <Paper className="px-20 py-16 relative" bg={theme.other.color.primary}>
            <Image className="absolute left-0 bottom-0" src={'/images/footer/footerVector.svg'} alt={'line'} />
            <Group position="apart">
              <Title color={theme.other.color.lightPrimary} order={2}>
                Place to explore the best products.
              </Title>

              {/* TODO: Button not picking white color */}
              <Button
                component={NextLink}
                href="/auth/signup"
                variant="outline"
                radius={'xs'}
                size="md"
                className="px-16"
                color={'blue'}
                label="SIGN UP"
                uppercase
              />
            </Group>
            <Grid className="mt-10">
              <Grid.Col xs={12} sm={7}>
                <Text className="font-light" color={theme.other.color.lightPrimary} size={'md'}>
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
              <SimpleGrid className="" cols={3}>
                <Group position="left" className="space-x-20">
                  <Group>
                    <Title color={theme.other.color.lightPrimary} order={4}>
                      Logo
                    </Title>
                  </Group>
                  <div className="space-x-4">
                    <Text size="md" className="inline-block" color={theme.other.color.subTitle}>
                      Privacy Policy
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
              </SimpleGrid>
            </div>
          </Paper>
        </Paper>
      </section>
    </div>
  );
}
