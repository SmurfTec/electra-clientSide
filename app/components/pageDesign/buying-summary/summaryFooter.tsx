import { Group, Radio, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

export function SummaryFooter() {
  const [checked, setChecked] = useState(false);
  const theme = useMantineTheme();
  return (
    <div style={{ border: '1px solid', borderColor: '#B4B4B4' }} className="p-8 rounded-xl space-y-2 my-8">
      <Group position="center">
        <Radio color={'black'} value={"No"} />

        <Text className='font-[500]' color={'#656565'} size="xl">
          No thanks i dont need any protection plan.
        </Text>
      </Group>
    </div>
  );
}
