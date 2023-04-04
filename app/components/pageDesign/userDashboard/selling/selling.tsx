import { Group, SegmentedControl, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { Calendar, Search } from 'tabler-icons-react';
import { DataTable, tableDataType } from '@elektra/customComponents';
import { ActiveSimpleRow, CompletedSimpleRow, PendingSimpleRow } from './rowUI';
import { StateCard } from './stateCard';
import { getHeaderColumn } from './tableColumns';
import { SimpleStatCardProps } from '../../../card';

const pendingTileData: SimpleStatCardProps[] = [
  {
    title: 'Pending Sales',
    value: 5,
    type: 'N/A',
  },
  {
    title: 'Gross Value',
    value: 2000,
    type: '$',
  },
  {
    title: 'Net Value',
    value: 2100,
    type: '$',
  },
];
const completedTileData: SimpleStatCardProps[] = [
  {
    title: 'Total Sale',
    value: 20,
    type: 'N/A',
  },
  {
    title: 'Gross Value',
    value: 3,
    type: '$',
  },
  {
    title: 'Net Value',
    value: 17,
    type: '$',
  },
  {
    title: 'Total Points Eared',
    value: 17,
    type: 'N/A',
  },
];
const activeTileData: SimpleStatCardProps[] = [
  {
    title: 'No of Listings',
    value: 20,
    type: 'N/A',
  },
  {
    title: 'Gross Value',
    value: 2000,
    type: '$',
  },
  {
    title: 'Net Value',
    value: 1900,
    type: '$',
  },
];
const activetabledata = [
  {
    id: '#1',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#2',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#3',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#4',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
];
const pendingtabledata = [
  {
    id: '#11',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped Pending',
  },
  {
    id: '#22',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped',
  },
  {
    id: '#33',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped',
  },
  {
    id: '#44',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped',
  },
];
const completedtabledata = [
  {
    id: '#111',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo:'12',
    status:true,
  },
  {
    id: '#222',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo:'12',
    status:false,
  },
  {
    id: '#333',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo:'12',
    status:true,
  },
  {
    id: '444',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo:'12',
    status:true,
  },
];

export function Selling() {
  const [value, setValue] = useState('active');
  const [search, setSearch] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState({});

  const tableData: tableDataType = {
    active: { columns: getHeaderColumn('active'), data: activetabledata, RowUI: ActiveSimpleRow, tileData: activeTileData },
    pending: { columns: getHeaderColumn('pending'), data: pendingtabledata, RowUI: PendingSimpleRow, tileData: pendingTileData },
    completed: { columns: getHeaderColumn('completed'), data: completedtabledata, RowUI: CompletedSimpleRow, tileData: completedTileData },
  };

  const selected = tableData[value as keyof tableDataType];

  return (
    <div className='mt-5'>
      <Group position="apart">
        <div className="w-2/5">
          <SegmentedControl
            styles={{
              control: {
                border: 'none !important',
              },
            }}
            radius="md"
            size="lg"
            className="w-4/5"
            onChange={setValue}
            data={[
              { label: 'Active', value: 'active' },
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
            ]}
          />
        </div>
        <div>
          <Group position="right">
            <TextInput
              styles={{ input: { backgroundColor: '#F1F1F1' } }}
              radius={'md'}
              size="lg"
              onChange={(event) => setSearch(event.currentTarget.value)}
              icon={<Search />}
              placeholder="Search by Id, name"
            />
            <DateInput
              maxDate={new Date()}
              styles={{ input: { backgroundColor: '#F1F1F1' } }}
              size="lg"
              onChange={(v) => console.log(v)}
              rightSection={<Calendar color="white" fill="black" />}
              placeholder="Filter Date"
              maw={185}
            />
          </Group>
        </div>
      </Group>
      <StateCard data={selected['tileData']} className="my-4" />
      <DataTable
        data={selected.data}
        columns={selected.columns}
        search={search}
        RowUI={selected.RowUI}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
}
