import { Text, Title } from '@elektra/ui';
import { Button, SimpleGrid, Stack } from '@mantine/core';
import { Pencil } from 'tabler-icons-react';

export function Profile() {
  return (
    <div className="mt-16">
      <Stack align="flex-start" justify="space-around" spacing="lg">
        <SimpleGrid
          cols={3}
          spacing={200}
          verticalSpacing="xl"
          breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 1200, cols: 3 },
          ]}
        >
          <div>
            <Title order={5} color="black">
              FIRST NAME
            </Title>
            <Text color="black">Huzafa</Text>
          </div>
          <div>
            <Title order={5} color="black">
              LAST NAME
            </Title>
            <Text color="black">Hanif</Text>
          </div>
          <div>
            <Title order={5} color="black">
              EMAIL ADDRESS
            </Title>
            <Text color="black">huzafy@gmail.com</Text>
          </div>
          <div>
            <Title order={5} color="black">
              PHONE NO
            </Title>
            <Text color="black">4523554555</Text>
          </div>
          <div>
            <Title order={5} color="black">
              USERNAME
            </Title>
            <Text color="black">Huzafa123455</Text>
          </div>
        </SimpleGrid>
        <Button className='mt-16' leftIcon={<Pencil />} styles={{
          root:{
            padding:'0px 28px',
            borderRadius:'unset'
          }
        }}>Edit Profile</Button>
      </Stack>
    </div>
  );
}
