import { ActionIcon, Badge, Button, Text } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { Pencil } from 'tabler-icons-react';

export function ActiveSimpleRow<T extends { id: string }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'action':
      return (
        <div>
          <ActionIcon>
            <Pencil color="white" fill="black" size="1rem" strokeWidth={1} />
          </ActionIcon>
        </div>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
export function PendingSimpleRow<T extends { id: string }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'trackingNo':
      return <Text color="#3C82D6">{cell.getValue() as string}</Text>;
    case 'orderStatus':
      return (
        <Badge
          color={String(cell.getValue()).toLowerCase() === 'pending' ? 'blue' : 'red'}
          maw={120}
          radius="sm"
          variant="filled"
        >
          {cell.getValue() as string}
        </Badge>
      );
    case 'action':
      return (
        <Button
          variant="outline"
          styles={{
            root: {
              padding: '0px 10px',

              borderRadius: '30px',
            },
          }}
          radius="xl"
        >
          View Details
        </Button>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
export function CompletedSimpleRow<T extends { id: string }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'action':
      return (
        <div>
          <ActionIcon>
            <Pencil color="white" fill="black" size="1rem" strokeWidth={1} />
          </ActionIcon>
        </div>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
