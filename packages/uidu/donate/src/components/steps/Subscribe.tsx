import { Stripe } from '@stripe/stripe-js';
import { FormSection, FormWrapper } from '@uidu/form';
import {
  PaymentMethods,
  PaymentProviderTypes,
  RecurringPayment,
  RecurringPaymentProps,
} from '@uidu/payments';
import { Donation } from '@uidu/schema.d.ts';
import React, { useState } from 'react';

export type SubscribeProps = {
  donation: Partial<Donation>;
  stripe: Stripe | Promise<Stripe | null>;
  subscribeToPlan: (donation: Partial<Donation>, model: any) => Promise<any>;
  onSuccess: RecurringPaymentProps['onSuccess'];
};

export default function Subscribe({
  stripe,
  subscribeToPlan,
  donation,
  onSuccess,
}: SubscribeProps) {
  const [provider, setProvider] = useState<PaymentProviderTypes['id']>('card');

  return (
    <FormWrapper>
      <FormSection isFirst isLast>
        <RecurringPayment
          stripe={stripe}
          stripeBillingDetails={donation.contact?.stripeBillingDetails}
          provider={{ id: provider, name: provider }}
          amount={donation.amount}
          createSubscription={async (payload) =>
            subscribeToPlan(donation, payload)
          }
          label="Recurring donation"
          onSuccess={onSuccess}
        >
          {(paymentProps) => <PaymentMethods {...paymentProps} />}
        </RecurringPayment>
      </FormSection>
    </FormWrapper>
  );
}
