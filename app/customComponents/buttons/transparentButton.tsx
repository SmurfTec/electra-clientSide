import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';


type TransparentButtonProps = {
    label?: string,
    onClick?: () => void,
}

export function TransparentButton({ label, onClick }: TransparentButtonProps) {
  const phone = useMediaQuery('(max-width: 600px)');
  return (
    <Button variant="outline" onClick={onClick} className="font-bold rounded-2xl text-[12px] sm:text-[14px] px-3" h={phone?20:25}>
      {label}
    </Button>
  );
}
