import React, { PureComponent } from 'react';
import { CardElement } from 'react-stripe-elements';
import { createOptions } from '../../utils';

export default class PayWithCard extends PureComponent<any> {
  render() {
    const { children, handleSubmit, providerProps } = this.props;

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
              <label htmlFor="credit-card">
                Insert your credit / debit card details
              </label>
              <CardElement
                id="credit-card"
                className="form-control"
                {...createOptions()}
                {...providerProps}
              />
            </div>
          </div>
          <button type="submit" className={`btn btn-primary px-5`}>
            Conferma
          </button>
        </form>
      </div>
    );
  }
}
