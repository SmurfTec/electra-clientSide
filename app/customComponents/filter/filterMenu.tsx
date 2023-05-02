import { Button, Menu, MenuProps, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { CaretDown, CaretUp, CircleCheck } from 'tabler-icons-react';

type FilterMenuProps = {
  label: string;
  data: Array<string>;
  state: Array<string>;
  setState: Dispatch<SetStateAction<Array<string>>>;
} & MenuProps;

export const FilterMenu = ({ label, data, state, setState, ...rest }: FilterMenuProps) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const handleState = (value: string) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
      return;
    }
    setState([...state, value]);
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
        {data.map((item, index) => (
          <div key={index}>
            <Menu.Item
              key={index}
              rightSection={
                state.includes(item) ? <CircleCheck size={17} color="white" fill="rgba(60, 130, 214, 1)" /> : undefined
              }
              className="text-base  text-black font-normal"
              onClick={() => handleState(item)}
            >
              {item}
            </Menu.Item>
            {data.length !== index + 1 && <Menu.Divider key={index} />}
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
