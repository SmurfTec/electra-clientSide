import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { QuestionMark } from 'tabler-icons-react';

type ListingDescriptionProps = {
  condition: string;
  description: string[];
  storageData?: string[];
  storage: string;
  carrierData?: string[];
  carrier: string;
  colorData?: string[];
  color: string;
  averageSalePrice?: number;
  lowestAsk: number;
  highestAsk: number;
  marketPlaceFee: number;
  saleTax: number;
  shippingFee: number;
  discount: number;
};

export function ListingDescription({
  carrier,
  color,
  condition,
  description,
  storage,
  averageSalePrice,
  carrierData,
  colorData,
  storageData,
}: ListingDescriptionProps) {
  return (
    <div>
      <Group>
        <Text className="uppercase font-semibold" size="sm">
          Select Condition{' '}
        </Text>
        <Tooltip
          styles={{
            tooltip: {
              color: 'black',
            },
          }}
          position="top-end"
          arrowPosition="center"
          withArrow
          color={'#D9D9D9'}
          label="Multiple variants can be selected in case of new item."
        >
          <ActionIcon size={'xs'} color={'black'} variant="filled">
            <QuestionMark size={'10px'} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </div>
  );
}
