import { useRedeemInputModal } from '@elektra/hooks';
import { Avatar, Button, Group, Paper, Text, Title } from '@mantine/core';
import { Modal } from '@elektra/customComponents';

export const RewardInput = () => {
  const [RedeemInputModal, count, opened, { open, close }] = useRedeemInputModal();
  
  
  return (
    <>
         
      <Modal title="Redeem Points" children={RedeemInputModal} onClose={close} open={opened} />
      <Paper shadow="xl" p="xl" className="w-1/6">
        <Group position="left">
          <Avatar src="images/coin.png" size={'md'} radius="lg" />
          <div>
            <Text size={40} className="font-bold">
              {count}
            </Text>
            <Text fz="sm" c="dimmed">
              Reward Points
            </Text>
          </div>
        </Group>
        <Group spacing={8}>
          <Avatar src="images/coin.png" size={'xs'} radius="lg" />
          <Text size={15}>
            {count} = ${count / 100}
          </Text>
        </Group>
        <div className="text-center">
          <Button className="w-full" onClick={open}>
            Redeem Now
          </Button>
        </div>
      </Paper>
      <Text fz="sm" mt={15} color="#656565">
        Note : On every sale and purchase get reward points.
      </Text>
    </>
  );
};
