import { Button, PasswordInput, Stack } from '@mantine/core';
import { useStylesforGlobal } from '../theme';

export const PasswordChangeModel = () => {
  const { classes } = useStylesforGlobal();

  return (
    <>
      <Stack align="center" spacing="xl" className="mt-6">
        <div className="space-y-5">
          <PasswordInput
            placeholder="Enter current password"
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
          />
          <PasswordInput
            placeholder="Enter new password"
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
          />
        </div>
      </Stack>
      <div className="text-right mr-[100px]  -mt-[10px]">
        <Button
          styles={{
            root: {
              padding: 'unset',
              border: 'unset',
              borderRadius: 'unset',
            },
            inner: {
              color: '#B4B4B4',
              background: 'white',
            },
          }}
        >
          Forgot Password ?
        </Button>
      </div>
      <div className="text-center">
        <Button>Update</Button>
      </div>
    </>
  );
};
