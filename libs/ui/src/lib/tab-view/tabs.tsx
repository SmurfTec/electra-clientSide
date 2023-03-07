import { ListProps, TabProps, Tabs, TabsListProps, TabsProps } from '@mantine/core';
import { ReactNode } from 'react';

type tabViewData = {
  title: string;
  content: ReactNode;
};

type tabViewDataProps = { data: Array<tabViewData> } & Omit<TabsProps, 'children'> & Omit<TabsListProps, 'children'>;

export function TabView({ data, position, ...rest }: tabViewDataProps) {
  return (
    <Tabs color="blue" keepMounted={false} defaultValue={data[0].title.toLowerCase()} {...rest}>
      <Tabs.List className="space-x-16" position={position}>
        {data.map((item,index) => (
          <Tabs.Tab key={index} value={item.title.toLowerCase()}>{item.title}</Tabs.Tab>
        ))}
      </Tabs.List>
      {data.map((item,index) => (
        <Tabs.Panel key={index} value={item.title.toLowerCase()} pt="xs">
          {item.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
export type { tabViewData };