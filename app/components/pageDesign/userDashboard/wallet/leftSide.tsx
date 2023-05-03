import { Only } from '@elektra/customComponents';
import { Button, Center, Flex, Group, Image, Paper, PaperProps, Stack, Text } from '@mantine/core';

type WalletLeftSide = {
  state: boolean;
  toogle: () => void;
};

export const WalletLeftSide = ({ state, toogle }: WalletLeftSide) => {
  return (
    <Only when={state}>
      <Paper withBorder px={40} radius={20}>
        <Flex wrap="nowrap" className="space-x-10">
          <Stack align="start" spacing={0} mt={40}>
            <Center inline className="space-x-3">
              <Image alt="funds" src={'/images/cash.png'} height={20} width={28} fit="contain" />
              <Text size={14} className="font-medium">
                Available funds
              </Text>
            </Center>
            <Text size={62} className="text-black font-bold">
              $250.00
            </Text>
            <Button className="text-sm font-medium" onClick={toogle}>
              Cashout From Hyperwallet
            </Button>
          </Stack>
          <Image alt="coins" src={'/images/coins.png'} height={250} width={250} fit="contain" />
        </Flex>
      </Paper>
      <Group position="apart" mt={40}>
        <MarketCard
          icon={'/images/marketplace1.png'}
          label="Total Sales"
          amount={330}
          px={38}
          py={40}
          mah={140}
          maw={170}
        />

        <MarketCard
          icon={'/images/marketplace2.png'}
          label="Proceeds"
          amount={215}
          px={40}
          py={40}
          mah={140}
          maw={190}
        />
        <MarketCard
          icon={'/images/marketplace3.png'}
          label="Marketplace fee"
          amount={115}
          px={30}
          py={40}
          mah={140}
          maw={170}
        />
      </Group>
      <Text className="font-medium mt-10" size={14}>
        Note : Total sales = Proceeds + Marketplace fee
      </Text>
    </Only>
  );
};

type MarketCardProps = {
  icon: string;
  label: string;
  amount: number;
} & PaperProps;
function MarketCard({ icon, label, amount, ...rest }: MarketCardProps) {
  return (
    <Paper withBorder radius={25} className="relative" {...rest}>
      <Text className="font-medium" size={14}>
        {label}
      </Text>
      <Text className="text-black font-bold" size={36}>
        ${amount}
      </Text>

      <div className="h-[32px] w-[32px] rounded-full absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          className="absolute -top-1 left-1/2 -translate-x-1/2 translate-y-1/2"
          src={icon}
          width="32px"
          height="32px"
          alt={label}
        />
      </div>
    </Paper>
  );
}
