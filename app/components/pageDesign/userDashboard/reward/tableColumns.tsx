import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export type UserRewardDataTable = {
  id: number;
  coins: number;
  date: string;
  amount: number;
};

export function getHeaderColumn() {
  const columns: Array<ColumnDef<UserRewardDataTable, unknown>> = [
    {
      id: 'id',
      accessorKey: 'id',
      footer: () => null,
      header: 'ID',
    },
    {
      id: 'coins',
      accessorKey: 'coins',
      footer: () => null,
      header: 'Points Redeemed',
    },
    {
      id: 'date',
      accessorKey: 'date',
      accessorFn: (row) => format(new Date(row.date), 'dd MMM, yyyy'),
      footer: () => null,
      header: 'Redeemed Date',
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      footer: () => null,
      header: 'Amount',
    },
  ];

  return columns;
}
