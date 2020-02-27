import React, { Component } from 'react';
import PaymentSources from '../src';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');
export default class Basic extends Component<any> {
  render() {
    return <PaymentSources stripe={stripe} />;
  }
}
