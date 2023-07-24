import { Button, Menu, MenuProps, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CaretDown, CaretUp, CircleCheck } from 'tabler-icons-react';

type FilterMenuProps = {
  filterId: number;
  label: string;
  data: Array<string>;
  filterState: Array<{ id: number; label: string; value: string }>;
  fetchListings: (label: string, value: string, id: number) => void;
} & MenuProps;

export const FilterMenu = ({ label, data, filterState, fetchListings, filterId, ...rest }: FilterMenuProps) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [state, setState] = useState<string>('');
  const handleState = (value: string) => {
    fetchListings(label, value, filterId);
    if (state.includes(value)) {
      setState('');
      return;
    }
    setState(value);
  };
  useEffect(()=>{
    console.log(filterState,state)
    if(filterState?.length!==0&&state){
      if(filterState?.some((item)=>item.value!==state))
      setState('');
      console.log(state)
    console.log(filterState?.some((item)=>item.value===state))
    // setState('');
    }
  },[filterState,state])
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
        {data
          .map((item, index) => (
            <div key={index}>
              <Menu.Item
                key={index}
                rightSection={
                  state.includes(item) ? (
                    <CircleCheck size={17} color="white" fill="rgba(60, 130, 214, 1)" />
                  ) : undefined
                }
                className="text-base  text-black font-normal"
                onClick={() => handleState(item)}
              >
                {item}
              </Menu.Item>
              {data.length !== index + 1 && <Menu.Divider key={index + 1} />}
            </div>
          ))}
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
