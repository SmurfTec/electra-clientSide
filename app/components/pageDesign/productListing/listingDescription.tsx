// External Libraries
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ActionIcon, Button, Divider, Grid, Group, Input, NumberInput, Text, Tooltip, Select } from '@mantine/core';
import { Check, Minus, Plus, QuestionMark } from 'tabler-icons-react';

// Internal Imports
import { ListItem, ListItemPostContext, Only } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { ListItemPost, Variant, condition } from '@elektra/types';
import { PositionApart } from '../buying-summary';
import { ButtonChip } from '../product/placeOffer';
import { calculateFees } from '@elektra/customComponents/utils/calculateFees';

type handlerprops = {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
};
type ListingDescriptionProps = {
  condition: 'new' | 'used';
  description: string[];
  averageSalePrice?: number;
  lowestAsk: number;
  highestAsk: number;
  productVariants: Variant[];
  count: number;
  handlers: handlerprops;
};

export function ListingDescription({
  condition,
  description,
  lowestAsk,
  highestAsk,
  productVariants,
  count,
  handlers,
}: ListingDescriptionProps) {
  const router = useRouter();
  const [days, setdays] = useState<any>('30');
  const [loading, setLoading] = useState<boolean>(false);
  const { listItemPost, setListItemPost } = useContext(ListItemPostContext);
  const isNew = condition === 'new';
  const discount = useSelector((state: RootState) => state.entities.coupon.list.discount) ?? 0;
  const authData = useSelector((state: any) => state.auth);
  const { fees } = useSelector((state: RootState) => state.entities.fee.list);

  const marketplaceFeeObject = fees.find((fee) => fee.type === 'Marketplace');
  const marketplaceFee = marketplaceFeeObject ? parseFloat(marketplaceFeeObject.fees) : 0;
  const marketplaceFeeSymbol = marketplaceFeeObject && marketplaceFeeObject.value_type === 'percentage' ? '%' : '';

  const salesTaxObject = fees.find((fee) => fee.type === 'Sales Tax');
  const salesTax = salesTaxObject ? parseFloat(salesTaxObject.fees) : 0;
  const salesTaxSymbol = salesTaxObject && salesTaxObject.value_type === 'percentage' ? '%' : '';

  const shippingFeeObject = fees.find((fee) => fee.type === 'Shipping Fee');
  const shippingFee = shippingFeeObject ? parseFloat(shippingFeeObject.fees) : 0;
  const shippingSymbol = shippingFeeObject && shippingFeeObject.value_type === 'percentage' ? '%' : '';

  const calculatedFees = calculateFees(fees, count);
  const calculatedMarketplaceFee = calculatedFees.find((fee) => fee.type === 'Marketplace')?.calculatedFee || 0;
  const calculatedSalesTax = calculatedFees.find((fee) => fee.type === 'Sales Tax')?.calculatedFee || 0;
  const calculatedShippingFee = calculatedFees.find((fee) => fee.type === 'Shipping Fee')?.calculatedFee || 0;

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
  const totalPrice =
    count > 0 ? (count - calculatedMarketplaceFee - calculatedSalesTax - calculatedShippingFee).toFixed(2) : '0.00';
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
      //@ts-ignore
      formData.append(key, listItemPost[key as keyof ListItemPost]);
    });

    if (authData.isAuthenticated) {
      const { id } = router.query;
      const currentDate = new Date();
      const calculatedDate = new Date(currentDate);
      calculatedDate.setDate(currentDate.getDate() + Number(days));
      const totalPrice =
        count > 0 ? (count - calculatedMarketplaceFee - calculatedSalesTax - calculatedShippingFee).toFixed(2) : '0.00';
      const data = {
        price: count,
        expiration_date: calculatedDate,
        shipping_address: authData?.profile?.shipping_address_line_1,
        product: Number(id),
        totalPriceAfterFees: totalPrice,
      };
      localStorage.setItem('ListingData', JSON.stringify(data));
      router.push(`/confirmation/${id}?condition=new`);
    } else {
      const { id } = router.query;
      const targetUrl = `/product-listing/${id}`;
      router.push(`/auth/login?targetUrl=${targetUrl}`);
    }
  };

  return (
    <div>
      <Group>
        <Text className="font-semibold uppercase" size="sm">
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
            <Text className="my-4 font-semibold uppercase" size="sm">
              {item.variant}
            </Text>
            <ButtonChip
              data={isNew ? [item.value] : [item.value]} //item.values
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
        <Input.Wrapper label="HIGHEST OFFER" maw={114}>
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
      </Group>
      <Group>
        <div className="flex flex-col gap-[0px]">
          <p className="text-[18px] font-bold">Ask Expiration</p>
          <Select
            className="Expiration-dropdown !h-[3.25rem]"
            data={[
              { value: '1', label: '1 Days' }, //'7','14','21','30'
              { value: '7', label: '7 Days' },
              { value: '14', label: '14 Days' },
              { value: '21', label: '21 Days' },
              { value: '30', label: '30 Days' },
            ]}
            value={days}
            onChange={(value: any) => setdays(value)}
          />
        </div>
      </Group>
      <Group position="apart" spacing={0} className="px-2 py-1 mt-6 border-black border-solid lg:px-24 md:py-6 ">
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
          <PositionApart
            text={`MarketPlace Fee (${marketplaceFee}${marketplaceFeeSymbol})`}
            number={parseFloat(calculatedMarketplaceFee.toFixed(2))}
            sign={`${count > 0 ? '-' : ''}`}
          />
          <PositionApart
            text={`Sales Tax (${salesTax}${salesTaxSymbol})`}
            number={parseFloat(calculatedSalesTax.toFixed(2))}
            sign={`${count > 0 ? '-' : ''}`}
          />
          <PositionApart
            text={`Shipping Fee (${shippingFee}${shippingSymbol})`}
            number={parseFloat(calculatedShippingFee.toFixed(2))}
            sign={`${count > 0 ? '-' : ''}`}
          />
          {/* <PositionApart text={'Discount'} number={Number(discount)} discount /> */}
        </div>
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <PositionApart text={'Total Price'} number={parseFloat(totalPrice)} />
      </div>

      {/* <Only when={isNew}> */}
      <Only when={listItemPost.condition === 'new'}>
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
              onClick={() => router.back()}
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
              disabled={count == 0}
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
