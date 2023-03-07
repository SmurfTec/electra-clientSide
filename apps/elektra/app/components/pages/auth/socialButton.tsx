import { Button, Group } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { FacebookIcon, GoogleIcon } from 'apps/elektra/public';

type SocialButtonProps = {
  title:string;}
export const SocialButton = ({title}:SocialButtonProps) => {
  return (
    <Group className="space-1 mt-10">
      <Button leftIcon={<GoogleIcon />} component={NextLink} href='/' className="w-full h-24 font-normal" variant="default" color="gray">
        {title} with Google
      </Button>
      <Button leftIcon={<FacebookIcon />} component={NextLink} href='/' className="w-full h-24 font-normal" variant="default" color="gray">
      {title} with Facebook
      </Button>
    </Group>
  );
};
