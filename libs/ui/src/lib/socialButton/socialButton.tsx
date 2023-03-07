import { Button, ButtonProps } from '../button';
import { FacebookIcon } from './FacebookIcon';
import { GoogleIcon } from './GoogleIcon';

export function GoogleButton({ ...rest }: ButtonProps) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...rest} />;
}

export function FacebookButton({ ...rest }: ButtonProps) {
  return <Button leftIcon={<FacebookIcon />} variant="default" {...rest} />;
}
