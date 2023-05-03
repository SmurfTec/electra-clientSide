import { Modal, Only } from '@elektra/customComponents';
import { useCashoutSuccessfullModal } from '@elektra/hooks';
import { Button, Center, Divider, Group, Image, Paper, Stack, Text } from '@mantine/core';
type CashOutProps = {
  state: boolean;
  toogle: () => void;
};
export const Cashout = ({ state, toogle }: CashOutProps) => {
  const [CashoutModal, cashoutOpened, cashoutHandler] = useCashoutSuccessfullModal();
  return (
    <Only when={state}>
      <Modal children={CashoutModal} onClose={cashoutHandler.close} open={cashoutOpened} />
      <Paper withBorder px={30} py={20} radius={20}>
        <Text className="font-bold text-black" size={24}>
          Cashout Details
        </Text>
        <Stack align="start" spacing={20} mt={40}>
          <Group position="apart" className="w-full">
            <Text size={12} className="font-semibold text-black uppercase">
              Available funds
            </Text>
            <Text size={20} className="text-black font-semibold">
              $7
            </Text>
          </Group>
          <Group position="apart" className="w-full">
            <Text size={12} className="font-semibold text-black uppercase">
              CARD DETAILS
            </Text>
            <Center inline>
              <Image alt="coins" src={'/images/master.png'} height={25} width={25} fit="contain" />
              <Text size={20} className="ml-2 text-black font-semibold inline-block">
                3454 **** **** ****
              </Text>
            </Center>
          </Group>
          <Group position="apart" className="w-full">
            <Text size={12} className="font-semibold text-black uppercase">
              Platform Profit
            </Text>
            <Text size={20} className="text-black font-semibold">
              $7
            </Text>
          </Group>
          <Divider className="w-full" variant="dashed" />
          <Group position="apart" className="w-full">
            <Text size={12} className="font-semibold text-black uppercase">
              TOTAL CASHOUT
            </Text>
            <Text size={20} color="rgba(60, 130, 214, 1)" className=" font-extrabold">
              $243.00
            </Text>
          </Group>
          <Center inline className="space-x-5">
            <Button
              size="xl"
              styles={{
                root: {
                  width: 250,
                },
              }}
              className="text-base font-medium"
              onClick={cashoutHandler.open}
            >
              CONFIRM
            </Button>
            <Button
              styles={{
                root: {
                  width: 250,
                  '&:not([data-disabled]):hover': {
                    backgroundColor: 'rgba(217, 217, 217, 1)',
                  },
                },
              }}
              size="xl"
              bg="rgba(217, 217, 217, 1)"
              className="text-base font-medium"
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
