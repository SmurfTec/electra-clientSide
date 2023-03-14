import { Only } from '@elektra/ui';
import { Button, Group, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { ArrowNarrowRight } from 'tabler-icons-react';

type SectionTitleProps = {
  title: string;
  label?: string;
};

export function SectionTitle({ title, label }: SectionTitleProps) {
  return (
    <Group position="apart" mb={20}>
      <Title className="font-bold" order={4}>
        {title}
      </Title>
      <Only when={!!label}>
        <div>
          <Group position="apart">
            <Title order={5}>{label}</Title>
            <Button
              className="rounded-3xl px-4 h-7"
              styles={{
                root: {
                  '&:not([data-disabled]):hover': {
                    backgroundColor: 'white',
                  },
                },
                rightIcon: {
                  marginLeft: 0,
                },
              }}
              rightIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
              variant="outline"
              component={NextLink}
              href="#"
            />
          </Group>
        </div>
      </Only>
    </Group>
  );
}
