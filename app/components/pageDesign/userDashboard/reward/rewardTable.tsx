import { Grid, Title } from '@mantine/core';
import { DataTable } from '@elektra/customComponents';
import { SimpleRow } from './rowUI';
import { getHeaderColumn } from './tableColumns';

const redeemtabledata = [
  {
    id: '#111',
    redeemedPoints: '252',
    redeemedDate: '20 Aug,2022',
    amount: '$200',
  },
  {
    id: '#111',
    redeemedPoints: '250',
    redeemedDate: '20 Aug,2022',
    amount: '$200',
  },
  {
    id: '#111',
    redeemedPoints: '125',
    redeemedDate: '20 Aug,2022',
    amount: '$200',
  },
  {
    id: '#111',
    redeemedPoints: '200',
    redeemedDate: '20 Aug,2022',
    amount: '$200',
  },
];
export const RewardTable = () => {
  return (
    <>
      <Title order={4} className="font-bold mb-5"   >
        Redeem History
      </Title>
      <Grid>
        <Grid.Col span={12} md={5}>
          <DataTable data={redeemtabledata} columns={getHeaderColumn()} RowUI={SimpleRow} />
        </Grid.Col>
        <Grid.Col></Grid.Col>
      </Grid>
    </>
  );
};
