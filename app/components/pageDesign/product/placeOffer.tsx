import { ListItem, ListItemPostContext, Modal, Only } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { Variant, condition } from '@elektra/types';
import { ActionIcon, Button, Divider, Grid, Group, Input, NumberInput, Select, Text, Tooltip } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Check, Minus, Plus } from 'tabler-icons-react';
import { PositionApart } from '../buying-summary';
import { useRouter } from 'next/router';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';

type ListingDescriptionProps = {
  condition: 'new' | 'used';
  description: string[];
  averageSalePrice?: number;
  lowestAsk: number;
  highestAsk: number;
  productVariants: Variant[];
  isListing?: boolean;
  receiptFee: Array<{ id: number; fees: number; title: string; value_type?: string }>;
};

export function PlaceOfferComponent({
  condition,
  description,
  isListing,
  productVariants,
  lowestAsk,
  highestAsk,
  receiptFee,
}: ListingDescriptionProps) {
  const [infoModal, infoModalOpen, infoModalHandler] = useInfoModal({
    title: 'You can buy the item at lowest ask',
    description: '',
  });
  const [days, setdays] = useState();
  const [count, handlers] = useCounter(0, { min: 0 });
  const isNew = condition === 'new';
  const discount = useSelector((state: RootState) => state.entities.coupon.list.discount) || 0;
  const { listItemPost, setListItemPost } = useContext(ListItemPostContext);
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

  const getTotalPrice = () => {
    let originalTotalPrice = count;
    let percentageIncrease = 0;
    let fixedValueIncrease = 0;

    // Calculate the total percentage and fixed value increases
    receiptFee?.forEach((fee) => {
      if (fee.value_type === 'percentage') {
        percentageIncrease += (originalTotalPrice * Number(fee.fees)) / 100;
      } else {
        fixedValueIncrease += Number(fee.fees);
      }
    });

    // Apply the increases to the original total price
    let totalPrice = originalTotalPrice + percentageIncrease + fixedValueIncrease;
    return Number(totalPrice.toFixed(2));
  };
  // useEffect(() => {
  //   if (count > lowestAsk) {
  //     // setshowNotification(true);
  //     console.log(infoModalHandler.open());
  //   }
  // }, [count]);

  // useEffect(() => {
  //   // Auto-select the variant if there's only one
  //   if (productVariants?.length === 1) {
  //     const singleVariant = productVariants[0];
  //     handleListingVariants(singleVariant.id, singleVariant.value);
  //   }
  // }, [productVariants, handleListingVariants]);
  const [hasShownModal, setHasShownModal] = useState(false);
  useEffect(() => {
    if (count > lowestAsk && !hasShownModal && isNew) {
      console.log(infoModalHandler.open());
      setHasShownModal(true);
    }
  }, [count, lowestAsk, hasShownModal, infoModalHandler]);
  return (
    <div>
      {/* {showNotification && (
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
      )} */}

      <Modal
        children={infoModal}
        onClose={infoModalHandler.close}
        open={infoModalOpen}
        // open={showNotification}
      />

      <Group>
        <Text className="py-4 font-semibold uppercase sm:py-0" size="sm">
          Select
        </Text>
        {/* <Tooltip
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
        </Tooltip> */}
      </Group>

      <div className="my-4">
        <ButtonChip
          data={[isNew ? 'New' : 'Used']}
          initialValue={condition === 'new' ? 'New' : 'Used'}
          handleState={(value) => {
            setListItemPost((prev) => ({ ...prev, condition: value as condition }));
          }}
        />
      </div>

      <div className="my-8">
        <ListItem className="space-y-4" data={description} icon={<Check size={20} strokeWidth={2} color={'black'} />} />
      </div>

      {productVariants?.map((item, key) => {
        const isOnlyVariant = productVariants.length === 1;
        return (
          <div key={key + item.id} className="my-4">
            <Text className="my-4 font-semibold uppercase" size="sm">
              {item.variant}
            </Text>
            <ButtonChip
              data={[item.value]}
              initialValue={isOnlyVariant ? item.value : undefined}
              handleState={(value) => {
                handleListingVariants(item.id, value);
              }}
            />
          </div>
        );
      })}

      <Group>
        <Only when={isNew}>
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
          <Group>
            <Input.Wrapper label="Offer Expiration" maw={240}>
              <Select
                styles={{
                  input: {
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: '#3C82D6',
                    border: '2px solid #000',
                    maxHeight: '36px',
                  },
                }}
                className="Expiration-dropdown"
                data={[
                  { value: '3', label: '3 Days' },
                  { value: '6', label: '6 Days' },
                ]}
                value={days}
                onChange={(value: any) => setdays(value)}
              />
            </Input.Wrapper>
          </Group>
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
              value={lowestAsk}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
              }
              disabled
            />
          </Input.Wrapper>
          <Group>
            <Input.Wrapper label="Offer Expiration">
              <Select
                styles={{
                  input: {
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: '#3C82D6',
                    border: '2px solid #000',
                    maxHeight: '36px',
                  },
                }}
                className="Expiration-dropdown"
                data={[
                  { value: '3', label: '3 Days' },
                  { value: '6', label: '6 Days' },
                ]}
                value={days}
                onChange={(value: any) => setdays(value)}
              />
            </Input.Wrapper>
          </Group>
        </Only>
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
          {receiptFee?.map((item) => {
            const displayTitle = item.value_type === 'percentage' ? `${item.title} (${item.fees}%)` : item.title;
            const displayFees =
              item.value_type === 'percentage' ? ((Number(count) * Number(item.fees)) / 100).toFixed(2) : item.fees;
            return (
              <PositionApart
                key={`${item.id}-${item.title}`}
                text={displayTitle}
                number={Number(displayFees)}
                sign={'+'}
              />
            );
          })}

          <PositionApart text={'Discount'} number={Number(discount)} discount />
        </div>
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} variant="dashed" size="sm" />
        <PositionApart text={'Total Price'} number={getTotalPrice() - Number(discount)} />
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
            onClick={() => router.back()}
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
            disabled={count === 0 || !days}
            href={
              isListing
                ? `/buying-summary/listing?orderType=placeOffer&bidPrice=${count}&expiration=${days}`
                : `/buying-summary?orderType=placeOffer&bidPrice=${count}&expiration=${days}`
            }
          >
            Review Offer
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}

type ButtonChipProps = {
  data: string[];
  initialValue?: string;
  handleState: (value: string) => void;
  // state: any;
  // setState: Dispatch<SetStateAction<any>>;
};

export function ButtonChip({ data, handleState, initialValue = '' }: ButtonChipProps) {
  const [state, setState] = useState(initialValue);
  return (
    <Group position="left">
      {data.map((item, key) => (
        <Button
          uppercase
          key={item + key}
          size="lg"
          styles={{
            root: {
              color: item !== state ? 'black' : 'white',
              '&:hover': {
                backgroundColor: 'black !important',
                color: 'white !important',
              },
            },
            label: {
              '&:hover': {
                color: 'white !important',
              },
            },
          }}
          bg={item !== state ? '#f1f1f1' : 'black'}
          onClick={() => {
            handleState(item);
            setState(item as condition);
          }}
          className="font-[500] text-[16px]"
        >
          {item}
        </Button>
      ))}
    </Group>
  );
}
