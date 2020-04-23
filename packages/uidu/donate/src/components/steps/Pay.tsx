import { Payments, PayWithCard } from '@uidu/payments';
import React, { useEffect, useState } from 'react';

export default function Pay({
  stripe,
  provider,
  donation = null,
  currentOrganization,
  donationCampaign = null,
  currentMember = null,
  createPaymentIntent = async amount => ({
    client_secret: 'foo',
  }),
}) {
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    createPaymentIntent(donation?.amount).then(setPaymentIntent);
    return () => {
      setPaymentIntent(null);
    };
  }, []);

  return (
    <Payments
      stripe={stripe}
      scope="donations"
      amount={donation.amount}
      clientSecret={paymentIntent?.client_secret}
      onSuccess={payload => {
        console.log(payload.paymentIntent);
      }}
      provider={provider}
    >
      {paymentProps => (
        <>
          <div className="card card-body mb-3 p-3">
            <dl className="mb-0">
              <dt className="d-flex align-items-center justify-content-between">
                Donazione
                {donation.recurrence === 'month' && (
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
          {currentMember && (
            <div className="card card-body mb-3 p-3">
              <dl className="mb-0">
                <dt>Contatto</dt>
                <dd className="mb-0 text-muted">
                  <address className="mb-0">
                    <span className="text-medium">
                      Stai donando come {currentMember.name}
                    </span>
                    <br />
                    {currentMember.email}
                  </address>
                </dd>
              </dl>
            </div>
          )}
          <PayWithCard
            {...paymentProps}
            providerProps={{ hidePostalCode: true }}
          />
        </>
      )}
    </Payments>
  );
}
