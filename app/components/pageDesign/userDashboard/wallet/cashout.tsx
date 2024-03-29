import { Modal, Only, http } from '@elektra/customComponents';
import { useCashoutSuccessfullModal, useCashoutUnSuccessfullModal } from '@elektra/hooks';
import { RootState, updateUserProfile, useAppDispatch, useSelector } from '@elektra/store';
import { Button, Center, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { useState } from 'react';
type CashOutProps = {
  state: boolean;
  toogle: () => void;
};
export const Cashout = ({ state, toogle }: CashOutProps) => {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [CashoutSuccessModal, cashoutSuccessOpened, cashoutSuccessHandler] = useCashoutSuccessfullModal();
  const [CashoutUnsuccessModal, cashoutUnsuccessOpened, cashoutUnsuccessHandler] =
    useCashoutUnSuccessfullModal(errorMessage);
  const handleSubmit = async () => {
    setLoading(true);
    const res = await http.request({
      url: 'wallets/checkout',
      method: 'POST',
      data: {
        amount: profile?.available_funds,
      },
    });
    if (res.isError) {
      setErrorMessage(res?.errorPayload?.message || 'Transaction Failed');
      cashoutUnsuccessHandler.open();
      setLoading(false);
    } else {
      dispatch(updateUserProfile(Number(profile?.id)));
      cashoutSuccessHandler.open();
      setLoading(false);
    }
  };
  return (
    <Only when={state}>
      <Modal children={CashoutSuccessModal} onClose={cashoutSuccessHandler.close} open={cashoutSuccessOpened} />
      <Modal children={CashoutUnsuccessModal} onClose={cashoutUnsuccessHandler.close} open={cashoutUnsuccessOpened} />
      <Paper withBorder px={30} py={20} radius={20}>
        <Text className="text-base font-bold text-black md:text-2xl">Cashout Details</Text>
        <Stack align="start" spacing={20} mt={40}>
          <Group position="apart" className="w-full">
            <Text className="text-[11px] md:text-xs font-semibold text-black uppercase">Available funds</Text>
            <Text className="text-sm font-semibold text-black  md:text-xl">${profile?.available_funds}</Text>
          </Group>
          {/* <Group position="apart" className="w-full">
            <Text className="text-[11px] md:text-xs font-semibold text-black uppercase">CARD DETAILS</Text>
            <Center inline>
              <Image alt="coins" src={'/images/master.png'} height={25} width={25} fit="contain" />
              <Text className="inline-block ml-2 text-sm font-semibold text-black md:text-xl">
                {profile?.card_details_number?.slice(0, 4)} **** **** ****
              </Text>
            </Center>
          </Group> */}
          <Group position="apart" className="w-full">
            <Text className="text-[11px] md:text-xs font-semibold text-black uppercase">Platform Profit</Text>
            <Text className="text-sm font-semibold text-black md:text-xl">${profile?.platform_profit}</Text>
          </Group>
          <Divider className="w-full" variant="dashed" />
          <Group position="apart" className="w-full">
            <Text className="text-[11px] md:text-xs font-semibold text-black uppercase">TOTAL CASHOUT</Text>
            <Text color="rgba(60, 130, 214, 1)" className="text-sm font-extrabold  md:text-xl">
              ${Number(profile?.available_funds) - Number(profile?.platform_profit)}
            </Text>
          </Group>
          <Center inline className="space-x-5">
            <Button
              size="xl"
              styles={(theme) => ({
                root: {
                  width: theme.fn.smallerThan(1150) ? 140 : 250,
                },
              })}
              className="text-base font-medium"
              onClick={handleSubmit}
              loading={loading}
            >
              CONFIRM
            </Button>
            <Button
              styles={(theme) => ({
                root: {
                  width: theme.fn.smallerThan(1150) ? 140 : 250,
                  '&:not([data-disabled]):hover': {
                    backgroundColor: 'rgba(217, 217, 217, 1)',
                  },
                },
              })}
              disabled={loading}
              size="xl"
              bg="rgba(217, 217, 217, 1)"
              className="text-base font-medium text-black"
              onClick={toogle}
            >
              CANCEL
            </Button>
          </Center>
        </Stack>
      </Paper>
    </Only>
  );
};
