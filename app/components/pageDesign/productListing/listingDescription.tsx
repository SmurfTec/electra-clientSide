import { ListItem, ListItemPostContext, Only, http } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { ListItemPost, Variant, condition } from '@elektra/types';
import { ActionIcon, Button, Divider, Grid, Group, Input, NumberInput, Text, Tooltip } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Check, Minus, Plus, QuestionMark } from 'tabler-icons-react';
import { PositionApart } from '../buying-summary';
import { ButtonChip } from '../product/placeOffer';

type ListingDescriptionProps = {
  condition: 'new' | 'used';
  description: string[];

  averageSalePrice?: number;
  lowestAsk: number;
  highestAsk: number;
  marketPlaceFee: number;
  saleTax: number;
  shippingFee: number;
  productVariants: Variant[];
};

export function ListingDescription({
  condition,
  description,
  averageSalePrice,
  productVariants,
  lowestAsk,
  highestAsk,

  marketPlaceFee,
  saleTax,
  shippingFee,
}: ListingDescriptionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { listItemPost, setListItemPost } = useContext(ListItemPostContext);
  const [count, handlers] = useCounter(0, { min: 0 });
  const isNew = condition === 'new';
  const discount = useSelector((state: RootState) => state.entities.coupon.list.discount) ?? 0;
  useEffect(() => {
    if (count) setListItemPost((prev) => ({ ...prev, ask: String(count) }));
  }, [count]);
  const handleListingVariants = (id: number, value: string) => {
    const listingVariants = listItemPost?.listingVariants ?? [];
    const index = listingVariants?.findIndex((item) => item.id === id);
    if (index === -1) {
      listingVariants.push({ id, value });
      setListItemPost((prev) => ({ ...prev, ...{ listingVariants: listingVariants } }));
      return;
    }
    listingVariants[index] = { id, value };
    setListItemPost((prev) => ({ ...prev, ...{ listingVariants: listingVariants } }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    const exclusiveKeys = ['condition_details', 'explain_repair', 'more_info', 'is_repaired_before'];

    const numberKeys = ['product', 'ask'];

    Object.keys(listItemPost).map((key) => {
      if (exclusiveKeys.includes(key)) {
        return;
      }
      if (Array.isArray(listItemPost[key as keyof ListItemPost])) {
        listItemPost[key as 'listingVariants'].forEach((item, index) => {
          //@ts-ignore
          formData.append(`listingVariants[${index}][variant]`, item.id);
          formData.append(`listingVariants[${index}][value]`, item.value);
        });
        return;
      }

      if (numberKeys.includes(key)) {
        //@ts-ignore
        formData.append(key, listItemPost[key]);
        return;
      }

      formData.append(key, JSON.stringify(listItemPost[key as keyof ListItemPost]));
    });

    const res = await http.request({
      url: '/listings',
      method: 'POST',
      data: formData,
    });
    if (res.isError) {
      console.log(res);
      setLoading(false);
      return;
    }
    console.log(res);
    setLoading(false);
    notifications.show({
      message: 'Listing placed successfully',
      autoClose: 3000,
    });

    setTimeout(() => {
      router.push('/userdashboard?tab=selling');
    }, 4000);
  };

  return (
    <div>
      <Group>
        <Text className="uppercase font-semibold" size="sm">
          Select Condition
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
        <ButtonChip
          data={['new', 'used']}
          initialValue={condition}
          handleState={(value) => {
            setListItemPost((prev) => ({ ...prev, condition: value as condition }));
          }}
        />
      </div>
      <div className="my-8">
        <ListItem className="space-y-4" data={description} icon={<Check size={20} strokeWidth={2} color={'black'} />} />
      </div>
      {productVariants?.map((item, key) => {
        return (
          <div key={key + item.id} className="my-4">
            <Text className="uppercase font-semibold my-4" size="sm">
              {item.variant}
            </Text>
            <ButtonChip
              data={isNew ? item.values : [item.value]}
              handleState={(value) => {
                handleListingVariants(item.id, value);
              }}
            />
          </div>
        );
      })}
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

      <Group position="apart" spacing={0} className="mt-6 px-2 lg:px-24 py-1 md:py-6 border-black border-solid ">
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
              height: 'auto',
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
        <PositionApart text={'Your Offer'} number={count} />
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <div className="space-y-4">
          <PositionApart text={'MarketPlace Fee (7.5%)'} number={marketPlaceFee} />
          <PositionApart text={'Sales Tax'} number={saleTax} />
          <PositionApart text={'Shipping Fee'} number={shippingFee} />
          {/* <PositionApart text={'Discount'} number={Number(discount)} discount /> */}
        </div>
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <PositionApart text={'Total Price'} number={Number(count + marketPlaceFee + saleTax + shippingFee)} />
      </div>

      <Only when={isNew}>
        <Grid>
          <Grid.Col span={6}>
            <Button
              className="font-[400]"
              uppercase
              disabled={loading}
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
              loading={loading}
              size="xl"
              styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
              bg={'black'}
              onClick={handleSubmit}
            >
              List Item
            </Button>
          </Grid.Col>
        </Grid>
      </Only>
    </div>
  );
}
