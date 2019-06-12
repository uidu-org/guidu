import React, { PureComponent } from 'react';
import { IbanElement } from 'react-stripe-elements';
import { createOptions } from '../../utils';

export default class PayWithCard extends PureComponent<any> {
  render() {
    const { children, handleSubmit, providerProps, scope } = this.props;

    return (
      <div
      // className={classNames('', {
      //   'animated shake': formError || paymentFormError,
      // })}
      >
        <style>{`#credit-card { padding-top: 10px; padding-bottom: 10px }`}</style>
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative' }}>
            {children}
            <div className="form-group">
              <label htmlFor="credit-card">Insert your bank details</label>
              <IbanElement
                id="credit-card"
                supportedCountries={['SEPA']}
                className="form-control"
                {...createOptions()}
                {...providerProps}
              />
            </div>
          </div>
          <button type="submit" className={`btn btn-${scope} px-5`}>
            Conferma
          </button>
          <div id="mandate-acceptance" className="mt-3 small text-muted">
            By providing your IBAN and confirming this payment, you are
            authorizing Rocketship Inc. and Stripe, our payment service
            provider, to send instructions to your bank to debit your account
            and your bank to debit your account in accordance with those
            instructions. You are entitled to a refund from your bank under the
            terms and conditions of your agreement with your bank. A refund must
            be claimed within 8 weeks starting from the date on which your
            account was debited.
          </div>
        </form>
      </div>
    );
  }
}
