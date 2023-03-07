import { TabView, tabViewData, useTheme } from '@elektra/ui';
import { Container } from '@mantine/core';
import { HIWContent } from '../common/content';

const tabViewData: tabViewData[] = [
  {
    title: 'Place ask or sell now',
    content: <HIWContent content="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras quis ipsum sem. Nunc bibendum mi mauris, eget iaculis nisl sagittis ut." image="/images/how-it-work/buying-2.png" title="We Verifying" />,
  },
  {
    title: 'We Verify',
    content: <HIWContent content="hey" image="/images/how-it-work/buying-2.png" title="he" />,
  },
  {
    title: 'We ship to you',
    content: <HIWContent content="hey" image="/images/how-it-work/buying-2.png" title="he" />,
  },
];

export function Buying() {
  const theme = useTheme()
  return (
    <section className='mt-24'>
      <Container size="md">
        <TabView position='center' styles={{
          tab: {
            borderBottom: `2px solid ${theme.other.color.tabs}`,
            borderRadius: 0,
            padding: "10px 30px",
            color: theme.other.color.tabTitle,
            '&[data-active]': {
              backgroundColor: "white",
              color: "black",
              borderBottom: "2px solid black"
            },

            '&hover': {
              backgroundColor: "white",
            },
            '&[data-active]:hover': {
              backgroundColor: "white",
              
            }
            
          }
        }} variant='pills' data={tabViewData} />
    </Container>
    </section>
  );
}
