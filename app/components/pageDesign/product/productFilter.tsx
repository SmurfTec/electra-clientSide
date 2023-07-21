import { FilterDisplay, FilterMenu } from '@elektra/customComponents';
import { FilterVariant } from '@elektra/types';
import { Flex, Group } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];

type ProductFilterProps = {
  data: FilterVariant[];
  filter: Array<{ id: number; label: string; value: string }>;
  setFilter: Dispatch<SetStateAction<Array<{ id: number; label: string; value: string }>>>;
  fetchListings: (label: string, value: string, id: number) => void;
};
export const ProductFilter = ({ data, filter, setFilter, fetchListings }: ProductFilterProps) => {
  const [condition, setCondition] = useState<Array<string>>([]);
  return (
    <div>
      <Flex wrap={'nowrap'} gap={20}>
        {filter?.map((item) => (
          <FilterDisplay key={item.id} setState={setFilter} filter={item} />
        ))}
      </Flex>
      <div></div>
      <Group
        // className={
        //   condition.length != 0 || color.length != 0 || capacity.length != 0 || carrier.length != 0 || rangePrice.length!=0
        //     ? 'sm:-mt-40'
        //     : '-mt-16'
        // }
        position="right"
      >
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
        {/* <FilterMenu data={conditionData} setState={setCondition} state={condition} label="Condition" width={135} />
        <FilterMenu data={colorData} setState={setColor} state={color} label="Color" width={107} />
        <FilterMenu data={capacityData} setState={setCapacity} state={capacity} label="Capacity" width={129} />
        <FilterMenu data={carrierData} setState={setCarrier} state={carrier} label="Carrier" width={117} />
        <FilterPrice setState={setRangePrice} state={rangePrice} label='Price Range' width={148} /> */}
      </Group>
    </div>
  );
};
