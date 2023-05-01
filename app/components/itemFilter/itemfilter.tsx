import { FilterDisplay, FilterMenu, FilterPrice } from '@elektra/customComponents';
import { Button, Flex, Group, Stack } from '@mantine/core';
import { useState } from 'react';
import { CaretDown } from 'tabler-icons-react';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];

export const ItemFilter = () => {
  const [condition, setCondition] = useState<Array<string>>([]);
  const [color, setColor] = useState<Array<string>>([]);
  const [capacity, setCapacity] = useState<Array<string>>([]);
  const [carrier, setCarrier] = useState<Array<string>>([]);
  const [price, setPrice] = useState<Array<number>>([]);
  return (
    <Stack>
        <Group position='apart' >
      <div className={'space-x-3'}>
        <FilterMenu data={conditionData} setState={setCondition} state={condition} label="Condition" width={135} />
        <FilterMenu data={colorData} setState={setColor} state={color} label="Color" width={107} />
        <FilterMenu data={capacityData} setState={setCapacity} state={capacity} label="Capacity" width={129} />
        <FilterMenu data={carrierData} setState={setCarrier} state={carrier} label="Carrier" width={117} />
        <FilterPrice data={carrierData} setState={setPrice} state={price} label="Price Range" width={148} />
      </div>
        <Button variant='outline' rightIcon={<CaretDown size={15} />} styles={{root:{
            borderRadius:25
        }}}>Sort By</Button>
      </Group>
      <Flex wrap={'nowrap'} gap={20}>
        <FilterDisplay setState={setCondition} state={condition} label="Condition" />
        <FilterDisplay setState={setColor} state={color} label="Color" />
        <FilterDisplay setState={setCapacity} state={capacity} label="Capacity" />
        <FilterDisplay setState={setCarrier} state={carrier} label="Carrier" />
      </Flex>
    </Stack>
  );
};
