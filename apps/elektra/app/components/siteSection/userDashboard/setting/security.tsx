import { Modal, useStylesforGlobal } from '@elektra/components';
import { usePasswordChangeModel, useShippingChangeModel } from '@elektra/hooks';
import { Button, Divider, Group, Text } from '@mantine/core';
import { Pencil } from 'tabler-icons-react';
import { PageTitle } from '../../../AppTitle';

export function Security() {
  const [PasswordChangeModal, passwordOpened, passwordHandler] = usePasswordChangeModel();
  const [ShippingChangeModal, ShippingOpened, ShippingHandler] = useShippingChangeModel();
  const { classes } = useStylesforGlobal();
  return (
    <div>
      <PageTitle title="Security" />
      <div className="space-y-8">
        <Group position="apart">
          <div>
            <Text size="lg" className="uppercase font-medium">
              Password
            </Text>
            <Text size="xl" className="font-medium">
              ********
            </Text>
          </div>
          <Button
            leftIcon={<Pencil />}
            onClick={passwordHandler.open}
            classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}
          ></Button>
        </Group>
        <Modal
          title="Changing Password"
          children={PasswordChangeModal}
          onClose={passwordHandler.close}
          open={passwordOpened}
        />
        <Group position="apart">
          <div>
            <Text size="lg" className="uppercase font-medium">
              Shipping Address
            </Text>
            <Text size="lg" className="font-medium">
              16 Street , Town Abc, City, USA , 213434
            </Text>
          </div>
          <Button
            leftIcon={<Pencil />}
            onClick={ShippingHandler.open}
            classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}
          ></Button>
        </Group>
        <Modal
          size={800}
          title="Shipping Address"
          className='mx-10 mb-7 mt-4'
          titlePosition='left'
          children={ShippingChangeModal}
          onClose={ShippingHandler.close}
          open={ShippingOpened}
        />
        <Group position="apart">
          <div>
            <Text size="lg" className="uppercase font-medium">
              Buying Info
            </Text>
            <Group>
              <Text size="lg" className="font-medium inline-block -mr-3">
                3435
              </Text>
              <Text size="lg" className="font-medium inline-block">
                **** **** ****
              </Text>
              <Divider size={'md'} orientation="vertical" className="inline-block" />
              <Text size="lg" className="font-semibold inline-block" c="#3C82D6">
                Mastercard
              </Text>
            </Group>
          </div>
          <Button leftIcon={<Pencil />} classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}></Button>
        </Group>
        <Group position="apart">
          <div>
            <Text size="lg" className="uppercase font-medium">
              Selling Info
            </Text>
            <Group>
              <Text size="lg" className="font-medium inline-block -mr-3">
                3435
              </Text>
              <Text size="lg" className="font-medium inline-block">
                **** **** ****
              </Text>
              <Divider size={'md'} orientation="vertical" className="inline-block" />
              <Text size="lg" className="font-semibold inline-block" c="#3C82D6">
                Mastercard
              </Text>
            </Group>
          </div>
          <Button leftIcon={<Pencil />} classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}></Button>
        </Group>
      </div>
    </div>
  );
}
