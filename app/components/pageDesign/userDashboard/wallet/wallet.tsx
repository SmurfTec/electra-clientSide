import { Only } from '@elektra/customComponents';
import { SimpleGrid } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Cashout } from './cashout';
import { WalletLeftSide } from './leftSide';
import { WalletRightSide } from './rightSide';

export const Wallet = () => {
  const [value, toggle] = useToggle<boolean>([false, true]);
  return (
    <SimpleGrid cols={2} mt={20}>
      <div>
        <WalletLeftSide state={!value} toogle={toggle} />
        <Cashout state={value} toogle={toggle} />
      </div>
      <div>
        <Only when={!value}>
          <WalletRightSide />
        </Only>
      </div>
    </SimpleGrid>
  );
};
