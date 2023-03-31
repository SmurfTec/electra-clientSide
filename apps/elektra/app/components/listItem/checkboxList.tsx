import { Checkbox } from '@mantine/core';

type CheckboxListProps = {
  data: string[];
};

export function CheckboxList({ data }: CheckboxListProps) {
  return (
    <>
      {data.map((item) => {
        return <Checkbox checked label="Checked checkbox" />;
      })}
    </>
  );
}
