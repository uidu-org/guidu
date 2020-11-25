import { IbanElement } from '@stripe/react-stripe-js';
import { FormSectionSubmit } from '@uidu/form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createIbanElementOptions } from '../../utils';

export default function Bank({
  mandate = (
    <FormattedMessage
      id="guidu.payments.bank.mandate"
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
  onChange,
  loading = false,
  canSubmit = false,
  error,
  providerProps = {},
  scope = 'primary',
}) {
  return (
    <>
      <style>{`#credit-card { display: flex; flex-direction: column; justify-content: center; }`}</style>
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
          <div className="form-group">
            <label htmlFor="credit-card">
              <FormattedMessage
                defaultMessage="Insert your bank details"
                id="guidu.payments.bank.label"
              />
            </label>
            <IbanElement
              id="credit-card"
              options={createIbanElementOptions({
                supportedCountries: ['SEPA'],
                ...providerProps,
              })}
            />
          </div>
        </div>
        <FormSectionSubmit
          loading={loading}
          canSubmit={canSubmit}
          scope={scope}
          label={
            <FormattedMessage
              defaultMessage="Submit payment"
              id="guidu.payments.bank.pay"
            />
          }
        />
        <div id="mandate-acceptance" className="mt-3 small text-muted">
          {mandate}
        </div>
      </form>
    </>
  );
}
