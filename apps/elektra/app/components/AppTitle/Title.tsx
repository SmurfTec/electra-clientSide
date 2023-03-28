import { Title } from '@elektra/ui';
import { Divider } from '@mantine/core';

type PageTitleProps = {
  title: string;
};
export function PageTitle({ title }: PageTitleProps) {
  return (
    <div>
      <Title order={4} className='font-bold'>{title}</Title>
      <Divider className="my-3" />
    </div>
  );
}
