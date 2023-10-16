import {  Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CircleX } from 'tabler-icons-react';

type ErrorProps={
  ErrorTxt:string |any,
}
export const useErrorModal = ({ErrorTxt="Product Listing Failed"}:ErrorProps): [React.ReactNode, boolean, { open: () => void; close: () => void },]  => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal= (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleX size={60} strokeWidth={1} color={'white'} className="fill-[#eb0808]" />
      <Text  className="text-base font-bold text-center text-black md:text-xl">
        {ErrorTxt}
      </Text>
      
     
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
