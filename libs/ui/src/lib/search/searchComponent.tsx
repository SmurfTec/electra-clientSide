import { Avatar, Group, SelectItemProps, Text } from '@mantine/core';
import { forwardRef } from 'react';

type ItemProps = SelectItemProps & {
  image: string;
  label: string;
};

const SearchResult = forwardRef<HTMLDivElement, ItemProps>(({ image, label, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={'df'} />
      <div>
        <Text>{label}</Text>
        <Text size="xs" color="dimmed">
          {label}
        </Text>
      </div>
    </Group>
  </div>
));
