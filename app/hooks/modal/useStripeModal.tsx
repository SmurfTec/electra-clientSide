import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethodResult, loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
      border: '2px solid black',
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

type useStripeModalProps = {
  stripePaymentMethodHandler: (result: PaymentMethodResult) => Promise<void>;
};

export const useStripeModal = ({
  stripePaymentMethodHandler,
}: useStripeModalProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const stripePromise = loadStripe(
    'pk_test_51I67ykEPDzqfAEEDQHqmycdOkXszYeh1wbKmXBorTKXDpskw2Bg4P3XJg29TKU2vaxtapaoVrSZ1RNXVmdEuVxzn00ucyokdAo'
  );

  const Modal = (
    <div className="py-4 text-center space-y-8">
      <Elements stripe={stripePromise}>
        <CardDetailComponent stripePaymentMethodHandler={stripePaymentMethodHandler} />
      </Elements>
    </div>
  );
  return [Modal, opened, { open, close }];
};

type CardDetailProps = {
  stripePaymentMethodHandler: (result: PaymentMethodResult) => Promise<void>;
};

const CardDetailComponent = ({ stripePaymentMethodHandler }: CardDetailProps) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    //@ts-ignore
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: 'Jenny Rosen',
      },
    });
    stripePaymentMethodHandler(result).then(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pt-8">
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Button loading={loading} type="submit" disabled={!stripe}>
        Submit Payment
      </Button>
    </form>
  );
};
