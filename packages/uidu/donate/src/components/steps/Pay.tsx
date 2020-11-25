import { Stripe } from '@stripe/stripe-js';
import { FormSection, FormWrapper } from '@uidu/form';
import {
  PaymentMethods,
  PaymentProviderTypes,
  SinglePayment,
  SinglePaymentProps,
} from '@uidu/payments';
import { Donation, DonationCampaign, Organization } from '@uidu/schema.d.ts';
import {
  ScrollableContainer,
  ShellBody,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import React, { useEffect, useState } from 'react';

export type PayProps = {
  provider: PaymentProviderTypes;
  donation: Partial<Donation>;
  donationCampaign?: Partial<DonationCampaign>;
  currentOrganization: Partial<Organization>;
  stripe: Stripe | Promise<Stripe | null>;
  createPaymentIntent: (
    donation: Partial<Donation>,
    model: any,
  ) => Promise<any>;
  onSuccess: SinglePaymentProps['onSuccess'];
};

export default function Pay({
  stripe,
  provider,
  donation = null,
  currentOrganization,
  donationCampaign,
  createPaymentIntent = async (amount) => ({
    client_secret: 'foo',
  }),
  onSuccess,
}: PayProps) {
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    createPaymentIntent(donation, donation?.amount).then(setPaymentIntent);
    return () => {
      setPaymentIntent(null);
    };
  }, [donation, createPaymentIntent]);

  return (
    <>
      <ShellSidebar className="p-4" style={{ width: '35%' }}>
        <div className="card card-body mb-3 p-3">
          <dl className="mb-0">
            <dt className="d-flex align-items-center justify-content-between">
              Donazione
              {donation.subscriptionItem && (
                <span className="badge badge-secondary p-1 px-3">
                  ogni mese
                </span>
              )}
            </dt>
            <dd className="mb-0 text-muted">
              Stai per donare {donation.amount / 100} € a{' '}
              <span className="text-medium">{currentOrganization.name}</span>{' '}
              per il progetto{' '}
              <span className="text-medium">{donationCampaign.name}</span>
            </dd>
          </dl>
        </div>
        {donation.contact && (
          <div className="card card-body mb-3 p-3">
            <dl className="mb-0">
              <dt>Contatto</dt>
              <dd className="mb-0 text-muted">
                <address className="mb-0">
                  <span className="text-medium">
                    Stai donando come {donation.contact.name}
                  </span>
                  <br />
                  {donation.contact.email}
                </address>
              </dd>
            </dl>
          </div>
        )}
      </ShellSidebar>
      <ShellMain>
        <ShellBody>
          <ScrollableContainer>
            <FormWrapper>
              <FormSection name="Payment information" isFirst isLast>
                <SinglePayment
                  stripe={stripe}
                  stripeBillingDetails={donation.contact?.stripeBillingDetails}
                  scope="primary"
                  amount={donation.amount}
                  clientSecret={paymentIntent?.client_secret}
                  onSuccess={onSuccess}
                  provider={provider}
                  label="Donation"
                >
                  {(paymentProps) => <PaymentMethods {...paymentProps} />}
                </SinglePayment>
              </FormSection>
            </FormWrapper>
          </ScrollableContainer>
        </ShellBody>
      </ShellMain>
    </>
  );
}
