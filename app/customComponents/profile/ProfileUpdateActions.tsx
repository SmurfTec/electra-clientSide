import React from 'react';
import { Button } from '@mantine/core';

const UpdateActionsComponent = ({ profileCompleteness, shippingHandler, billingHandler, phoneHandler }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
      {profileCompleteness.missingFields.includes('Shipping Address') && (
        <Button onClick={shippingHandler.open} variant="outline" style={{ justifyContent: 'flex-start' }}>
          Update Shipping Address
        </Button>
      )}
      {profileCompleteness.missingFields.includes('Billing Address') && (
        <Button onClick={billingHandler.open} variant="outline" style={{ justifyContent: 'flex-start' }}>
          Update Billing Address
        </Button>
      )}
      {profileCompleteness.missingFields.includes('Phone Number') && (
        <Button onClick={phoneHandler.open} variant="outline" style={{ justifyContent: 'flex-start' }}>
          Update Phone Number
        </Button>
      )}
    </div>
  );
};

export default UpdateActionsComponent;
