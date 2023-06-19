import { Only } from '@elektra/customComponents';
import { RootState, useSelector } from '@elektra/store';
import { Button, Center, Grid, Group, Image, Paper, PaperProps, SimpleGrid, Stack, Text, clsx, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type WalletLeftSide = {
  state: boolean;
  toogle: () => void;
};

export const WalletLeftSide = ({ state, toogle }: WalletLeftSide) => {
  const  profile  = useSelector((state: RootState) => state.auth.profile);
  const mediumdScreen = useMediaQuery('(min-width: 800px)', true);
  return (
    <Only when={state}>
      <Paper withBorder p={30} radius={mediumdScreen ? 20 : 5}>
        <SimpleGrid cols={2} spacing={70}>
            <Stack align="start" spacing={0}>
              <Center inline className="space-x-3">
                <Image alt="funds" src={'/images/cash.png'} height={20} width={28} fit="contain" />
                <Text size={14} className="font-medium">
                  Available funds
                </Text>
              </Center>
              <Text className="text-black text-[40px] md:text-[62px] font-bold">${profile?.available_funds}</Text>
              <Button className="text-xs   md:text-sm font-medium" onClick={toogle}>
                Cashout From Hyperwallet
              </Button>
            </Stack>
            <Image
              alt="coins"
              src={'/images/coins.png'}
              fit="contain"
            />
        </SimpleGrid>
      </Paper>
      <Grid mt={20}>
        <Grid.Col span={4}>
          <MarketCard
            withBorder={mediumdScreen ? true : false}
            icon={'/images/marketplace1.png'}
            label="Total Sales"
            amount={Number(profile?.totalsales)}
            p={30}
            
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MarketCard
            withBorder={mediumdScreen ? true : false}
            icon={'/images/marketplace2.png'}
            label="Proceeds"
            amount={Number(profile?.proceeds)}
            p={30}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MarketCard
            withBorder={mediumdScreen ? true : false}
            icon={'/images/marketplace3.png'}
            label="Marketplace fee"
            amount={Number(profile?.marketplace_fees)}
            p={30}
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
  const { classes } = useStyles();
  return (
    <Paper radius={25} className="relative" {...rest}>
      <div className="text-center">
        <Text className="text-[10px]  font-medium">{label}</Text>
        <Text className={clsx("text-black font-bold",classes.amount)}>${amount}</Text>
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

const useStyles = createStyles((theme) => ({
  amount: {
    fontSize:35,
    [theme.fn.smallerThan(1080)]: {
      fontSize:28,
    },
    [theme.fn.smallerThan(900)]: {
      fontSize:20,
    },
    [theme.fn.smallerThan(768)]: {
      fontSize:16,
    },
  }

}));
