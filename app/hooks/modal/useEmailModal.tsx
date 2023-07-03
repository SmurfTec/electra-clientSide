import { Modal as CModal, HttpStatusCode, http } from '@elektra/customComponents';
import { RootState, updateUser, useAppDispatch, useSelector } from '@elektra/store';
import { Avatar, Button, Center, NumberInput, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useInterval } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Mail } from 'tabler-icons-react';
import { useSignUpSuccesfullModal, useSignUpUnSuccesfullModal } from './useSignupModal';
import { useLoginPasswordChangeModal } from './useLoginPasswordModal';

type EmailModelProps = {
  email: string;
  purpose: 'signup' | '2fa' | 'passwordChange';
};

export const useEmailVerificationModel = ({
  purpose,
  email,
}: EmailModelProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const timer_limit = 59;
  const router = useRouter();
  const form = useForm({
    initialValues: {
      code: '',
    },
  });
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(timer_limit);
  const [LoginPasswordChangeModal, loginPasswordOpened, loginPasswordHandler] = useLoginPasswordChangeModal({
    code: form.values.code,
  });
  const [SignUpSuccesModal, signUpSuccesOpened, signUpSuccesHandler] = useSignUpSuccesfullModal();
  const [SignUpUnSuccesModal, signUpUnSuccesOpened, signUpUnSuccesHandler] = useSignUpUnSuccesfullModal();
  useEffect(() => {
    router.prefetch('/auth/login');
  }, [router]);
  const interval = useInterval(() => {
    setSeconds((s) => {
      if (s === 0) {
        interval.stop();
        return timer_limit;
      } else return s - 1;
    });
  }, 1000);

  const handleSubmit = async (code: string) => {
    setLoading(true);
    if (purpose === 'signup') {
      const res = await http.request({
        url: 'auth/confirm-signup',
        data: { code },
        method: 'POST',
      });
      if (res.isError) {
        if (res.status === HttpStatusCode.InternalServerError) {
          setLoading(false);
          close();
          signUpUnSuccesHandler.open();
        }
        setLoading(false);
        setError(true);
      } else {
        setLoading(false);
        close();
        signUpSuccesHandler.open();
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    }
    if (purpose === 'passwordChange') {
      const res = await http.request({
        url: `auth/validate-code/${code}`,
        method: 'PUT',
      });
      if (res.isError) {
        setLoading(false);
        setError(true);
      } else {
        setLoading(false);
        close();
        loginPasswordHandler.open();
      }
    }
    if (purpose === '2fa') {
      const res = await http.request({
        url: `auth/email-2fa/${code}`,
      });
      if (res.isError) {
        setLoading(false);
        setError(true);
      } else {
        const res = await http.request({
          url: 'users/me',
          method: 'PATCH',
          data: {
            is_two_step_verification_enabled: !profile?.is_two_step_verification_enabled,
          },
        });
        if (res.isError) {
          setLoading(false);
        } else {
          const user = res.data['user'];
          const profile = user['profile'];
          delete user['profile'];
          dispatch(updateUser({ isAuthenticated: true, user, profile }));
          setLoading(false);
          close()
        }
      }
    }
  };
  const handleResend = async () => {
    const res = await http.request({
      url: 'auth/resend-code',
      data: { email },
      method: 'POST',
    });
  };
  const Modal = (
    <Stack align="center" spacing="xl" className="mt-6">
      {!error && (
        <Text className="text-xs font-semibold">
          An email has been sent on {email}.<br></br>&nbsp;For verification please enter code in the email below
        </Text>
      )}
      {error && (
        <Text size="sm" className="font-semibold" color="red">
          Please enter correct code
        </Text>
      )}
      <CModal
        title="Changing Password"
        children={LoginPasswordChangeModal}
        onClose={loginPasswordHandler.close}
        open={loginPasswordOpened}
      />
      <CModal children={SignUpSuccesModal} onClose={signUpSuccesHandler.close} open={signUpSuccesOpened} />
      <CModal children={SignUpUnSuccesModal} onClose={signUpUnSuccesHandler.close} open={signUpUnSuccesOpened} />
      <form onSubmit={form.onSubmit(({ code }) => handleSubmit(code))}>
        <NumberInput
          className="w-[100%] mr-20"
          size="lg"
          type="number"
          min={0}
          data-autofocus
          hideControls
          styles={{
            input: {
              borderRadius: 'unset',
              textAlign: 'center',
              color: '#3C82D6',
              fontWeight: 'bold',
              border: '1px solid black',
            },
          }}
          {...form.getInputProps('code')}
          error={error}
        />
        {seconds === timer_limit && (
          <Center className="space-x-2 my-2 cursor-pointer" onClick={interval.start}>
            <Avatar size={12} src={'/images/refresh.png'} />
            <Text className="text-sm md:text-base font-medium" onClick={handleResend}>
              Resend
            </Text>
          </Center>
        )}
        {seconds !== timer_limit && (
          <Center className="my-2">
            <Text className="text-base font-medium">Resend after 0 : {seconds} s</Text>
          </Center>
        )}
        <Center>
          <Button type="submit" loading={loading} uppercase>
            Verify
          </Button>
        </Center>
      </form>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};

export const useEmailSentModal = ({
  email,
}: EmailModelProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <Mail size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Title order={4} classNames="" className=" font-semibold uppercase">
        Email Sent!
      </Title>
      <Text size="sm" className="text-center w-2/3">
        An OTP has been sent of {email}. An email change was requested. .
      </Text>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
