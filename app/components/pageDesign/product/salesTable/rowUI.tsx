import { ActionIcon, Button, Group, Text } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';
import { Pencil } from 'tabler-icons-react';

export function SimpleRow(props: CellContext<any, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'action':
      return (
        <Group position="right">
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
          <ActionIcon>
            <Pencil color="white" fill="black" size="1rem" strokeWidth={1} />
          </ActionIcon>
        </Group>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
