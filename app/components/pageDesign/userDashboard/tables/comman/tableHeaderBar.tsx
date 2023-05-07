import { SimpleStatCardProps } from '@elektra/components/card';
import { Grid, Group, SegmentedControl, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import { Calendar, Search } from 'tabler-icons-react';
import { StateCard } from './stateCard';
type TableHeaderBarProps = {
  segmentedstate: string;
  segmentedSetState: Dispatch<SetStateAction<string>>;
  searchstate: string;
  searchSetState: Dispatch<SetStateAction<string>>;
  data: Array<SimpleStatCardProps>;
};

export const TableHeaderBar = ({
  searchSetState,
  data,
  searchstate,
  segmentedSetState,
  segmentedstate,
}: TableHeaderBarProps) => {
  const mediumdScreen = useMediaQuery('(min-width: 1150px)', true);
  return (
    <Grid>
      <Grid.Col span={12} md={6}>
        <div className="w-full">
          <SegmentedControl
            styles={{
              control: {
                border: 'none !important',
              },
            }}
            radius="md"
            size="lg"
            className="w-full"
            value={segmentedstate}
            onChange={segmentedSetState}
            data={[
              { label: 'Active', value: 'active' },
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
            ]}
          />
        </div>
      </Grid.Col>
      <Grid.Col span={12} md={6}>
        
          <Group position={mediumdScreen ? 'right' : 'apart'}>
            <TextInput
              styles={{ input: { backgroundColor: '#F1F1F1' } }}
              radius={'md'}
              size={mediumdScreen ? 'lg' : 'sm'}
              value={searchstate}
              onChange={(event) => searchSetState(event.currentTarget.value)}
              icon={<Search />}
              placeholder="Search by Id, name"
              maw={"65%"}
            />
            <DateInput
              maxDate={new Date()}
              styles={{ input: { backgroundColor: '#F1F1F1' } }}
              size={mediumdScreen ? 'lg' : 'sm'}
              onChange={(v) => console.log(v)}
              rightSection={<Calendar color="white" fill="black" />}
              placeholder="Filter Date"
              maw={mediumdScreen ? '30%' : '35%'}
              // maw={mediumdScreen ? 155 : 120}
            />
          </Group>
        
      </Grid.Col>
      <Grid.Col span={12}>
        <StateCard data={data} className="my-4" />
      </Grid.Col>
    </Grid>
  );
};
