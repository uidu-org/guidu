import Form, { useForm } from '@uidu/form';
import SectionMessage from '@uidu/section-message';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import tw from 'twin.macro';
import FieldCard from '../Fields/FieldCard';

export default function Card({
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
        form={form}
        handleSubmit={async (model) => handleSubmit(provider, model)}
        footerRenderer={() => footerRenderer({ loading, canSubmit })}
        {...formProps}
      >
        <div css={[tw`relative`, isLoading ? tw`invisible` : tw`visible`]}>
          <FieldCard
            label={label}
            id="credit-card"
            name="credit-card"
            onChange={onChange}
            providerProps={providerProps}
            onReady={() => setIsLoading(false)}
            required
          />
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
