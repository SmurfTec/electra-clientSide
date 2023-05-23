import { FilterDisplay, FilterDisplayPrice, FilterMenu, FilterPrice } from '@elektra/customComponents';
import { Button, Flex, Group, Stack } from '@mantine/core';
import { useState } from 'react';
import { CaretDown } from 'tabler-icons-react';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];
const brandData = ['Apple', 'Sumsang', 'Oneplus', 'Song', 'Nothing'];
const phoneData = ['11 Pro Max', 'Ultra 22', '7 Pro', '14 Pro', 'Ultra 23'];

export const ItemFilter = () => {
  const [condition, setCondition] = useState<Array<string>>([]);
  const [color, setColor] = useState<Array<string>>([]);
  const [capacity, setCapacity] = useState<Array<string>>([]);
  const [carrier, setCarrier] = useState<Array<string>>([]);
  const [phone, setPhone] = useState<Array<string>>([]);
  const [brand, setBrand] = useState<Array<string>>([]);
  const [highRange, setHighRange] = useState<Array<number>>([]);
  const [lowRange, setLowRange] = useState<Array<number>>([]);
  return (
    <Stack>
      <Group position="apart">
        <Group spacing={5}>
          <FilterMenu data={phoneData} setState={setPhone} state={phone} label="Phones" width={120} />
          <FilterMenu data={brandData} setState={setBrand} state={brand} label="Brands" width={117} />
          <FilterMenu data={capacityData} setState={setCapacity} state={capacity} label="Capacity" width={129} />
          <FilterMenu data={colorData} setState={setColor} state={color} label="Color" width={107} />
          <FilterMenu data={carrierData} setState={setCarrier} state={carrier} label="Carrier" width={117} />
          <FilterPrice setState={setHighRange} state={highRange} label="Highest Offer" width={148} />
          <FilterPrice setState={setLowRange} state={lowRange} label="Lowest Offer" width={148} />
          <FilterMenu data={conditionData} setState={setCondition} state={condition} label="Condition" width={135} />
        </Group>
        <Button
          variant="outline"
          rightIcon={<CaretDown size={15} />}
          styles={{
            root: {
              borderRadius: 25,
            },
          }}
        >
          Sort By
        </Button>
      </Group>
      <Flex wrap={'wrap'} gap={20}>
        <FilterDisplay setState={setPhone} state={phone} label="Phones" />
        <FilterDisplay setState={setBrand} state={brand} label="Brands" />
        <FilterDisplay setState={setCapacity} state={capacity} label="Capacity" />
        <FilterDisplay setState={setColor} state={color} label="Color" />
        <FilterDisplay setState={setCarrier} state={carrier} label="Carrier" />
        <FilterDisplayPrice setState={setHighRange} state={highRange} label="Highest Offer" />
        <FilterDisplayPrice setState={setLowRange} state={lowRange} label="Lowest Offer" />
        <FilterDisplay setState={setCondition} state={condition} label="Condition" />
      </Flex>
    </Stack>
  );
};
