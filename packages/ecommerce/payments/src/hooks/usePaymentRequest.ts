import { useStripe } from '@stripe/react-stripe-js';
import { PaymentRequest } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

export default function usePaymentRequest({
  country = 'IT',
  currency = 'eur',
  label,
  amount,
  requestPayerName = true,
  requestPayerEmail = true,
  requestPayerPhone = true,
}: {
  country?: string;
  currency?: string;
  label: string;
  amount: number;
  requestPayerName?: boolean;
  requestPayerEmail?: boolean;
  requestPayerPhone?: boolean;
}) {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country,
        currency,
        total: {
          label,
          amount,
        },
        requestPayerName,
        requestPayerEmail,
        requestPayerPhone,
      });

      pr.canMakePayment()
        .then((result) => {
          if (result) {
            setPaymentRequest(pr);
          }
        })
        .finally(() => {});
    }
  }, [
    stripe,
    amount,
    currency,
    country,
    label,
    requestPayerName,
    requestPayerEmail,
    requestPayerPhone,
  ]);

  return paymentRequest;
}
