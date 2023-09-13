import { http } from '@elektra/customComponents';
import { FacebookIcon, GoogleIcon } from '@elektra/public';
import { login, useAppDispatch } from '@elektra/store';
import { Button, Group } from '@mantine/core';
import { setCookie } from 'cookies-next';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';

type SocialButtonProps = {
  title: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
export const SocialButton = ({ title,  setLoading }: SocialButtonProps) => {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignIn = async () => {
    setLoading(true);
    const res = await http.request({
      url: 'auth/google-login',
      method:'POST',
      data: {
        email: data?.user.email,
        is_social_login: true,
      },
    });
    if (res.isError) {
      setLoading(false);
    } else {
      const user = res.data['user'];
      const profile = user['profile'];
      delete user['profile'];
      const authToken = String(res.data['authentication']);
      const refreshToken = String(res.data['refresh']);
      setCookie('authentication', authToken);
      setCookie('refresh', refreshToken);
      dispatch(login({ isAuthenticated: true, user, profile }));
      router.push('/userdashboard');
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status === 'loading') setLoading(true);
    if (status === 'unauthenticated') setLoading(false);
    if (status === 'authenticated') handleSignIn();
  }, [status]);
  useEffect(() => {
    router.prefetch('/userdashboard');
  }, [router]);
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
