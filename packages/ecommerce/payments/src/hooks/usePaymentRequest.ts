import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

export default function usePaymentRequest({
  country = 'IT',
  currency = 'eur',
  label,
  amount,
  requestPayerName = true,
  requestPayerEmail = true,
  requestPayerPhone = true,
}) {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

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

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
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
