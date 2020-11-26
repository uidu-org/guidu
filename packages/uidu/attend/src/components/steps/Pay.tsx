import { FormSection, FormWrapper } from '@uidu/form';
import { PayWithCard, SinglePayment } from '@uidu/payments';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
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
    <ShellMain>
      <ShellBody>
        <ScrollableContainer>
          <FormWrapper>
            <FormSection isFirst isLast name="Payment info">
              <SinglePayment
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
                          <span className="text-medium">
                            {currentOrganization.name}
                          </span>{' '}
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
              </SinglePayment>
            </FormSection>
          </FormWrapper>
        </ScrollableContainer>
      </ShellBody>
    </ShellMain>
  );
}
