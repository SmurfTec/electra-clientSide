import { FilterDisplay, FilterDisplayPrice, FilterMenu, FilterPrice, Only } from '@elektra/customComponents';
import { Button, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Variant } from '@elektra/types';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];
const brandData = ['Apple', 'Sumsang', 'Oneplus', 'Song', 'Nothing'];
const phoneData = ['11 Pro Max', 'Ultra 22', '7 Pro', '14 Pro', 'Ultra 23'];

type ProductFilterProps = {
  data: Variant[];
};

export const useFilterModal = ({data}:ProductFilterProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [condition, setCondition] = useState<Array<string>>([]);
  const [color, setColor] = useState<Array<string>>([]);
  const [capacity, setCapacity] = useState<Array<string>>([]);
  const [carrier, setCarrier] = useState<Array<string>>([]);
  const [phone, setPhone] = useState<Array<string>>([]);
  const [brand, setBrand] = useState<Array<string>>([]);
  const [highRange, setHighRange] = useState<Array<number>>([]);
  const [lowRange, setLowRange] = useState<Array<number>>([]);
  const handleClear = () => {
    setCondition([]);
    setColor([]);
    setHighRange([]);
    setLowRange([]);
    setCapacity([]);
    setCarrier([]);
    setPhone([]);
    setBrand([]);
  };
  const Modal = (
    <div className="mt-5">
      {/* <Only
        when={
          condition.length != 0 ||
          color.length != 0 ||
          capacity.length != 0 ||
          carrier.length != 0 ||
          highRange.length != 0 ||
          lowRange.length != 0 ||
          phone.length != 0 ||
          brand.length != 0
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
          <div className="space-y-3">
            <FilterDisplay setState={setPhone} state={phone} label="Phones" />
            <FilterDisplay setState={setBrand} state={brand} label="Brands" />
            <FilterDisplay setState={setCapacity} state={capacity} label="Capacity" />
            <FilterDisplay setState={setColor} state={color} label="Color" />
            <FilterDisplay setState={setCarrier} state={carrier} label="Carrier" />
            <FilterDisplayPrice setState={setHighRange} state={highRange} label="Highest Offer" />
            <FilterDisplayPrice setState={setLowRange} state={lowRange} label="Lowest Offer" />
            <FilterDisplay setState={setCondition} state={condition} label="Condition" />
          </div>
        </div>
      </Only> */}
      <div className="mt-5">
        <Text size={15} className="text-black font-semibold my-5">
          Apply Filters
        </Text>
        <Flex gap={10} wrap={'wrap'}>
        {data.map((item) => (
          <FilterMenu key={item.id} data={item.values} setState={setCondition} state={condition} label={item.title} />
        ))}
          {/* <FilterMenu data={phoneData} setState={setPhone} state={phone} label="Phones" width={120} />
          <FilterMenu data={brandData} setState={setBrand} state={brand} label="Brands" width={117} />
          <FilterMenu data={capacityData} setState={setCapacity} state={capacity} label="Capacity" width={129} />
          <FilterMenu data={colorData} setState={setColor} state={color} label="Color" width={107} />
          <FilterMenu data={carrierData} setState={setCarrier} state={carrier} label="Carrier" width={117} />
          <FilterPrice setState={setHighRange} state={highRange} label="Highest Offer" width={148} />
          <FilterPrice setState={setLowRange} state={lowRange} label="Lowest Offer" width={148} />
          <FilterMenu data={conditionData} setState={setCondition} state={condition} label="Condition" width={135} /> */}
        </Flex>
      </div>
      <Button mt={30} mb={15}>
        Apply Filters
      </Button>
    </div>
  );
  return [Modal, opened, { open, close }];
};
