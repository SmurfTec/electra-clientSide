import { Modal, http, useStylesforGlobal } from '@elektra/customComponents';
import { useCardModal, useEmailVerificationModel, usePasswordChangeModal, useShippingChangeModal } from '@elektra/hooks';
import { Button, Divider, Group, LoadingOverlay, Switch, Text } from '@mantine/core';
import { Pencil } from 'tabler-icons-react';
import {useSelector,RootState} from '@elektra/store'
import { useState } from 'react';

export function Security() {
  const profile = useSelector((state: RootState) => state.entities.auth.profile);
  const [loading, setLoading] = useState<boolean>(false);
  const [PasswordChangeModal, passwordOpened, passwordHandler] = usePasswordChangeModal({});
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({email:'dummy@example.com'});
  const { classes } = useStylesforGlobal();

  const handleVerification = async (value:boolean) =>{
    setLoading(true)
    const res = await http.request({
      url: 'users/me',
      method: 'PATCH',
      data: {
        is_two_step_verification_enabled:value
      },
    });
    if(res.isError){
      console.log(res.errorPayload)
      setLoading(false)
    }
    else{
      console.log(res)
      setLoading(false)
    }
  }
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
              {profile?.shipping_address_line_1?`${profile?.shipping_address_line_1}, ${profile?.shipping_adress_line_2?profile?.shipping_adress_line_2+',':''} ${profile?.shipping_city},  ${profile?.shipping_stateOrProvince}, ${profile?.shipping_country}, ${profile?.shipping_postalcode}`:'-'}
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
            {profile?.billing_address_line_1?`${profile?.billing_address_line_1}, ${profile?.billing_adress_line_2?profile?.billing_adress_line_2+',':''} ${profile?.billing_city},  ${profile?.billing_state_or_province}, ${profile?.billing_country}, ${profile?.billing_postalCode}`:'-'}
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
          className="md:mx-10 mb-7 mt-4"
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
          thumbIcon={<LoadingOverlay visible={loading} radius={'lg'}  />}
            onChange={(event) => handleVerification(event.currentTarget.checked)}
            checked={profile?.is_two_step_verification_enabled??false}
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
