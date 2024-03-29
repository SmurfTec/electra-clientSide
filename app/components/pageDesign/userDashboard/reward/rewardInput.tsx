import { Modal } from '@elektra/customComponents';
import { useRedeemInputModal } from '@elektra/hooks';
import { RootState, useSelector } from '@elektra/store';
import { Avatar, Button, Group, Paper, Text } from '@mantine/core';

export const RewardInput = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [RedeemInputModal, count, opened, { open, close }] = useRedeemInputModal();
  return (
    <>
      <Modal title="Redeem Points" children={RedeemInputModal} onClose={close} open={opened} />
      <Paper shadow="xl" p="xl" className="w-full md:w-1/3">
        <Group position="left">
          <Avatar src="images/coin.png" size={'lg'} radius="lg" />
          <div>
            <Text size={40} className="text-black font-bold">
              {count}
            </Text>
            <Text fz="sm" c="dimmed">
              Reward Points
            </Text>
          </div>
        </Group>
        <Group spacing={8} mt={10}>
          <Avatar src="images/coin.png" size={'xs'} radius="lg" />
          <Text size={15} className="text-black">
            {profile?.coins || 0} = ${Number(profile?.coins || 0) / 100}
          </Text>
        </Group>
        <div className="text-center">
          <Button className="w-full" onClick={open}>
            Redeem Now
          </Button>
        </div>
      </Paper>
      <Text className="text-[10px] md:text-base" mt={15} color="#656565">
        Note : On every sale and purchase get reward points.
      </Text>
    </>
  );
};
