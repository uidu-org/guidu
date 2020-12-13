import Form from '@uidu/form';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import FieldBank from '../Fields/FieldBank';

export default function Bank({
  mandate = (
    <FormattedMessage
      defaultMessage="By providing your IBAN and confirming this payment, you are
          authorizing Rocketship Inc. and Stripe, our payment service provider,
          to send instructions to your bank to debit your account and your bank
          to debit your account in accordance with those instructions. You are
          entitled to a refund from your bank under the terms and conditions of
          your agreement with your bank. A refund must be claimed within 8 weeks
          starting from the date on which your account was debited."
    />
  ),
  handleSubmit,
  footerRenderer,
  loading = false,
  canSubmit = false,
  provider,
  providerProps = {},
  children,
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <style>{`#iban-element { display: flex; flex-direction: column; justify-content: center; }`}</style>
      <Form
        handleSubmit={async (model) => handleSubmit(provider, model)}
        footerRenderer={() => footerRenderer({ loading, canSubmit })}
      >
        <div
          style={{
            position: 'relative',
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          <FieldBank
            label={
              <FormattedMessage defaultMessage="Insert your bank details" />
            }
            name="iban-element"
            id="iban-element"
            onReady={() => setIsLoading(false)}
            providerProps={providerProps}
            required
          />
        </div>
        {children}
      </Form>
      <div id="mandate-acceptance" className="mt-3 small text-muted">
        {mandate}
      </div>
    </>
  );
}
