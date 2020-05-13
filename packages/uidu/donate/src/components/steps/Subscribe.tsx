import { Stripe } from '@stripe/stripe-js';
import {
  PaymentProviderTypes,
  PayWithBank,
  PayWithCard,
  Subscription,
  SubscriptionProps,
} from '@uidu/payments';
import { Donation } from '@uidu/schema.d.ts';
import React, { useState } from 'react';

export type SubscribeProps = {
  donation: Donation;
  stripe: Stripe | Promise<Stripe | null>;
  subscribeToPlan: (donation: Donation, model: any) => Promise<any>;
  onSuccess: SubscriptionProps['onSuccess'];
};

export default function Subscribe({
  stripe,
  subscribeToPlan,
  donation,
  onSuccess,
}: SubscribeProps) {
  const [provider, setProvider] = useState<PaymentProviderTypes['id']>('card');

  return (
    <>
      <ul className="nav nav-pills mb-3">
        {(['card', 'bank_account'] as Array<PaymentProviderTypes['id']>).map(
          (p) => (
            <li className="nav-item" key={p}>
              <a
                href="#"
                className={`nav-link${provider === p ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setProvider(p);
                }}
              >
                Pay with {p}
              </a>
            </li>
          ),
        )}
      </ul>
      <Subscription
        stripe={stripe}
        stripeBillingDetails={donation.contact.stripeBillingDetails}
        provider={{ id: provider, name: provider }}
        createSubscription={async (payload) =>
          subscribeToPlan(donation, payload)
        }
        onSuccess={onSuccess}
      >
        {(paymentProps) => {
          if (provider === 'bank_account') {
            return (
              <PayWithBank
                {...paymentProps}
                provider={{ name: 'Credit card', id: 'card' }}
                scope="donations"
              />
            );
          }

          return (
            <PayWithCard
              {...paymentProps}
              provider={{ name: 'Credit card', id: 'card' }}
              providerProps={{ hidePostalCode: true }}
              scope="donations"
            />
          );
        }}
      </Subscription>
    </>
  );
}
