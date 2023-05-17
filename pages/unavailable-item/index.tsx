import { Button, Group, Image, Stack, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { ArrowNarrowLeft, ArrowNarrowRight } from 'tabler-icons-react';

export default function UnavailableItem() {
  return (
    <Stack align="center" className="py-24">
      <Image alt='' mah={400} maw={400} src={'/images/cancelbox.png'} />
      <Title mt={20} order={4} className="font-bold">
        This item is unavailable at the moment!
      </Title>
      <Group position="center">
        <Button
          leftIcon={<ArrowNarrowLeft size={38} strokeWidth={1.2} color={'black'} />}
          className="rounded-3xl hover:bg-transparent font-bold"
          component={NextLink}
          href="/"
          variant="outline"
          size="md"
        >
          Explore More
        </Button>
        <Button
          rightIcon={<ArrowNarrowRight size={38} strokeWidth={1.2} color={'white'} />}
          className="rounded-3xl hover:bg-transparent"
          component={NextLink}
          href="/unavailable-item/request"
          variant="filled"
          size="md"
        >
          Request Product
        </Button>
      </Group>
    </Stack>
  );
}
