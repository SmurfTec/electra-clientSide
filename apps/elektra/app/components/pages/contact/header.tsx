import { ActionIcon, Divider, Group, Title } from '@mantine/core';
import { BrandFacebook, BrandInstagram, Mail } from 'tabler-icons-react';

export const ContactUsHeader = () => {
  return (
    <>
      <Group position="apart">
        <Title order={4} className="font-bold">
          Help or Contact Us
        </Title>
        <div className="space-x-4">
          <ActionIcon className="inline-block" variant="filled" color="dark">
            <BrandFacebook size={'md'} stroke="" color="white" className="fill-white" />
          </ActionIcon>
          <ActionIcon className="inline-block" color="dark" variant={'filled'}>
            <BrandInstagram size={'md'} color="white" />
          </ActionIcon>
          <ActionIcon className="inline-block" variant="filled" color="dark">
            <Mail size={'md'} color="white" />
          </ActionIcon>
        </div>
      </Group>
      <Divider />
    </>
  );
};
