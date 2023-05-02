import { Avatar, Button, Center, Flex, Group, Image, Paper, SimpleGrid, Stack, Text } from "@mantine/core"


export const Wallet = () => {
  return (
    <SimpleGrid cols={2} mt={20}>
        <div>
        <Paper withBorder px={40} radius={20}>
            <Flex wrap='nowrap' className="space-x-10">
                <Stack align="start" spacing={0} mt={40}>
                    <Center inline className="space-x-3">
                        <Image src={'/images/cash.png'} height={20} width={28} fit="contain" />
                        <Text size={14} className="font-medium">Available funds</Text>
                    </Center>
                    <Text size={62} className="text-black font-bold">$250.00</Text>
                    <Button className="text-sm font-medium">Cashout From Hyperwallet</Button>
                </Stack>
                <Image src={'/images/coins.png'} height={250} width={250} fit="contain"/>
            </Flex>
        </Paper>
        <Group position="apart">

        </Group>
        </div>
        <div>
            <Paper withBorder radius={20}>
            hey
            </Paper>
        </div>
    </SimpleGrid>
  )
}
