import { Button } from '@mantine/core';


type TransparentButtonProps = {
    label?: string,
    onClick?: () => void,
}

export function TransparentButton({ label, onClick }: TransparentButtonProps) {
  return (
    <Button variant="outline" onClick={onClick} className="font-bold rounded-2xl" px="20" h={25}>
      {label}
    </Button>
  );
}
