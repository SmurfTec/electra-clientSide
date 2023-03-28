import { NumberInput } from '@mantine/core';

type BiddingInputProps = {
  title: string;
  value: number;
};

export function BiddingInput({ title, value }: BiddingInputProps) {
  return (
    <div>
      <NumberInput mt={14} p={0}
      styles={
        {root: {
            border: "2.5px solid black !important",
            padding: "6px !important"
            
        },
        input: {
        border: "unset",
        fontSize: "24px",
        fontWeight: "bold"
      },
      label: {
        fontSize: "12px",
        color: "#656565",
        paddingLeft: "14px !important",
        display: "block"
      }
    }}
        hideControls
        // className='border border-2 border-solid border-black'
        label={title}
        defaultValue={value}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
        }
      />
    </div>
  );
}