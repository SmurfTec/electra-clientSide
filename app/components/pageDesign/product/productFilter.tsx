import { FilterMenu } from '@elektra/customComponents';
import { FilterVariant, Variant } from '@elektra/types';
import { Group } from '@mantine/core';
import { useState } from 'react';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];

type ProductFilterProps = {
  data: FilterVariant[];
  fetchListings : (label:string,value:string)=>void
};
export const ProductFilter = ({ data,fetchListings }: ProductFilterProps) => {
  const [condition, setCondition] = useState<Array<string>>([]);
  const [color, setColor] = useState<Array<string>>([]);
  const [capacity, setCapacity] = useState<Array<string>>([]);
  const [carrier, setCarrier] = useState<Array<string>>([]);
  const [rangePrice, setRangePrice] = useState<Array<number>>([]);
  return (
    <div>
      {/* <Flex wrap={'nowrap'} gap={20}>
        {data.map((item)=>(<FilterDisplay key={item.id} setState={setCondition} state={condition} label={item.title} />))}
        <FilterDisplay setState={setCondition} state={condition} label="Condition" />
        <FilterDisplay setState={setColor} state={color} label="Color" />
        <FilterDisplay setState={setCapacity} state={capacity} label="Capacity" />
        <FilterDisplay setState={setCarrier} state={carrier} label="Carrier" />
        <FilterDisplayPrice setState={setRangePrice} state={rangePrice} label="Price Range" />
      </Flex>
      <div></div> */}
      <Group
        // className={
        //   condition.length != 0 || color.length != 0 || capacity.length != 0 || carrier.length != 0 || rangePrice.length!=0
        //     ? 'sm:-mt-40'
        //     : '-mt-16'
        // }
        position="right"
      >
        {data.map((item) => (
          <FilterMenu key={item.id} data={item.values} setState={setCondition} state={condition} label={item.title} fetchListings={fetchListings} />
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
