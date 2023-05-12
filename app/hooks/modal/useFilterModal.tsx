import { FilterDisplay, FilterDisplayPrice, FilterMenu, FilterPrice, Only } from '@elektra/customComponents';
import { Button, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];

export const useFilterModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [condition, setCondition] = useState<Array<string>>([]);
  const [color, setColor] = useState<Array<string>>([]);
  const [capacity, setCapacity] = useState<Array<string>>([]);
  const [carrier, setCarrier] = useState<Array<string>>([]);
  const [priceRange, setPriceRange] = useState<Array<number>>([]);
  const handleClear = () => {
    setCondition([]);
    setColor([]);
    setPriceRange([]);
    setCapacity([]);
    setCarrier([]);
  };
  const Modal = (
    <div className="mt-5">
      <Only
        when={
          condition.length != 0 ||
          color.length != 0 ||
          capacity.length != 0 ||
          carrier.length != 0 ||
          priceRange.length != 0
        }
      >
        <div>
          <Group position="apart" align="center" my={10}>
            <Text size={15} className="text-black font-semibold">
              Active Filters
            </Text>
            <Button
              styles={{
                root: {
                  borderRadius: 10,
                },
              }}
              onClick={handleClear}
            >
              Clear
            </Button>
          </Group>
          <div className='space-y-3'>
            <FilterDisplay setState={setCondition} state={condition} label="Condition" />
            <FilterDisplay setState={setColor} state={color} label="Color" />
            <FilterDisplay setState={setCapacity} state={capacity} label="Capacity" />
            <FilterDisplay setState={setCarrier} state={carrier} label="Carrier" />
            <FilterDisplayPrice setState={setPriceRange} state={priceRange} label="Price Range" />
          </div>
        </div>
      </Only>
      <div className="mt-5">
        <Text size={15} className="text-black font-semibold my-5">
          Apply Filters
        </Text>
        <Flex gap={10} wrap={'wrap'}>
          <FilterMenu data={conditionData} setState={setCondition} state={condition} label="Condition" width={135} />
          <FilterMenu data={colorData} setState={setColor} state={color} label="Color" width={107} />
          <FilterMenu data={capacityData} setState={setCapacity} state={capacity} label="Capacity" width={129} />
          <FilterMenu data={carrierData} setState={setCarrier} state={carrier} label="Carrier" width={117} />
          <FilterPrice setState={setPriceRange} state={priceRange} label="Price Range" width={148} />
        </Flex>
      </div>
      <Button mt={30} mb={15}>
        Apply Filters
      </Button>
    </div>
  );
  return [Modal, opened, { open, close }];
};
