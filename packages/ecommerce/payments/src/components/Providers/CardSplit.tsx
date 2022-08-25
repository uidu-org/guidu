import Form, { useForm } from '@uidu/form';
import SectionMessage from '@uidu/section-message';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import tw from 'twin.macro';
import FieldCardCvc from '../Fields/FieldCardCvc';
import FieldCardExpiry from '../Fields/FieldCardExpiry';
import FieldCardNumber from '../Fields/FieldCardNumber';

export default function CardSplit({
  handleSubmit,
  providerProps = {},
  formProps = {},
  onChange,
  loading = false,
  canSubmit = false,
  error,
  footerRenderer = (props: { loading?: boolean; canSubmit?: boolean }) => null,
  provider,
  children,
  label = (
    <FormattedMessage
      defaultMessage="Insert your credit / debit card details"
      id="uidu.payments.card.label"
    />
  ),
}) {
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm({ mode: 'onChange' });

  return (
    <>
      <style>{`#credit-card { display: flex; flex-direction: column; justify-content: center; }`}</style>
      <Form
        handleSubmit={async (model) => handleSubmit(provider, model)}
        footerRenderer={() => footerRenderer({ loading, canSubmit })}
        form={form}
        {...formProps}
      >
        <div css={[tw`relative`, isLoading ? tw`invisible` : tw`visible`]}>
          <div tw="grid grid-cols-1 md:grid-cols-4 gap-x-4">
            <div tw="md:col-span-4">
              <FieldCardNumber
                label={label}
                id="credit-card-number"
                name="credit-card-number"
                onChange={onChange}
                providerProps={providerProps}
                onReady={() => setIsLoading(false)}
                required
              />
            </div>
            <div tw="md:col-span-3">
              <FieldCardExpiry
                label={label}
                id="credit-card-expiry"
                name="credit-card-expiry"
                onChange={onChange}
                providerProps={providerProps}
                onReady={() => setIsLoading(false)}
                required
              />
            </div>
            <div>
              <FieldCardCvc
                label="CVC"
                id="credit-card-cvc"
                name="credit-card-cvc"
                onChange={onChange}
                providerProps={providerProps}
                onReady={() => setIsLoading(false)}
                required
              />
            </div>
          </div>
        </div>
        {error && (
          <SectionMessage appearance="error" tw="mb-3">
            {error.message}
          </SectionMessage>
        )}
        {children}
      </Form>
    </>
  );
}
