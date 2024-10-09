'use client';

import { createPaymentIntent, updatePaymentIntent } from '@/requests';
import { ChangeEvent, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';

const stripePromise = loadStripe('PUBLISHABLE_KEY');

const CheckoutFlow = () => {
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null
  );
  const [currency, setCurrency] = useState<string>('usd');

  const handleClickOnCurrency = async (e: ChangeEvent<HTMLSelectElement>) => {
    const paymentIntentId = localStorage.getItem('paymentIntentId')!;

    const { clientSecret } = await updatePaymentIntent(
      paymentIntentId,
      e.target.value
    );
    setStripeClientSecret(clientSecret);

    setCurrency(e.target.value);
  };

  useEffect(() => {
    const initClientSecret = async () => {
      const paymentIntentId = localStorage.getItem('paymentIntentId');

      if (paymentIntentId) {
        const { clientSecret } = await updatePaymentIntent(
          paymentIntentId,
          'usd'
        );
        setStripeClientSecret(clientSecret);
      } else {
        const { clientSecret, paymentIntentId } = await createPaymentIntent(
          'usd'
        );
        localStorage.setItem('paymentIntentId', paymentIntentId);
        setStripeClientSecret(clientSecret);
      }
    };
    initClientSecret();
  }, []);

  return (
    <>
      {stripeClientSecret && (
        <>
          <select onChange={handleClickOnCurrency}>
            <option value='usd'>USD</option>
            <option value='mxn'>MXN</option>
            <option value='eur'>EUR</option>
          </select>
          <Elements
            key={currency}
            stripe={stripePromise}
            options={{
              clientSecret: stripeClientSecret,
            }}
          >
            <PaymentForm />
          </Elements>
        </>
      )}
    </>
  );
};

export default CheckoutFlow;
