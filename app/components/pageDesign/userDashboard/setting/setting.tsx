import { Grid } from '@mantine/core';
import { Security } from './security';
import { RootState, useSelector } from '@elektra/store';
import { useState, useEffect } from 'react';
import { Modal } from '@elektra/customComponents';
import { PageTitle } from '@elektra/components';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';

export function Settings() {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [missingInfo, setMissingInfo] = useState('');
  const [infoModal, infoModalOpen, infoModalHandler] = useInfoModal({ description: missingInfo });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    if (isInitialLoad) {
      let missingFields = [];
      if (!profile?.billing_address_line_1) missingFields.push('Billing Address');
      if (!profile?.shipping_address_line_1) missingFields.push('Shipping Address');

      if (missingFields.length > 0) {
        setMissingInfo(`Please add ${missingFields.join(' and ')} to continue selling and purchasing.`);
        infoModalHandler.open();
      }

      setIsInitialLoad(false);
    }
  }, [profile, isInitialLoad, infoModalHandler]);

  return (
    <div className="my-5">
      <Modal children={infoModal} onClose={infoModalHandler.close} open={infoModalOpen} />

      <Grid gutter={40}>
        <Grid.Col span={12} md={6}>
          <PageTitle title="Security" className="hidden md:block" />
          <Security />
        </Grid.Col>
      </Grid>
    </div>
  );
}
