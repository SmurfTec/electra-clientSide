import { Buying, SellingComp } from '@elektra/components';
import { Only, Title } from '@elektra/ui';
import { Container, Divider, SegmentedControl } from '@mantine/core';
import { useState } from 'react';

export default function HowItWorks() {
  const [value, setValue] = useState('B');
  return (
    <Container size="xl" mt={70}>
      <Title className="font-bold" order={4}>
        How it works
      </Title>
      <Divider my={'sm'}></Divider>

      <SegmentedControl
        styles={{
          control: {
            border: 'none !important',
          },
        }}
        size="md"
        className="w-1/3"
        value={value}
        onChange={setValue}
        data={[
          { label: 'Buying', value: 'B' },
          { label: 'Selling', value: 'S' },
        ]}
      />
      <Only when={value === 'B'}>
        <Buying />
      </Only>
      <Only when={value === 'S'}>
        <SellingComp />
      </Only>
    </Container>
  );
}
