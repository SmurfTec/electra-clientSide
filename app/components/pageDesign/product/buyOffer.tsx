import { ListItem, Only } from '@elektra/customComponents';
import { Variant } from '@elektra/types';
import { ActionIcon, Button, Divider, Grid, Group, Input, NumberInput, Text, Tooltip } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { Check, QuestionMark } from 'tabler-icons-react';
import { PositionApart } from '../buying-summary';
import { ButtonChip } from './placeOffer';

type ListingDescriptionProps = {
  condition: 'new' | 'used';
  description: string[];

  averageSalePrice?: number;
  lowestAsk: number | null;
  highestAsk: number | null;
  marketPlaceFee: number;
  saleTax: number;
  shippingFee: number;
  discount: number;
  productVariants: Variant[];
};

export function BuyOfferComponent({
  condition,
  description,
  averageSalePrice,
  productVariants,
  lowestAsk,
  highestAsk,
  discount,
  marketPlaceFee,
  saleTax,
  shippingFee,
}: ListingDescriptionProps) {
  const isNew = condition === 'new';

  const [count, handlers] = useCounter(isNew ? Number(highestAsk) : 0, { min: 0 });
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
        <ButtonChip data={[isNew ? 'New' : 'Used']} state={isNew ? 'New' : 'Used'} />
      </div>

      <div className="my-8">
        <ListItem className="space-y-4" data={description} icon={<Check size={20} strokeWidth={2} color={'black'} />} />
      </div>

      {productVariants?.map((item, key) => {
        return (
          <div key={key + item.color}>
            <div className="my-4">
              <Text className="uppercase font-semibold my-4" size="sm">
                {item.variant}
              </Text>
              <ButtonChip data={isNew ? item.values : [item.value]} state={item.value} />
            </div>
          </div>
        );
      })}

      <Group>
        <Only when={!!isNew}>
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
              value={Number(lowestAsk)}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
              }
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
                value={Number(highestAsk)}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
                }
              />
            </Input.Wrapper>
          </Only>
        </Only>
        <Only when={!isNew}>
          <Input.Wrapper label="Similar items average sale price">
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
              value={Number(averageSalePrice)}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
              }
              disabled
            />
          </Input.Wrapper>
        </Only>
      </Group>

      <Group position="apart" spacing={0} className="mt-6 px-2 lg:px-32 py-6 border-black border-solid ">
        {/* <Only when={!isNew}>
          <ActionIcon
            component="button"
            size="lg"
            color="dark"
            radius={0}
            variant="filled"
            onClick={handlers.decrement}
          >
            <Minus size={16} color="white" />
          </ActionIcon>
        </Only> */}
        <NumberInput
          disabled={true}
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
              height: 'auto',
              border: 'unset',
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          }}
        />
        {/* <Only when={!isNew}>
          <ActionIcon
            component="button"
            size="lg"
            radius={0}
            color="dark"
            variant="filled"
            onClick={handlers.increment}
          >
            <Plus size={16} color="white" />
          </ActionIcon>
        </Only> */}
      </Group>

      <div className="my-8">
        <PositionApart text={'Your Offer'} number={Number(highestAsk)} />
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <div className="space-y-4">
          <PositionApart text={'MarketPlace Fee (7.5%)'} number={marketPlaceFee} />
          <PositionApart text={'Sales Tax'} number={saleTax} />
          <PositionApart text={'Shipping Fee'} number={shippingFee} />
          <PositionApart text={'Discount'} number={discount} discount />
        </div>
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <PositionApart text={'Total Price'} number={Number(highestAsk)} />
      </div>

      <Grid>
        <Grid.Col xs={6}>
          <Button
            className="font-[400] text-[16px]"
            uppercase
            fullWidth
            size="xl"
            styles={{ root: { color: 'black', '&:hover': { color: 'white' } } }}
            bg={'#D9D9D9'}
          >
            Cancel
          </Button>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Button
            className="font-[400] text-[16px]"
            uppercase
            fullWidth
            size="xl"
            styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
            bg={'black'}
            component={NextLink}
            href={condition === "new" ? "/buying-summary" :'/buying-summary/listing'}
          >
            Review Purchase
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
