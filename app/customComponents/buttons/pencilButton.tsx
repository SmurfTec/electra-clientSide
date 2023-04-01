import { Button } from '@mantine/core';
import { Pencil } from 'tabler-icons-react';
import { useStylesforGlobal } from '../theme';

type PencilButtonProps = {
  onClick?: () => void;
};

export function PencilButton({ onClick }: PencilButtonProps) {
  const { classes } = useStylesforGlobal();
  return (
    <Button
      onClick={onClick}
      leftIcon={<Pencil size={12} />}
      classNames={{ leftIcon: classes.leftIcon, root: 'p-0 h-5 w-5 ml-2 rounded-2xl' }}
    />
  );
}
