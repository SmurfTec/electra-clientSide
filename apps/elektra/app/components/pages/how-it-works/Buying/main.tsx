import { TabView, tabViewData } from '@elektra/ui';
import { HIWContent } from '../common/content';

const tabViewData: tabViewData[] = [
  {
    title: 'Place ask or sell now',
    content: <HIWContent content="hey" image="/images/how-it-work/buying-2.png" title="he" />,
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
    <section>
      <div className="mx-16">
        <TabView data={tabViewData} />
      </div>
    </section>
  );
}
