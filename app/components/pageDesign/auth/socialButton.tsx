import { FacebookIcon, GoogleIcon } from '@elektra/public';
import { Button, Group } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useSession, signIn, signOut } from "next-auth/react"

type SocialButtonProps = {
  title: string;
};
export const SocialButton = ({ title }: SocialButtonProps) => {
  return (
    <Group className="space-1 mt-10">
      <Button
        leftIcon={<GoogleIcon />}
        onClick={() => signIn('google')}
        className="w-full h-16 font-normal"
        variant="default"
        color="gray"
      >
        {title} with Google
      </Button>
      <Button
        leftIcon={<FacebookIcon />}
        onClick={() => signIn('facebook')}
        className="w-full h-16 font-normal"
        variant="default"
        color="gray"
      >
        {title} with Facebook
      </Button>
    </Group>
  );
};
