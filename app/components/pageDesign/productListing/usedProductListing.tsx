import { ListItem } from '@elektra/customComponents';
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
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
import { NextLink } from '@mantine/next';
import { FC, useState } from 'react';
import { Check, QuestionMark, Upload, X } from 'tabler-icons-react';

type UsedProductListingProps = {
  accessories: string[];
  itemConditions: string[];
  description: string[];
};

const useStyles = createStyles({
  radio: { background: '#D9D9D9', borderRadius: '0' },
  icon: { transform: 'scale(1.6) !important' },
});

export function UsedProductListing({ accessories, description, itemConditions }: UsedProductListingProps) {
  const { classes } = useStyles();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const filterFile = (file: FileWithPath) => {
    return files.filter((item) => item !== file);
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div className="relative" key={index}>
        <Image
          height="155px"
          m={0}
          alt=''
          key={index}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
        <div>
          <X
            onClick={() => setFiles(filterFile(file))}
            className="absolute top-2 right-2 cursor-pointer bg-white rounded-xl"
          />
        </div>
      </div>
    );
  });
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
          <div className="space-y-4 my-4">
            <Text className="font-[500]" size="md">
              What accessories are included?
            </Text>
            <Group>
              {accessories.map((item, key) => {
                return (
                  <Checkbox
                    key={key}
                    icon={Check as FC<{ indeterminate: boolean; className: string; }>}
                    styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }}
                    value={item}
                    label={item}
                  />
                );
              })}
            </Group>
          </div>

          <div className="space-y-4 my-4">
            <Text className="font-[500]" size="md">
              Has Your item ever Been repaired before? (If yes please describe )
            </Text>

            <Radio.Group>
              <Group>
                {['Yes', 'No'].map((item,index) => {
                  return <Radio key={index} icon={Check} classNames={classes} value={item} label={item} />;
                })}
              </Group>
            </Radio.Group>

            <Textarea
              styles={{
                input: { border: '2px solid black', borderRadius: '0' },
                description: { color: 'black', fontSize: '16px' },
              }}
              minRows={4}
            />
          </div>

          <div className="space-y-4 my-4">
            <Text className="font-[500]" size="md">
              Which Best describes the overall condition of your item?
            </Text>{' '}
            <Radio.Group>
              <Group>
                {itemConditions.map((item,index) => {
                  return <Radio key={index} icon={Check} classNames={classes} value={item} label={item} />;
                })}
              </Group>
            </Radio.Group>
          </div>

          <>
            <ListItem
              className="space-y-4"
              data={description}
              icon={<Check size={20} strokeWidth={2} color={'black'} />}
            />
          </>

          <>
            <Textarea
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
          {' '}
          Product Images
        </Badge>
        <Group my={12}>
          <ActionIcon bg={'#E70000'} radius="lg" size="sm" variant="filled">
            <QuestionMark size="1rem" />
          </ActionIcon>{' '}
          <Text size="sm">Atleast 6 unique photos are required , front , back , bottom, sides, and one extra</Text>
        </Group>
      </Grid.Col>
      <Grid.Col xs={3}>
        <Dropzone
          onDrop={(value) => setFiles([...files, ...value])}
          onReject={(files) => console.log('rejected files', files)}
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
              className="font-[400] text-[16px]"
              uppercase
              fullWidth
              
              size="xl"
              styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
              bg={'black'}
              component={NextLink}
              href="/confirmation"
            >
              List Item
            </Button>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
