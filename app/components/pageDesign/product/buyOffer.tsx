import { ListItem, ListItemPostContext, Only } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { Variant, condition } from '@elektra/types';
import { ActionIcon, Button, Divider, Grid, Group, Input, NumberInput, Text, Title, Tooltip } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Check, QuestionMark } from 'tabler-icons-react';
import { PositionApart } from '../buying-summary';
import { ButtonChip } from './placeOffer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Dialog } from '@mantine/core';
type ListingDescriptionProps = {
  condition: 'new' | 'used';
  description: string[];
  averageSalePrice?: number;
  lowestAsk: number | null;
  highestAsk: number | null;
  productVariants: Variant[];
  receiptFee: Array<{ id: number; fees: number; title: string; value_type?: string }>;
  price?: number;
  isRepairedBefore?: boolean;
  moreInfo?: string;
  conditionDetails?: string;
  explainRepair?: string | null;
};

export function BuyOfferComponent({
  condition,
  description,
  averageSalePrice,
  productVariants,
  lowestAsk,
  highestAsk,
  receiptFee,
  price,
  conditionDetails,
  isRepairedBefore,
  moreInfo,
  explainRepair,
}: ListingDescriptionProps) {
  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);
  const isNew = condition === 'new';
  const { listItemPost, setListItemPost } = useContext(ListItemPostContext);
  const discount = useSelector((state: RootState) => state.entities.coupon.list.discount) ?? 0;

  const [count, handlers] = useCounter(isNew ? Number(lowestAsk) : 0, { min: 0 });
  const [showNotification, setshowNotification] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    let lowestask = lowestAsk || 0;
    if (count > lowestask) {
      setshowNotification(true);
    }
  }, [count]);

  return (
    <div>
      {showNotification && (
        <Dialog
          position={{ top: 20, left: 20 }}
          opened={showNotification}
          withCloseButton
          onClose={() => setshowNotification(false)}
          size="lg"
          radius="md"
        >
          <Text size="sm" mb="xs" fw={500}>
            You can buy the item at lowest ask
          </Text>
        </Dialog>
      )}
      <Text className="font-semibold uppercase" size="sm">
        Condition
      </Text>
      {/* <Group>
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
      </Group> */}

      <div className="my-4">
        <ButtonChip
          data={[isNew ? 'New' : 'Used']}
          initialValue={isNew ? 'New' : 'Used'}
          handleState={(value) => {
            setListItemPost((prev) => ({ ...prev, condition: value as condition }));
          }}
        />
      </div>

      <div className="my-8">
        {/* <ListItem className="space-y-4" data={description} icon={<Check size={20} strokeWidth={2} color={'black'} />} /> */}
        <Title order={5} className="font-medium">
          Has your item ever been repaired before?
        </Title>
        {isRepairedBefore ? <Text size={'sm'}>Yes</Text> : <Text size={'sm'}>No</Text>}
        <Text size={'sm'}>{explainRepair}</Text>
      </div>

      <div className="my-8">
        {/* <ListItem className="space-y-4" data={description} icon={<Check size={20} strokeWidth={2} color={'black'} />} /> */}
        <Title order={5} className="font-medium">
          Condition
        </Title>
        <Text size={'sm'}>{conditionDetails}</Text>
      </div>

      <div className="my-8">
        {/* <ListItem className="space-y-4" data={description} icon={<Check size={20} strokeWidth={2} color={'black'} />} /> */}
        <Title order={5} className="font-medium">
          Tell us more about your item?
        </Title>
        <Text size={'sm'}>{moreInfo}</Text>
      </div>

      {productVariants?.map((item, key) => {
        const initialValue = productVariants.length === 1 ? item.value : '';

        return (
          <div key={`variant-${item.id}-${key}`} className="my-4">
            <Text className="my-4 font-semibold uppercase" size="sm">
              {item.variant}
            </Text>
            <ButtonChip
              data={[item.value]}
              initialValue={initialValue}
              handleState={(value) => {
                handleListingVariants(item.id, value);
              }}
            />
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
              value={Number(highestAsk)}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
              }
              disabled
            />
          </Input.Wrapper>
        </Only>
        {/* <Only when={!isNew}>
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
        </Only> */}
      </Group>

      <Group position="apart" spacing={0} className="px-2 py-6 mt-6 border-black border-solid lg:px-32 ">
        <NumberInput
          disabled={true}
          hideControls
          value={Number(lowestAsk)}
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
      </Group>

      <div className="my-8">
        <PositionApart text={'Your Offer'} number={Number(lowestAsk)} />
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <div className="space-y-4">
          {receiptFee?.map((item) => {
            const displayTitle = item.value_type === 'percentage' ? `${item.title} (${item.fees}%)` : item.title;
            const displayFees =
              item.value_type === 'percentage' ? ((Number(lowestAsk) * Number(item.fees)) / 100).toFixed(2) : item.fees;
            return (
              <PositionApart
                key={`${item.id}-${item.title}`}
                text={displayTitle}
                number={Number(displayFees)}
                sign={'+'}
              />
            );
          })}
          <PositionApart text={'Discount'} sign="-" number={Number(discount)} discount />
        </div>
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <PositionApart text={'Total Price'} number={price as number - Number(discount)} />
      </div>

      <Grid>
        <Grid.Col xs={6}>
          <Button
            className="font-[400] text-[16px]"
            uppercase
            onClick={() => router.back()}
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
            href={condition === 'new' ? '/buying-summary' : '/buying-summary/listing'}
            disabled={Number(lowestAsk) == 0}
          >
            Review Purchase
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
