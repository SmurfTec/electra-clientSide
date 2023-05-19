import { Modal, useStylesforGlobal } from '@elektra/customComponents';
import { useCardModal, useEmailVerificationModel, usePasswordChangeModal, useShippingChangeModal } from '@elektra/hooks';
import { Button, Divider, Group, Switch, Text } from '@mantine/core';
import { Pencil } from 'tabler-icons-react';
import { PageTitle } from '../../../AppTitle';

export function Security() {
  const [PasswordChangeModal, passwordOpened, passwordHandler] = usePasswordChangeModal();
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({email:'dummy@example.com'});
  const { classes } = useStylesforGlobal();
  return (
    <div>
      
      <div className="space-y-8">
        <Group position="apart" align='top' className='md:mt-5'>
          <div>
            <Text  className="text-xs uppercase font-semibold text-black">
              Password
            </Text>
            <Text size={20} className="font-normal text-black">
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
        <Group position="apart"  align='top'>
          <div>
            <Text className="text-xs uppercase font-semibold text-black">
              Shipping Address
            </Text>
            <Text  className=" text-[13px] md:text-base font-semibold text-black">
              16 Street , Town Abc, City, USA , 213434
            </Text>
          </div>
          <Button
            leftIcon={<Pencil />}
            onClick={shippingHandler.open}
            classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}
          ></Button>
        </Group>
        <Modal
          size={800}
          title="Shipping Address"
          className="mx-10 mb-7 mt-4"
          titlePosition="left"
          children={ShippingChangeModal}
          onClose={shippingHandler.close}
          open={shippingOpened}
        />
        <Group position="apart"  align='top'>
          <div>
            <Text className="text-xs uppercase font-semibold text-black">
              Billing Address
            </Text>
            <Text  className="text-[13px] md:text-base font-semibold text-black">
              16 Street , Town Abc, City, USA , 213434
            </Text>
          </div>
          <Button
            leftIcon={<Pencil />}
            onClick={shippingHandler.open}
            classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}
          ></Button>
        </Group>
        <Modal
          size={800}
          title="Billing Address"
          className="mx-10 mb-7 mt-4"
          titlePosition="left"
          children={ShippingChangeModal}
          onClose={shippingHandler.close}
          open={shippingOpened}
        />
        <Group position="apart"  align='top'>
          <div>
            <Text className="text-xs uppercase font-semibold text-black">
              Buying Info
            </Text>
            <Group>
              <Text size={15} className="font-semibold text-black inline-block -mr-3">
                3435
              </Text>
              <Text size={15} className="font-semibold text-black inline-block">
                **** **** ****
              </Text>
              <Divider size={'md'} orientation="vertical" className="inline-block" />
              <Text size={15} className="font-semibold inline-block" c="#3C82D6">
                Mastercard
              </Text>
            </Group>
          </div>
          <Button
            leftIcon={<Pencil />}
            onClick={cardHandler.open}
            classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}
          ></Button>
        </Group>
        <Modal
          size={800}
          title="Buying Info"
          className="mx-10 mb-7 mt-4"
          titlePosition="left"
          children={CardModal}
          onClose={cardHandler.close}
          open={cardOpened}
        />
        <Group position="apart"  align='top'>
          <div>
            <Text className="text-xs uppercase font-semibold text-black">
              Selling Info
            </Text>
            <Group>
              <Text size={15} className="font-semibold text-black inline-block -mr-3">
                3435
              </Text>
              <Text size={15} className="font-semibold text-black inline-block">
                **** **** ****
              </Text>
              <Divider size={'md'} orientation="vertical" className="inline-block" />
              <Text size={15} className="font-semibold inline-block" c="#3C82D6">
                Mastercard
              </Text>
            </Group>
          </div>
          <Button
            leftIcon={<Pencil />}
            onClick={cardHandler.open}
            classNames={{ leftIcon: classes.leftIcon, root: 'px-0 py-2' }}
          ></Button>
        </Group>
        <Divider className='w-full md:hidden block' />
        <Switch
          size="md"
          styles={{
            label: {
              [`@media (min-width: 768px)`]: {
                marginRight: '17rem',
              },
            },
          }}
          onClick={emailHandler.open}
          labelPosition="left"
          
          className="text-black font-semibold"
          label="Enable two factor authentication on your account."
        />
        <Modal title="Email Verification" children={emailModal} onClose={emailHandler.close} open={emailOpened} />
      </div>
    </div>
  );
}
