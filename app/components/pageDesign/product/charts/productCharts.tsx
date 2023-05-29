import { Badge, Center, Divider, Group, Paper, Stack, Tabs, Text } from '@mantine/core';
import { Chart as ChartJS, registerables } from 'chart.js';
import { BarChart } from './barChart';
import { useMediaQuery } from '@mantine/hooks';
ChartJS.register(...registerables);

const chartLables1Y = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const chartLables6M = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const chartLables3M = [
  'January',
  'February',
  'March',
];
const chartdataset3 = [
  { label: 'Price', data: [6000, 6200, 4200 ] },
  { label: 'Sales', data: [5000, 4800, 4600] },
];
const chartdataset6 = [
  { label: 'Price', data: [4000, 6800, 4900, 3200, 5800, 4000] },
  { label: 'Sales', data: [5800, 4800, 4600, 5200, 4100, 5800] },
];
const chartdataset1 = [
  { label: 'Price', data: [5000, 6800, 4900, 3200, 3800, 4000, 4300, 5400, 5100, 6200, 4200, 4000] },
  { label: 'Sales', data: [6000, 3800, 4600, 6200, 4100, 5000, 4700, 4800, 3600, 9200, 7200, 6900] },
];

export const ProductCharts = () => {
    const phone = useMediaQuery('(max-width: 700px)',false);
  return (
    <Paper withBorder radius={0}>
      <Stack>
        <Tabs
          defaultValue="1"
          styles={{
            tabsList: {
              borderBottom: 'unset',
            },
            tab: {
              paddingBottom: 24,
              '&[data-active]': {
                paddingBottom: 20,
                borderBottom: '5px solid black',
              },
            },
          }}
        >
          <Group position={phone?"center":'apart'} className="px-0 md:px-10 pt-4">
            <Text className="text-black font-bold text-xl md:text-2xl">Price and Sales History</Text>
            <Tabs.List>
              <Tabs.Tab value="3">3 Months</Tabs.Tab>
              <Tabs.Tab value="6">6 Months</Tabs.Tab>
              <Tabs.Tab value="1">1 Year</Tabs.Tab>
            </Tabs.List>
          </Group>
          <Divider my={2} style={{ border: '1px solid rgba(212, 212, 212, 1)' }} />
          <Tabs.Panel value="3" px={phone?0:40} pt={20}>
            <BarChart labels={chartLables3M} datasets={chartdataset3} />
          </Tabs.Panel>
          <Tabs.Panel value="6" px={phone?0:40} pt={20}>
            <BarChart labels={chartLables6M} datasets={chartdataset6} />
          </Tabs.Panel>
          <Tabs.Panel value="1" px={phone?0:40} pt={20}>
            <BarChart labels={chartLables1Y} datasets={chartdataset1} />
          </Tabs.Panel>
        </Tabs>
        <Group position="right" className="px-5 md:px-10 md:pt-4 pb-4">
          <Center className="space-x-3" inline>
            <Badge size="xs" radius={0} bg="rgba(222, 222, 222, 1)" variant="filled" />
            <Text className="text-black text-base md:text-xl font-medium">Price</Text>
          </Center>
          <Center className="space-x-3" inline>
            <Badge size="xs" radius={0} variant="filled" />
            <Text className="text-black text-base md:text-xl font-medium">Sales</Text>
          </Center>
        </Group>
      </Stack>
    </Paper>
  );
};
