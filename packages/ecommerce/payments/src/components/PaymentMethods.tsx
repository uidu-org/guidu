import { ElementsConsumer } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { PaymentMethodsProps } from '../types';
import { paymentProviders } from './Providers';
import PaymentRequest from './Providers/PaymentRequest';

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--gray);

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--border);
  }
  &::before {
    margin-right: 1rem;
  }
  &::after {
    margin-left: 1rem;
  }
`;

function PaymentMethods({
  providers = ['credit_card', 'bank_account'],
  paymentRequest,
  ...rest
}: PaymentMethodsProps) {
  const availableProviders = useCallback(
    () =>
      paymentProviders.filter((provider) => providers.includes(provider.id)),
    [providers],
  );
  const [currentProvider, setCurrentProvider] = useState(
    availableProviders()[0],
  );

  const { component: CurrentProvider } = currentProvider;

  return (
    <div>
      <div style={{ height: 48 }}>
        {paymentRequest && <PaymentRequest paymentRequest={paymentRequest} />}
      </div>
      <Separator className="my-4">Or</Separator>

      {availableProviders().length > 1 && (
        <div className="d-flex mb-3">
          {availableProviders().map((provider) => {
            const { id, name, icon: Icon } = provider;
            return (
              <div key={id} className="mr-2" style={{ width: 96 }}>
                <a
                  className="card card-body p-3 mb-3"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentProvider(provider);
                  }}
                >
                  <div className="d-flex flex-column align-items-start">
                    <div className="bg-light px-2 py-2 mb-3 rounded d-flex">
                      <Icon className="flex-shrink-0" size={18} />
                    </div>
                    <div className="mr-auto text-nowrap">
                      <h6 className="mb-0">{name}</h6>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}
      <CurrentProvider {...rest} provider={currentProvider} />
    </div>
  );
}

export default (rest) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <PaymentMethods stripe={stripe} elements={elements} {...rest} />
    )}
  </ElementsConsumer>
);
