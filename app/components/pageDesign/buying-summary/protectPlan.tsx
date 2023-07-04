import { ListItem } from '@elektra/customComponents';
import { Group, Radio, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { CircleCheck } from 'tabler-icons-react';

type ProtectPlanProps = {
  id: number;
  title: string;
  price: number;
  content: string[];
};

export function ProtectPlan({ title, price, content, id }: ProtectPlanProps) {
  const theme = useMantineTheme();
  return (
    <div
      style={{ border: '1px solid', borderColor: '#B4B4B4', minHeight: '65vh !important', overflowY: 'auto' }}
      className="p-8 rounded-xl space-y-10"
    >
      <Group position="apart">
        <Group className="space-x-4">
          <Radio color={'black'} value={id+title}  />
          <Text className="font-bold" size="xl">
            {title}
          </Text>
        </Group>
        <Group>
          <Text className="font-bold" size="xl" color={'#3C82D6'}>
            ${price.toFixed(2)}
          </Text>
        </Group>
      </Group>

      <Group className="space-y-4">
        {/* {content.map((c, key) => {
          return <IconWithText key={key} text={c} />;
        })} */}

        <ListItem
          className="space-y-5"
          styles={{ item: { color: '#B4B4B4', fontSize: '13px' } }}
          data={content}
          icon={<CircleCheck className="-ml-1" fill={'#3C82D6'} color={'white'} size={30} />}
        />
      </Group>
    </div>
  );
}

type IconWithTextProps = {
  text: string;
  key: number;
};
export function IconWithText({ text, key }: IconWithTextProps) {
  return (
    <Group key={key}>
      <CircleCheck className="-ml-1" fill={'#3C82D6'} color={'white'} size={30} />
      <Text color={'#B4B4B4'} size="sm">
        {text}
      </Text>
    </Group>
  );
}
