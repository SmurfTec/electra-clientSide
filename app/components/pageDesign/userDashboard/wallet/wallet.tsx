import {
  Button,
  Center,
  Flex,
  Group,
  Image,
  Menu,
  Paper,
  PaperProps,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { CaretDown, CaretUp, Search } from 'tabler-icons-react';
import { WalletLeftSide } from './leftSide';
import { WalletRightSide } from './rightSide';

export const Wallet = () => {
  
  return (
    <SimpleGrid cols={2} mt={20}>
      <div>
        <WalletLeftSide />
      </div>
      <div>
        <WalletRightSide />
      </div>
    </SimpleGrid>
  );
};
