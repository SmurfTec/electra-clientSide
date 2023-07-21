import { Divider, Group, Paper, Radio, Stack, Tabs, Text, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useState } from 'react';
import { Check } from 'tabler-icons-react';
import { BarChart } from './barChart';
import { format } from 'date-fns';
ChartJS.register(...registerables);


const chartdataset3 = [
  { label: 'Price', data: [6000, 6200, 4200] },
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

type ProductChartsProps = {
  data: Array<{
    sales: number;
    price: number;
    month: string;
  }>;
};

export const ProductCharts = ({ data }: ProductChartsProps) => {
  const { classes } = useStyles();
  const [value, setValue] = useState<string>('Sales');
  const phone = useMediaQuery('(max-width: 700px)', false);
  const chartLables1Y = data.map((item) => format(new Date(item.month), 'MMMM'));
  const chartLables6M = data.slice(0,6).map((item) => format(new Date(item.month), 'MMMM'));
  const chartLables3M = data.slice(0,3).map((item) => format(new Date(item.month), 'MMMM'));
  const chartDataSet1YPrice =  { label: 'Price', data: data.map((item) => item.price) };
  const chartDataSet1YSales =  { label: 'Sales', data: data.map((item) => item.sales) };
  const chartDataSet6MPrice =  { label: 'Price', data: data.slice(0,6).map((item) => item.price) };
  const chartDataSet6MSales =  { label: 'Sales', data: data.slice(0,6).map((item) => item.sales) };
  const chartDataSet3MPrice =  { label: 'Price', data: data.slice(0,3).map((item) => item.price) };
  const chartDataSet3MSales =  { label: 'Sales', data: data.slice(0,3).map((item) => item.sales) };
  
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
          <Group position={phone ? 'center' : 'apart'} className="px-0 md:px-10 pt-4">
            <Text className="text-black font-bold text-xl md:text-2xl">Price and Sales History</Text>
            <Tabs.List>
              <Tabs.Tab value="3">3 Months</Tabs.Tab>
              <Tabs.Tab value="6">6 Months</Tabs.Tab>
              <Tabs.Tab value="1">1 Year</Tabs.Tab>
            </Tabs.List>
          </Group>
          <Divider my={2} style={{ border: '1px solid rgba(212, 212, 212, 1)' }} />
          <Tabs.Panel value="3" px={phone ? 0 : 40} pt={20}>
            <BarChart labels={chartLables3M} datasets={value==='Sales'?chartDataSet3MSales:chartDataSet3MPrice} />
          </Tabs.Panel>
          <Tabs.Panel value="6" px={phone ? 0 : 40} pt={20}>
            <BarChart labels={chartLables6M} datasets={value==='Sales'?chartDataSet6MSales:chartDataSet6MPrice} />
          </Tabs.Panel>
          <Tabs.Panel value="1" px={phone ? 0 : 40} pt={20}>
            <BarChart labels={chartLables1Y} datasets={value==='Sales'?chartDataSet1YSales:chartDataSet1YPrice} />
          </Tabs.Panel>
        </Tabs>
        <Group position="right" className="px-5 md:px-10 md:pt-4 pb-4">
          <Radio.Group value={value} onChange={setValue}>
            <Group>
              {['Price', 'Sales'].map((item, index) => {
                return (
                  <Radio
                    key={index}
                    icon={Check}
                    classNames={classes}
                    className="text-black text-base md:text-xl font-medium"
                    value={item}
                    label={item}
                  />
                );
              })}
            </Group>
          </Radio.Group>
        </Group>
      </Stack>
    </Paper>
  );
};
const useStyles = createStyles({
  radio: { background: '#D9D9D9', borderRadius: '0' },
  icon: { transform: 'scale(1.6) !important' },
});
