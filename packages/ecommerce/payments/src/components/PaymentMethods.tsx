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
    border-bottom: 1px solid rgb(var(--border));
  }
  &::before {
    margin-right: 1rem;
  }
  &::after {
    margin-left: 1rem;
  }
`;

function PaymentMethods({
  providers,
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
      {paymentRequest && (
        <>
          <div tw="height[48px]">
            {paymentRequest && (
              <PaymentRequest paymentRequest={paymentRequest} />
            )}
          </div>
          <Separator tw="my-4">Or</Separator>
        </>
      )}
      {availableProviders().length > 1 && (
        <div tw="flex mb-3">
          {availableProviders().map((provider) => {
            const { id, name, icon: Icon } = provider;
            return (
              <div key={id} tw="mr-2" style={{ width: 96 }}>
                <a
                  tw="border rounded p-4 mb-4 flex flex-col items-center"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentProvider(provider);
                  }}
                >
                  <div tw="flex flex-col items-start">
                    <div tw="px-2 py-2 mb-2 rounded flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <div tw="mr-auto whitespace-nowrap">
                      <h6 tw="mb-0">{name}</h6>
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
