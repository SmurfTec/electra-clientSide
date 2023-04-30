import { FilterDisplay, FilterMenu } from '@elektra/customComponents';
import { Flex, Group } from '@mantine/core';
import { useState } from 'react';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];

export const ProductFilter = () => {
  const [condition, setCondition] = useState<Array<string>>([]);
  const [color, setColor] = useState<Array<string>>([]);
  const [capacity, setCapacity] = useState<Array<string>>([]);
  const [carrier, setCarrier] = useState<Array<string>>([]);
  return (
    <Group position="apart">
      <Flex wrap={'nowrap'} gap={20}>
        <FilterDisplay setState={setCondition} state={condition} label="Condition" />
        <FilterDisplay setState={setColor} state={color} label="Color" />
        <FilterDisplay setState={setCapacity} state={capacity} label="Capacity" />
        <FilterDisplay setState={setCarrier} state={carrier} label="Carrier" />
      </Flex>
      <div></div>
      <div
        className={
          condition.length != 0 || color.length != 0 || capacity.length != 0 || carrier.length != 0
            ? 'space-x-3 -mt-40'
            : 'space-x-3 -mt-16'
        }
      >
        <FilterMenu data={conditionData} setState={setCondition} state={condition} label="Condition" width={135} />
        <FilterMenu data={colorData} setState={setColor} state={color} label="Color" width={107} />
        <FilterMenu data={capacityData} setState={setCapacity} state={capacity} label="Capacity" width={129} />
        <FilterMenu data={carrierData} setState={setCarrier} state={carrier} label="Carrier" width={117} />
      </div>
    </Group>
  );
};
