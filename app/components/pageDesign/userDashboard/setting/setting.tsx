import { Button, Divider, Grid, Loader, LoadingOverlay, Switch } from '@mantine/core';
import { Security } from './security';
import { RootState, updateUser, useAppDispatch, useSelector } from '@elektra/store';
import { useState } from 'react';
import { Modal, http } from '@elektra/customComponents';
import { PageTitle } from '@elektra/components';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';

export function Settings() {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [infoModal, infoModalOpen, infoModalHandler] = useInfoModal();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  console.log(profile);
  return (
    <div className="my-5">
      <Modal
        children={infoModal}
        onClose={infoModalHandler.close}
        open={infoModalOpen}
        // open={true}
      />

      <Grid gutter={40}>
        <Grid.Col span={12} md={6}>
          <PageTitle title="Security" className="hidden md:block" />
          <Security />
        </Grid.Col>
      </Grid>
    </div>
  );
}
