import { Radio, Text } from '@mantine/core';
import { Group, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { CircleCheck } from 'tabler-icons-react';

type ProtectPlanProps = {
  title: string;
  price: number;
  content: string[];
};

export function ProtectPlan({ title, price, content }: ProtectPlanProps) {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ border: '1px solid', borderColor: theme.other.color.subTitle }} className="p-8 rounded-xl space-y-10">
      <Group position="apart">
        <Group className="space-x-4">
          <Radio color={theme.other.color.primary} checked={checked} onClick={() => setChecked(!checked)} />
          <Text className="font-bold" size="xl">
            {title}
          </Text>
        </Group>
        <Group>
          <Text className="font-bold" size="xl" color={theme.other.color.secondary}>
            ${price.toFixed(2)}
          </Text>
        </Group>
      </Group>

      <Group className='space-y-4'>
        {content.map((c, key) => {
          return(
            <IconWithText key={key} text={c} />
          )
        })}
      </Group>
    </div>
  );
}

type IconWithTextProps = {
  text: string,
  key: number
}
export function IconWithText({text, key}: IconWithTextProps) {
  const theme = useMantineTheme();
  return <Group key={key}>
    <CircleCheck className='-ml-1' fill={theme.other.color.secondary} color={"white"} size={30} />
    <Text color={theme.other.color.subTitle} size="sm">{text}</Text>
  </Group>;
}
