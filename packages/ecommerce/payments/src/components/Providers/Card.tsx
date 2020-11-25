import { CardElement } from '@stripe/react-stripe-js';
import { FormSubmit } from '@uidu/form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createCardElementOptions } from '../../utils';

export default function Card({
  handleSubmit,
  providerProps = {},
  scope = 'primary',
  onChange,
  loading = false,
  canSubmit = false,
  error,
}) {
  return (
    <>
      <style>{`#credit-card { display: flex; flex-direction: column; justify-content: center; }`}</style>
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
          <div className="form-group">
            <label htmlFor="credit-card">
              <FormattedMessage
                defaultMessage="Insert your credit / debit card details"
                id="guidu.payments.card.label"
              />
            </label>
            <CardElement
              id="credit-card"
              onChange={onChange}
              options={createCardElementOptions({ ...providerProps })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="credit-card">
              <FormattedMessage
                defaultMessage="Insert your credit / debit card details"
                id="guidu.payments.card.label"
              />
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="credit-card">
              <FormattedMessage
                defaultMessage="Insert your credit / debit card details"
                id="guidu.payments.card.label"
              />
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>
        {error && <div className="alert alert-warning">{error.message}</div>}
        <FormSubmit
          loading={loading}
          canSubmit={canSubmit}
          className="btn btn-primary btn-block"
          label={
            <FormattedMessage
              defaultMessage="Submit payment"
              id="guidu.payments.card.pay"
            />
          }
        />
      </form>
    </>
  );
}
