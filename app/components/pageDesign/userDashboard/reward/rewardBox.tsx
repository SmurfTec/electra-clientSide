import { Grid } from '@mantine/core';
import { Box } from './box';

export function RewardBox() {
  return (
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
  );
}
