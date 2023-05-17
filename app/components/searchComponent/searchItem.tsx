import { ActionIcon, Badge, Divider, Grid, Image, Paper, SelectItemProps, Stack, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';

export type SearchItemProps = SelectItemProps & {
  category: string;
  modal: string;
  image: string;
};
export const AutoCompleteItem = forwardRef<HTMLDivElement, SearchItemProps>(
  ({ category, value, title, image, modal, ...rest }: SearchItemProps, ref) => (
    <div ref={ref} {...rest}>
      <Grid align="center">
        <Grid.Col span={2} className="space-x-2">
          <Paper bg={'#F5F5F5'} className="pt-2 flex justify-center  relative">
            <Image height={70} width={60} alt={'product'} src={image} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack align="start" spacing={0}>
            <Text className="font-medium text-black" size={14}>
              {category}
            </Text>
            <Text className="font-bold -mt-2 text-black" size={32}>
              {title}
            </Text>
            <Badge bg="rgba(60, 130, 214, 1)" variant="filled">
              {modal}
            </Badge>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          <ActionIcon radius={25} variant="filled" color="black">
            <ArrowNarrowRight />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      <Divider className="absolute w-[94%] mt-4 " />
    </div>
  )
);

AutoCompleteItem.displayName = 'AutoComplete';
