import { ColumnDef } from '@tanstack/react-table';

export function getHeaderColumn<T extends { id: string }>() {
  const columns: Array<ColumnDef<T, unknown>> = [
    {
      id: 'id',
      accessorKey: 'id',
      footer: () => null,
      header: 'ID',
    },
    {
      id: 'redeemedPoints',
      accessorKey: 'redeemedPoints',
      footer: () => null,
      header: 'Points Redeemed',
    },
    {
      id: 'redeemedDate',
      accessorKey: 'redeemedDate',
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
