import { Only } from '@elektra/customComponents';
import { Grid } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Cashout } from './cashout';
import { WalletLeftSide } from './leftSide';
import { WalletRightSide } from './rightSide';

export const Wallet = () => {
  const [value, toggle] = useToggle<boolean>([false, true]);
  return (
    <Grid mt={20}>
      <Grid.Col md={6}>
        <WalletLeftSide state={!value} toogle={toggle} />
        <Cashout state={value} toogle={toggle} />
      </Grid.Col>
      <Grid.Col md={6}>
        <Only when={!value}>
          <WalletRightSide />
        </Only>
      </Grid.Col>
    </Grid>
  );
};
