import { Divider } from '@mantine/core';
import { RewardBox } from './rewardBox';
import { RewardInput } from './rewardInput';
import { RewardTable } from './rewardTable';

export function Reward() {
  return (
    <>
      <RewardBox />
      <Divider size={'xs'} className="mt-10 mb-5" />
      <RewardInput />
      <Divider size={'xs'} className="my-10" />
      <RewardTable />
    </>
  );
}
