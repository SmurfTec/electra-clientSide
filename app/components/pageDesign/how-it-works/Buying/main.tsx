import { TabView, tabViewData } from '@elektra/customComponents';
import { Container } from '@mantine/core';
import { HIWContent } from '../common/content';

const tabViewData: tabViewData[] = [
  {
    title: 'Place ask or sell now',
    content: (
      <HIWContent
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras quis ipsum sem. Nunc bibendum mi mauris, eget iaculis nisl sagittis ut."
        image="/images/how-it-work/buying-2.png"
        title="We Verifying"
      />
    ),
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
  return (
    <section className="mt-24">
      <Container size="md" className='mb-20'>
        <TabView
          position="center"
          styles={{ 
            tabLabel: {
              textAlign: "center",
            },
            tab: {
              textAlign: "center",
              borderBottom: `2px solid ${'#D9D9D9'}`,
              borderRadius: 0,
              padding: '10px 30px',
              color: '#656565',
              '&[data-active]': {
                backgroundColor: 'white',
                color: 'black',
                borderBottom: '2px solid black',
              },

              '&hover': {
                backgroundColor: 'white',
              },
              '&[data-active]:hover': {
                backgroundColor: 'white',
              },
            },
          }}
          variant="pills"
          data={tabViewData}
        />
      </Container>
    </section>
  );
}
