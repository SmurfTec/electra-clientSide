import { Button, ButtonProps } from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';
import { FacebookIcon } from './FacebookIcon';

export function GoogleButton(props: ButtonProps) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export function FacebookButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      variant="default"
      // sx={(theme) => ({
      //   backgroundColor: theme.fn.darken('#4267B2', 0.1),
      //   color: '#fff',
      //   '&:hover': {
      //     backgroundColor: theme.fn.darken('#fff', 0),
      //   },
      // })}
      {...props}
    />
  );
}






