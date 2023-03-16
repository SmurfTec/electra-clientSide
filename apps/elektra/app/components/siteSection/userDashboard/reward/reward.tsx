import { useRedeemInputModal } from '@elektra/hooks';
import { Avatar, Button, Divider, Grid, Group, Paper, Text, Title } from '@mantine/core';
import { Modal } from '../../../modal';
import { Box } from './box';

export function Reward() {
  const [RedeemInputModal, opened, { open, close }] = useRedeemInputModal();
  return (
    <div>
      <div className="my-10">
        <Grid>
          <Grid.Col span={4}>
            <Box
              label="1"
              title="Sell Items"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis ipsum sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis ipsum sem. "
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              label="2"
              title="Get Reward Points"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis ipsum sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis ipsum sem."
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              label="3"
              title="Redeem for discount"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis ipsum sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis ipsum sem."
            />
          </Grid.Col>
        </Grid>
      </div>
      <Divider size={'xs'} className="my-10" />
      <Modal title="Redeem Points" children={RedeemInputModal} onClose={close} open={opened} />
      <Paper shadow="xl" p="xl" className="w-1/6">
        <Group position="center">
          <Avatar src="images/coin.png" size={'md'} radius="lg" />
          <div>
            <Title order={4} className="font-bold">
              250
            </Title>
            <Text fz="sm" c="dimmed">
              Reward Points
            </Text>
          </div>
        </Group>
        <div className="text-center">
          <Button className="w-full" onClick={open}>
            Redeem Now
          </Button>
        </div>
      </Paper>
    </div>
  );
}
