import { Payments, PayWithCard } from '@uidu/payments';
import React from 'react';

export default function Pay({
  stripe,
  event,
  order = null,
  currentOrganization,
  currentContact = null,
  paymentIntent,
}) {
  return (
    <Payments
      stripe={stripe}
      stripeBillingDetails={currentContact?.stripeBillingDetails}
      scope="events"
      amount={order.stripeAmount}
      clientSecret={paymentIntent?.client_secret}
      onSuccess={(paymentIntent) => {
        console.log(paymentIntent);
      }}
      provider={{ id: 'card', name: 'Credit card' }}
    >
      {(paymentProps) => (
        <>
          <div className="card card-body mb-3 p-3">
            <dl className="mb-0">
              <dt className="d-flex align-items-center justify-content-between">
                Donazione
              </dt>
              <dd className="mb-0 text-muted">
                Stai per donare {order.stripeAmount / 100} € a{' '}
                <span className="text-medium">{currentOrganization.name}</span>{' '}
                per il progetto{' '}
                <span className="text-medium">{event.name}</span>
              </dd>
            </dl>
          </div>
          {currentContact && (
            <div className="card card-body mb-3 p-3">
              <dl className="mb-0">
                <dt>Contatto</dt>
                <dd className="mb-0 text-muted">
                  <address className="mb-0">
                    <span className="text-medium">
                      Stai donando come {currentContact.name}
                    </span>
                    <br />
                    {currentContact.email}
                  </address>
                </dd>
              </dl>
            </div>
          )}
          <PayWithCard {...paymentProps} />
        </>
      )}
    </Payments>
  );
}
