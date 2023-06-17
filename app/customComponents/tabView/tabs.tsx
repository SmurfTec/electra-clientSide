import { Center, ScrollArea, Tabs, TabsListProps, TabsProps } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type tabViewData = {
  title: string;
  content: ReactNode;
};

type tabViewDataProps = { data: Array<tabViewData> } & Omit<TabsProps, 'children'> & Omit<TabsListProps, 'children'>;

export function TabView({ data, position, ...rest }: tabViewDataProps) {
  const router = useRouter();
  return (
    <Tabs color="blue" 
    keepMounted={false}
    value={router.query.tab===undefined? data[0].title.toLowerCase():String(router.query.tab).toLowerCase()}
    onTabChange={(value) => router.push(`?tab=${value}`)} 
    {...rest}>
      <Tabs.List   position={position}>
      <ScrollArea type='never' scrollbarSize={2} h={34}>
        <Center className="md:space-x-6 lg:space-x-10">
        {data.map((item, index) => (
          <Tabs.Tab key={index} value={item.title.toLowerCase()} >
            {item.title}
          </Tabs.Tab>
        ))}
        </Center>
        </ScrollArea>
      </Tabs.List>
      {data.map((item, index) => (
        <Tabs.Panel key={index} value={item.title.toLowerCase()} pt="xs">
          {item.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
export type { tabViewData };
