import { Only } from '@elektra/customComponents';
import { Button, Center, Flex, Grid, Image, Paper, PaperProps, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type WalletLeftSide = {
  state: boolean;
  toogle: () => void;
};

export const WalletLeftSide = ({ state, toogle }: WalletLeftSide) => {
  const mediumdScreen = useMediaQuery('(min-width: 1150px)', true);
  return (
    <Only when={state}>
      <Paper withBorder px={mediumdScreen ? 40 : 30} radius={mediumdScreen ? 20 : 5}>
        <Flex wrap="nowrap" gap={0} className="md:space-x-12">
          <Stack align="start" spacing={0} mt={mediumdScreen ? 40 : 15}>
            <Center inline className="space-x-3">
              <Image alt="funds" src={'/images/cash.png'} height={20} width={28} fit="contain" />
              <Text size={14} className="font-medium">
                Available funds
              </Text>
            </Center>
            <Text className="text-black text-[40px] md:text-[62px] font-bold">$250.00</Text>
            <Button className="text-xs   md:text-sm font-medium" onClick={toogle}>
              Cashout From Hyperwallet
            </Button>
          </Stack>
          <Image
            alt="coins"
            src={'/images/coins.png'}
            height={mediumdScreen ? 250 : 150}
            width={mediumdScreen ? 250 : 140}
            fit="contain"
          />
        </Flex>
      </Paper>
      <Grid>
        <Grid.Col span={4}>
          <MarketCard
            withBorder={mediumdScreen ? true : false}
            icon={'/images/marketplace1.png'}
            label="Total Sales"
            amount={330}
            px={30}
            py={40}
            miw={mediumdScreen ? 150 : 100}
            mah={mediumdScreen ? 140 : 100}
          />
        </Grid.Col>
        <Grid.Col span={4}>
        <MarketCard
          withBorder={mediumdScreen ? true : false}
          icon={'/images/marketplace2.png'}
          label="Proceeds"
          amount={215}
          px={30}
          py={40}
          miw={mediumdScreen ? 150 : 100}
          mah={mediumdScreen ? 140 : 100}
        />
        </Grid.Col>
        <Grid.Col span={4}>
        <MarketCard
          withBorder={mediumdScreen ? true : false}
          icon={'/images/marketplace3.png'}
          label="Marketplace fee"
          amount={115}
          px={30}
          py={40}
          miw={mediumdScreen ? 150 : 100}
          mah={mediumdScreen ? 140 : 100}
        />
        </Grid.Col>
      </Grid>
      <Text className="text-[11px] md:text-base font-medium mt-10">
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
    <Paper radius={25} className="relative" {...rest}>
      <div className="text-center">
        <Text className="text-[11px]  font-medium">{label}</Text>
        <Text className="text-base md:text-4xl text-black font-bold">${amount}</Text>
      </div>
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
