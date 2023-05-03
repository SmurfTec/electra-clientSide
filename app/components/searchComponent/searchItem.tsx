import { ActionIcon, Badge, Divider, Group, Image, Paper, SelectItemProps, Stack, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';

export type SearchItemProps = SelectItemProps & {
  category: string;
  modal: string;
  image: string;
};

export const AutoCompleteItem = forwardRef<HTMLDivElement, SearchItemProps>(
  ({ category, value, image, modal, ...rest }: SearchItemProps, ref) => (
    <div ref={ref} {...rest} >
      <Group position="apart">
        <Group className="space-x-2" align="top">
          <Paper bg={'#F5F5F5'} className="pt-2 flex justify-center  relative">
            <Image height={70} width={60} alt={'product'} src={image} />
          </Paper>
          <Stack align="start" spacing={0}>
            <Text className="font-medium text-black" size={14}>
              {category}
            </Text>
            <Text className="font-bold -mt-2 text-black" size={32}>
              {value}
            </Text>
            <Badge bg="rgba(60, 130, 214, 1)" variant="filled">
              {modal}
            </Badge>
          </Stack>
        </Group>
        <ActionIcon radius={25} variant="filled" color="black">
          <ArrowNarrowRight />
        </ActionIcon>
      </Group>
      <Divider className='absolute w-[94%] mt-4 ' />
    </div>
  )
);
