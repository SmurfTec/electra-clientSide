import { loadGenericCategory, loadNotifications, useAppDispatch } from '@elektra/store';
import { LoadingOverlay } from '@mantine/core';
import { ReactNode, useEffect, useState } from 'react';

export function StaticApiCalls({children}: React.PropsWithChildren) {
  const apiCalls = [ loadGenericCategory, loadNotifications];
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const loadStaticData = async () => {
    setLoading(true);
    Promise.all(
      apiCalls.map(async (item) => {
        await dispatch(item());
      })
    );

    setLoading(false);
  };

  useEffect(() => {
    loadStaticData();
  }, []);

  return <>{loading ? <LoadingOverlay visible={true} /> : children}</>;
}
