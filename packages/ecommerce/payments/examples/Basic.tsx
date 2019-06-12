import React, { Component } from 'react';
import Payments, { Pay } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <Payments
        apiKey="pk_test_gxaXiVZYxYA1u1ZzqjVr71c5"
        label="Test"
        amount={3000}
        onSave={console.log}
      >
        {paymentProps => (
          <Pay {...paymentProps} providerProps={{ hidePostalCode: true }} />
        )}
      </Payments>
    );
  }
}
