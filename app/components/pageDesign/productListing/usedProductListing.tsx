import { ListItemPostContext } from '@elektra/customComponents';
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Radio,
  SimpleGrid,
  Text,
  Textarea,
  createStyles,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { ListItemPost } from '@elektra/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Check, QuestionMark, Upload, X } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@elektra/store';
import { calculateFees } from '@elektra/customComponents/utils/calculateFees';

type UsedProductListingProps = {
  accessories: string[];
  itemConditions: string[];
  description: string[];
  count: number;
  days: string;
};

const useStyles = createStyles({
  radio: { background: '#D9D9D9', borderRadius: '0' },
  icon: { transform: 'scale(1.6) !important' },
});

export function UsedProductListing({ accessories, description, itemConditions, count, days }: UsedProductListingProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [hasRepairDetails, setHasRepairDetails] = useState(false);
  const [hasConditionSelected, setHasConditionSelected] = useState(false);
  const [hasTypeDescription, setHasTypeDescription] = useState(false);
  const [hasEnoughPhotos, setHasEnoughPhotos] = useState(false);
  const { listItemPost, setListItemPost } = useContext(ListItemPostContext);

  const { fees } = useSelector((state: RootState) => state.entities.fee.list);

  const filterFile = (file: FileWithPath) => {
    return files.filter((item) => item !== file);
  };

  const convertFileToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    fees?.map((fee) => {
      totalPrice += Number(fee.fees);
    });
    totalPrice += count;
    return totalPrice;
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.map((file) => formData.append('images', file));
    setLoading(true);
    const exclusiveKeys = ['condition_details', 'explain_repair', 'more_info', 'is_repaired_before'];

    const numberKeys = ['product', 'ask'];

    Object.keys(listItemPost).map((key) => {
      if (exclusiveKeys.includes(key)) {
        return;
      }
      if (Array.isArray(listItemPost[key as keyof ListItemPost])) {
        listItemPost[key as 'listingVariants']?.forEach((item, index) => {
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

    Promise.all(files.map((file) => convertFileToBase64(file))).then((base64Files) => {
      const data = {
        files: base64Files,
        listItemPost: listItemPost,
        totalPriceAfterFees: getTotalPrice(),
        details: {
          accessories: accessories,
          conditionstatus: itemConditions,
          moredetails: description,
        },
        expiration_date: days,
      };
      localStorage.setItem('UsedListingData', JSON.stringify(data));
    });

    // let data = {
    //   files: files,
    //   listItemPost: listItemPost,
    //   details: {
    //     accessories: accessories,
    //     conditionstatus: itemConditions,
    //     moredetails: description,
    //   },
    // };
    // localStorage.setItem('UsedListingData', JSON.stringify(data));
    const { id } = router.query;
    router.push(`/confirmation/${id}?condition=used`);
    // if(authData.isAuthenticated){
    //   const res = await http.request({
    //     url: '/listings',
    //     method: 'POST',
    //     data: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   if (res.isError) {
    //     setLoading(false);
    //   }
    //   {
    //     setLoading(false);
    //   }
    // }else{
    //   const { id } = router.query;
    //   const targetUrl = `/product-listing/${id}`
    // router.push(`/auth/login?source=${encodeURIComponent(targetUrl)}`);
    // }
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div className="relative" key={index}>
        <Image
          height="155px"
          m={0}
          alt=""
          key={index}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
        <div>
          <X
            onClick={() => setFiles(filterFile(file))}
            className="absolute bg-white cursor-pointer top-2 right-2 rounded-xl"
          />
        </div>
      </div>
    );
  });

  useEffect(() => {
    // Check if repair details are filled if "Yes" is selected
    const repairDetailsValid =
      listItemPost.is_repaired_before !== true || listItemPost.explain_repair?.trim().length > 0;
    setHasRepairDetails(repairDetailsValid);

    // Check if an item condition is selected
    const conditionSelected = !!listItemPost.condition_details;
    setHasConditionSelected(conditionSelected);

    // Check if type description is filled
    const typeDescriptionValid = listItemPost.more_info?.trim().length > 0;
    setHasTypeDescription(typeDescriptionValid);

    // Check if at least 6 photos are uploaded
    const enoughPhotosUploaded = files.length >= 1;
    setHasEnoughPhotos(enoughPhotosUploaded);
  }, [files, listItemPost]);
  console.log(getTotalPrice());
  return (
    <Grid>
      <Grid.Col xs={9}>
        <Badge
          my={12}
          styles={{
            root: { color: 'white', backgroundColor: 'black', padding: '25px 25px' },
            inner: { fontSize: '20px', fontWeight: 'normal', textTransform: 'capitalize' },
          }}
          radius="xl"
        >
          Additional Details
        </Badge>

        <div className="space-y-8">
          {/* <div className="my-4 space-y-4">
            <Text className="font-[500]" size="md">
              What accessories are included?
            </Text>
            <Group>
              {accessories.map((item, key) => {
                return (
                  <Checkbox
                    key={key}
                    icon={Check as FC<{ indeterminate: boolean; className: string }>}
                    styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }}
                    value={item}
                    label={item}
                  />
                );
              })}
            </Group>
          </div> */}

          <div className="my-4 space-y-4">
            <Text className="font-[500]" size="md">
              Has Your item ever Been repaired before? (If yes please describe )
            </Text>

            <Radio.Group
              value={listItemPost.is_repaired_before.toString()}
              onChange={(value: 'true' | 'false') =>
                setListItemPost((prev) => ({ ...prev, is_repaired_before: value === 'true' }))
              }
            >
              <Group>
                {[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' },
                ].map((item, index) => {
                  return <Radio key={index} icon={Check} classNames={classes} value={item.value} label={item.label} />;
                })}
              </Group>
            </Radio.Group>

            {/* Conditionally render Textarea based on radio button value */}
            {listItemPost.is_repaired_before === true && (
              <Textarea
                value={listItemPost.explain_repair}
                onChange={(event) =>
                  setListItemPost((prev) => ({ ...prev, explain_repair: event.currentTarget.value }))
                }
                styles={{
                  input: { border: '2px solid black', borderRadius: '0' },
                  description: { color: 'black', fontSize: '16px' },
                }}
                minRows={4}
              />
            )}
          </div>

          <div className="my-4 space-y-4">
            <Text className="font-[500]" size="md">
              Which Best describes the overall condition of your item?
            </Text>
            <Radio.Group
              value={listItemPost.condition_details || ''}
              onChange={(value) => setListItemPost((prev) => ({ ...prev, condition_details: value }))}
            >
              <Group>
                {itemConditions.map((item, index) => {
                  return (
                    <Radio key={index} icon={Check} classNames={classes} value={item.toLowerCase()} label={item} />
                  );
                })}
              </Group>
            </Radio.Group>
          </div>

          {/* <>
            <ListItem
              className="space-y-4"
              data={description}
              icon={<Check size={20} strokeWidth={2} color={'black'} />}
            />
          </> */}

          <>
            <Textarea
              value={listItemPost.more_info}
              onChange={(event) => setListItemPost((prev) => ({ ...prev, more_info: event.currentTarget.value }))}
              description="Tell us more about type"
              className="font-[500]"
              styles={{
                input: { border: '2px solid black', borderRadius: '0' },
                description: { color: 'black', fontSize: '16px' },
              }}
              minRows={4}
            />
          </>
        </div>
      </Grid.Col>

      <Grid.Col span={12}>
        <Divider color={'rgba(0, 0, 0, 0.08)'} my={20} size="sm" />

        <Badge
          my={12}
          styles={{
            root: { color: 'white', backgroundColor: 'black', padding: '25px 25px' },
            inner: { fontSize: '20px', fontWeight: 'normal', textTransform: 'capitalize', overflow: 'unset' },
          }}
          radius="xl"
        >
          Product Images
        </Badge>
        <Group my={12}>
          <ActionIcon bg={'#E70000'} radius="lg" size="sm" variant="filled">
            <QuestionMark size="1rem" />
          </ActionIcon>
          <Text size="sm">Atleast 6 unique photos are required , front , back , bottom, sides, and one extra</Text>
        </Group>
      </Grid.Col>
      <Grid.Col xs={3}>
        <Dropzone
          onDrop={(value) => setFiles([...files, ...value])}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          styles={{ root: { border: '2px solid black' } }}
          multiple
        >
          <Group position="center" spacing="xl" style={{ minHeight: '120px', pointerEvents: 'none' }}>
            <div className="text-center">
              <Upload size="2rem" />
              <Text size="sm">Drag or click to upload</Text>
            </div>
          </Group>
        </Dropzone>
      </Grid.Col>
      <Grid.Col xs={9}>
        <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {previews}
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={12}>
        <Text color="rgba(101, 101, 101, 1)" size="sm">
          <span className="font-[500] text-black">Note :</span> Use Our Website on your mobile device to upload images
          directly and a faster listing experience.
        </Text>
      </Grid.Col>
      <Grid.Col xs={4}>
        <Grid>
          <Grid.Col span={6}>
            <Button
              className="font-[400] text-[16px]"
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
              className="font-[400] text-[16px]"
              uppercase
              fullWidth
              loading={loading}
              size="xl"
              styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
              bg={'black'}
              onClick={handleSubmit}
              disabled={
                !hasRepairDetails ||
                !hasConditionSelected ||
                !hasTypeDescription ||
                !hasEnoughPhotos ||
                count === 0 ||
                getTotalPrice() < 0
              }
            >
              List Item
            </Button>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
