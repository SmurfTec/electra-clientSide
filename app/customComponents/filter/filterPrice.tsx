import { Avatar, Button, Center, Menu, MenuProps, RangeSlider, Text, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { CaretDown, CaretUp } from 'tabler-icons-react';

type FilterPriceProps = {
  label: string;
  state: Array<number>;
  setState: Dispatch<SetStateAction<Array<number>>>;
} & MenuProps;

export const FilterPrice = ({ label, state, setState, ...rest }: FilterPriceProps) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  
  const handleState = (value: [number,number]) => {
    setState(value);
  };
  const priceLabel = () => {
    const [l, r] = state;

    return (
      <Center inline>
        <Text className="text-black font-semibold" size={11}>
          ${l?l*10:300}
        </Text>
        <Text className="text-black font-semibold" size={11}>
          {' '}
          -{' '}
        </Text>
        <Text className=" font-semibold" color="rgba(60, 130, 214, 1)" size={11}>
          {r?r*10:800}
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
            defaultValue={[30,80]}
            
            onChange={handleState}
            thumbChildren={[
              <Avatar src={'/images/LeftRange.png'} size={20} key={'1'} />,
              <Avatar src={'/images/RightRange.png'} size={20} key={'2'} />,
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
