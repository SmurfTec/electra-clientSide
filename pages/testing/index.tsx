import { http } from '@elektra/customComponents';
import { Button } from '@mantine/core';

export default function Testing() {
  const handleTest = async () => {
    const res = await http.request({
      url: '/profiles',
      method: 'PATCH',
      data: {
        card_details_number: '42424242424242424242',
        card_details_expiration_date: '22/09/2025',
        card_details_cvv: '546',
      },
    });
  };

  return (
    <>
      <Button onClick={handleTest}>API Test</Button>
    </>
  );
}
