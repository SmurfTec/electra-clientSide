import { FilterMenu } from '@elektra/customComponents';
import { FilterVariant } from '@elektra/types';
import { Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

type ProductFilterProps = {
  data: FilterVariant[];
  filter: Array<{ id: number; label: string; value: string }>;
  setFilter: Dispatch<SetStateAction<Array<{ id: number; label: string; value: string }>>>;
  fetchListings: (label: string, value: string, id: number) => void;
};
export const ProductFilter = ({ data, filter, setFilter, fetchListings }: ProductFilterProps) => {
  return (
    <div>
      <Group position="right">
        {data.map((item) => (
          <FilterMenu
            key={item.id}
            filterId={Number(item?.id)}
            data={item.values}
            filterState={filter}
            label={item.title}
            fetchListings={fetchListings}
          />
        ))}
      </Group>
    </div>
  );
};
