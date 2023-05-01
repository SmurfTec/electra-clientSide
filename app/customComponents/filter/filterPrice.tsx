import { Avatar, Button, Center, Menu, MenuProps, RangeSlider, Text, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { CaretDown, CaretUp } from 'tabler-icons-react';

type FilterPriceProps = {
  label: string;
  data: Array<string>;
  state: Array<number>;
  setState: Dispatch<SetStateAction<Array<number>>>;
} & MenuProps;

export const FilterPrice = ({ label, data, state, setState, ...rest }: FilterPriceProps) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [rangeValue, setRangeValue] = useState<[number, number]>([30, 80]);
  const handleState = (value: string) => {
    // if (state.includes(value)) {
    //   setState(state.filter((item) => item !== value));
    //   return;
    // }
    // setState([...state, value]);
  };
  const priceLabel = () => {
    const [l, r] = rangeValue;

    return (
      <Center inline>
        <Text className="text-black font-semibold" size={11}>
          ${l*10}
        </Text>
        <Text className="text-black font-semibold" size={11}>
          {' '}
          -{' '}
        </Text>
        <Text className=" font-semibold" color="rgba(60, 130, 214, 1)" size={11}>
          {r*10}
        </Text>
      </Center>
    );
  };
  return (
    <Menu
      closeOnItemClick={false}
      offset={1}
      opened={opened}
      withinPortal={true}
      radius={0}
      position="bottom"
      onChange={setOpened}
      {...rest}
    >
      <Menu.Target>
        <Button
          classNames={{ root: classes.menufilterbuttonRoot }}
          bg={state.length != 0 ? 'black' : 'rgba(222, 222, 222, 1)'}
          className={state.length != 0 ? 'text-white' : 'text-black'}
          rightIcon={
            opened ? (
              <CaretUp fill={state.length != 0 ? 'white' : 'black'} size={12} />
            ) : (
              <CaretDown fill={state.length != 0 ? 'white' : 'black'} size={12} />
            )
          }
        >
          {label}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item maw={200}>
          {priceLabel()}
          <RangeSlider
            label={null}
            mt={10}
            defaultValue={[20, 80]}
            onChange={setRangeValue}
            thumbChildren={[
              <Avatar src={'/images/LeftRange.png'} size={20} key={1} />,
              <Avatar src={'/images/RightRange.png'} size={20} key={2} />,
            ]}
          />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const useStyles = createStyles(() => ({
  menufilterbuttonRoot: {
    '&:not([data-disabled]):hover': {
      backgroundColor: 'lightgray',
    },
  },
}));
