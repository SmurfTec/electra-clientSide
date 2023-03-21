import { Group, Radio, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

export function SummaryFooter() {
  
  const [checked, setChecked] = useState(false);
  const theme = useMantineTheme();
  return (
    <div
      style={{ border: '1px solid', borderColor: theme.other.color.subTitle }}
      className="p-8 rounded-xl space-y-2 my-8"
    >
      <Group position='center'>
      <Radio color={theme.other.color.primary} checked={checked} onClick={() => setChecked(!checked)} />
          
        <Text color={theme.other.color.subTitle} size="xl">No thanks i dont need any protection plan.</Text>
      </Group>
    </div>
  );
}
