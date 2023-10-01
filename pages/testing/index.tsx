import { http } from '@elektra/customComponents';
import { Button } from '@mantine/core';

export default function Testing() {
  const handleTest = async () => {
    const res = await http.request({
      url: '/transactions/me',
    });
  };

  return (
    <>
      <Button onClick={handleTest}>API Test</Button>
    </>
  );
}
