import { Only } from '@elektra/customComponents';
import { SimpleGrid } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Cashout } from './cashout';
import { WalletLeftSide } from './leftSide';
import { WalletRightSide } from './rightSide';

export const Wallet = () => {
  const [value, toggle] = useToggle<boolean>([false, true]);
  return (
    <SimpleGrid cols={2} mt={20} breakpoints={[
      { maxWidth: '48rem', cols: 2, spacing: 'sm' },
      { maxWidth: '36rem', cols: 1, spacing: 'sm' },
    ]}>
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
