import { FilterDisplay, FilterDisplayPrice, FilterMenu, FilterPrice, Only } from '@elektra/customComponents';
import { Button, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterVariant, Variant } from '@elektra/types';

const colorData = ['Black', 'Red', 'Blue', 'Green', 'Gold'];
const conditionData = ['Poor', 'Fair', 'Good', 'Great', 'Flawless'];
const capacityData = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const carrierData = ['Ufone', 'Jazz', 'Warid', 'Zong', 'Telenor'];
const brandData = ['Apple', 'Sumsang', 'Oneplus', 'Song', 'Nothing'];
const phoneData = ['11 Pro Max', 'Ultra 22', '7 Pro', '14 Pro', 'Ultra 23'];

type ProductFilterProps = {
  data: FilterVariant[];
  filter: Array<{ id: number; label: string; value: string }>;
  setFilter: Dispatch<SetStateAction<Array<{ id: number; label: string; value: string }>>>;
  fetchListings : (label:string,value:string, id: number)=>void
};

export const useFilterModal = ({data,filter,setFilter,fetchListings}:ProductFilterProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleClear = () => {
    setFilter([])
  };
  const Modal = (
    <div className="mt-5">
      <Only
        when={
          filter.length != 0
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
          {filter?.map((item) => (
                <FilterDisplay key={item.id} setState={setFilter} filter={item} />
              ))}</div>
        </div>
      </Only>
      <div className="mt-5">
        <Text size={15} className="text-black font-semibold my-5">
          Apply Filters
        </Text>
        <Flex gap={10} wrap={'wrap'}>
        {data.map((item) => (
          <FilterMenu
            key={item.id}
            filterId={Number(item?.id)}
            data={item.values}
            filterState={filter}
            label={item.title}
            fetchListings={fetchListings}
          />
        ))}</Flex>
      </div>
      <Button onClick={close} mt={30} mb={15}>
        Apply Filters
      </Button>
    </div>
  );
  return [Modal, opened, { open, close }];
};
