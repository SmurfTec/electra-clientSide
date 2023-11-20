import { SimpleStatCardProps } from '@elektra/components/card';
import { Grid, SegmentedControl, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import { Calendar, Search } from 'tabler-icons-react';
import { StateCard } from './stateCard';
import { format } from 'date-fns';
import { Only } from '@elektra/customComponents';
import { useRouter } from 'next/router';
type TableHeaderBarProps = {
  segmentedstate: string;
  segmentedSetState: Dispatch<SetStateAction<string>>;
  searchValuestate: string;
  searchValueSetState: Dispatch<SetStateAction<string>>;
  searchDatestate: string;
  searchDateSetState: Dispatch<SetStateAction<string>>;
  data: Array<SimpleStatCardProps>;
  subTabState?: string;
  setSubTabState?: Dispatch<SetStateAction<string>>;
};

export const TableHeaderBar = ({
  searchValueSetState,
  data,
  searchDateSetState,
  searchDatestate,
  searchValuestate,
  segmentedSetState,
  segmentedstate,
  subTabState,
  setSubTabState,
}: TableHeaderBarProps) => {
  const mediumdScreen = useMediaQuery('(min-width: 1150px)', true);
  const router = useRouter();
  return (
    <Grid align="center">
      <Grid.Col span={12} md={6} py={0}>
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
        <Grid>
          <Grid.Col span={7}>
            <TextInput
              styles={{ input: { backgroundColor: '#F1F1F1' } }}
              radius={'md'}
              size={mediumdScreen ? 'lg' : 'sm'}
              value={searchValuestate}
              onInputCapture={(event) => searchValueSetState(event.currentTarget.value)}
              icon={<Search />}
              placeholder="Search by Id, name"
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <DateInput
              maxDate={new Date()}
              clearable
              unselectable="on"
              styles={{ input: { backgroundColor: '#F1F1F1' } }}
              size={mediumdScreen ? 'lg' : 'sm'}
              onChange={(v) => searchDateSetState(v ? format(new Date(String(v)), 'dd MMM, yyyy') : '')}
              rightSection={<Calendar color="white" fill="black" />}
              placeholder="Filter Date"
            />
          </Grid.Col>
        </Grid>
      </Grid.Col>

      <Only when={router.query.tab === 'selling' && segmentedstate === 'active'}>
        <Grid.Col span={12} md={6} py={0}>
          <div className="w-full">
            <SegmentedControl
              styles={{
                control: {
                  border: 'none !important',
                },
              }}
              color="blue"
              radius="md"
              size="lg"
              className="w-full"
              value={subTabState}
              onChange={setSubTabState}
              data={[
                { label: 'My Listings', value: 'myListings' },
                { label: 'My Asks', value: 'myAsks' },
              ]}
            />
          </div>
        </Grid.Col>
      </Only>
      <Grid.Col span={12}>
        <StateCard data={data} className="my-4" />
      </Grid.Col>
    </Grid>
  );
};
