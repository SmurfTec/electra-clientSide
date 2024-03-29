import { Accordion, Divider, SimpleGrid, Title, useMantineTheme } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

export default function FAQ() {
  const theme = useMantineTheme();
  return (
    // <Container size="xl" mt={70}>
    <>
      <Title className="font-bold" mt={70} order={4}>
        FAQs
      </Title>
      <Divider my={'sm'}></Divider>

      {/* TODO: need to remove bottom border from here */}
      
      <Accordion
        className="space-y-10"
        multiple={true}
        chevron={<Plus size="1.8rem" color={'#3C82D6'} />}
        styles={{
          control: {
            border: '1px solid black',
            height: '70px',
            '&[data-active]': {
              backgroundColor: 'black',
              color: '#fff',
            },
          },
          chevron: {
            '&[data-rotate]': {
              transform: 'rotate(45deg)',
            },
          },
          content: {
            padding: '20px 0px',
            border: 'none',
          },
          panel: {
            border: 'none',
            fontSize: '12px',
            color: 'rgba(101, 101, 101, 1)',
          },
        }}
      >
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: '62rem', cols: 3, spacing: 'md' },
            { maxWidth: '48rem', cols: 2, spacing: 'sm' },
            { maxWidth: '36rem', cols: 1, spacing: 'sm' },
          ]}
        >
          <Accordion.Item value="focus-r">
            <Accordion.Control>Lorem ipsum dolor sit amet?</Accordion.Control>
            <Accordion.Panel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras quis ipsum sem. Nunc bibendum mi mauris, eget
              iaculis nisl sagittis ut.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="focus-rin">
            <Accordion.Control>No annoying focus ring</Accordion.Control>
            <Accordion.Panel>
              With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="focus-ri">
            <Accordion.Control>No annoying focus ring</Accordion.Control>
            <Accordion.Panel>
              With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="focus-">
            <Accordion.Control>No annoying focus ring</Accordion.Control>
            <Accordion.Panel>
              With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
            </Accordion.Panel>
          </Accordion.Item>
        </SimpleGrid>
      </Accordion>
    </>
  );
}
