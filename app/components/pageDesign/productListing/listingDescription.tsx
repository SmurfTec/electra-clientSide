import { ListItem, Only } from '@elektra/customComponents';
import { ActionIcon, Button, Divider, Grid, Group, Input, NumberInput, Text, Tooltip } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import { Check, Minus, Plus, QuestionMark } from 'tabler-icons-react';
import { PositionApart } from '../buying-summary';
import { ButtonChip } from '../product/placeOffer';
import { NextLink } from '@mantine/next';

type ListingDescriptionProps = {
  condition: string;
  description: string[];
  storageData?: string[];
  storage: string;
  carrierData?: string[];
  carrier: string;
  colorData?: string[];
  color: string;
  averageSalePrice?: number;
  lowestAsk: number;
  highestAsk: number;
  marketPlaceFee: number;
  saleTax: number;
  shippingFee: number;
  discount: number;
  setCondition: Dispatch<SetStateAction<string>>;
};

export function ListingDescription({
  carrier,
  color,
  condition,
  description,
  storage,
  averageSalePrice,
  carrierData,
  colorData,
  storageData,
  setCondition,
  lowestAsk,
  highestAsk,
  discount,
  marketPlaceFee,
  saleTax,
  shippingFee,
}: ListingDescriptionProps) {
  const [count, handlers] = useCounter(0, { min: 0 });
  const [storageState, setStorageState] = useState<string>(storage);
  const [carrierState, setCarrierState] = useState<string>(carrier);
  const [colorState, setColorState] = useState<string>(color);
  return (
    <div>
      <Group>
        <Text className="uppercase font-semibold" size="sm">
          Select Condition{' '}
        </Text>
        <Tooltip
          styles={{
            tooltip: {
              color: 'black',
            },
          }}
          position="top-end"
          arrowPosition="center"
          withArrow
          color={'#D9D9D9'}
          label="Multiple variants can be selected in case of new item."
        >
          <ActionIcon size={'xs'} color={'black'} variant="filled">
            <QuestionMark size={'10px'} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <div className="my-4">
        <ButtonChip data={['New', 'Used']} state={condition} setState={setCondition} />
      </div>

      <div className="my-8">
        <ListItem className="space-y-4" data={description} icon={<Check size={20} strokeWidth={2} color={'black'} />} />
      </div>

      <div className="my-4">
        <Text className="uppercase font-semibold my-4" size="sm">
          Storage
        </Text>
        <ButtonChip data={storageData!} setState={setStorageState} state={storageState} />
      </div>

      <div className="my-4">
        <Text className="uppercase font-semibold my-4" size="sm">
          Carrier
        </Text>
        <ButtonChip data={carrierData!} setState={setCarrierState} state={carrierState} />
      </div>
      <div className="my-4">
        <Text className="uppercase font-semibold my-4" size="sm">
          Color
        </Text>
        <ButtonChip data={colorData!} setState={setColorState} state={colorState} />
      </div>

      <Group>
        <Input.Wrapper label="LOWEST ASK" maw={114}>
          <NumberInput
            radius={0}
            styles={{
              input: {
                background: '#F1F1F1',
                fontWeight: 'bold',
                fontSize: '24px',
                color: '#656565;',
              },
            }}
            hideControls
            value={lowestAsk}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
            }
            disabled
          />
        </Input.Wrapper>
        <Only when={!!highestAsk}>
          <Input.Wrapper label="HIGHEST ASK" maw={114}>
            <NumberInput
              radius={0}
              styles={{
                input: {
                  background: '#F1F1F1',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#3C82D6',
                },
              }}
              hideControls
              value={highestAsk}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
              }
              disabled
            />
          </Input.Wrapper>
        </Only>
      </Group>

      <Group position="apart" spacing={0} className="mt-6 px-2 lg:px-24 py-6 border-black border-solid ">
        <ActionIcon component="button" size="lg" color="dark" radius={0} variant="filled" onClick={handlers.decrement}>
          <Minus size={16} color="white" />
        </ActionIcon>
        <NumberInput
          hideControls
          value={count}
          maw={200}
          p={0}
          onChange={handlers.set}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
          }
          styles={{
            input: {
              height: "auto",
              border: 'unset',
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          }}
        />
        <ActionIcon component="button" size="lg" radius={0} color="dark" variant="filled" onClick={handlers.increment}>
          <Plus size={16} color="white" />
        </ActionIcon>
      </Group>

      <div className="my-8">
        <PositionApart  text={'Your Offer'} number={160} />
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <div className="space-y-4">
          <PositionApart  text={'MarketPlace Fee (7.5%)'} number={marketPlaceFee} />
          <PositionApart  text={'Sales Tax'} number={saleTax} />
          <PositionApart  text={'Shipping Fee'} number={shippingFee} />
          <PositionApart  text={'Discount'} number={discount} discount />
        </div>
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <PositionApart  text={'Total Price'} number={183} />
      </div>

      <Only when={condition === 'New'}>
        <Grid>
          <Grid.Col span={6}>
            <Button
              className="font-[400]"
              uppercase
              fullWidth
              size="xl"
              styles={{ root: { color: 'black', '&:hover': { color: 'white' } } }}
              bg={'#D9D9D9'}
            >
              Cancel
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              className="font-[400]"
              uppercase
              fullWidth
              size="xl"
              styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
              bg={'black'}
              component={NextLink}
              href="/confirmation?condition=new"
            >
              List Item
            </Button>
          </Grid.Col>
        </Grid>
      </Only>
    </div>
  );
}

type ButtonChipProps = {
  data: string[];
  state:string
  setState: Dispatch<SetStateAction<string>>;
};


