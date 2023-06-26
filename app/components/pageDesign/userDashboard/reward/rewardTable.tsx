import { DataTable } from '@elektra/customComponents';
import { RootState, useSelector } from '@elektra/store';
import { Grid, Title } from '@mantine/core';
import { SimpleRow } from './rowUI';
import { getHeaderColumn } from './tableColumns';

export const RewardTable = () => {
  const userReward = useSelector((state: RootState) => state.entities.userReward.list);
  return (
    <>
      <Title order={4} className="font-bold mb-5">
        Redeem History
      </Title>
      <Grid>
        <Grid.Col span={12} md={5}>
          <DataTable data={userReward} columns={getHeaderColumn()} RowUI={SimpleRow} />
        </Grid.Col>
        <Grid.Col></Grid.Col>
      </Grid>
    </>
  );
};
