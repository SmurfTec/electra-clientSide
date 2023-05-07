import { Divider,Title } from '@mantine/core';

type PageTitleProps = {
  title: string;
  className?: string;
};
export function PageTitle({ title,className }: PageTitleProps) {
  return (
    <div className={className}>
      <Title order={4} className='font-bold'>{title}</Title>
      <Divider className="my-3" />
    </div>
  );
}
