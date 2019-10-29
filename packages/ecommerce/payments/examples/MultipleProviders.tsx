import Slider from '@uidu/slider';
import React, { Component } from 'react';
import Payments, { Pay, PayWith } from '../src';

export default class Basic extends Component<any> {
  state = {
    provider: 'card',
  };

  select = provider => {
    this.setState(
      {
        provider,
      },
      () => this.slider.next(),
    );
  };

  render() {
    return (
      <Payments
        apiKey="pk_test_gxaXiVZYxYA1u1ZzqjVr71c5"
        provider={this.state.provider}
        label="Test"
        amount={3000}
      >
        {paymentProps => (
          <Slider
            ref={c => {
              this.slider = c;
            }}
          >
            <PayWith {...paymentProps} onChange={this.select} />
            <Pay {...paymentProps} provider={this.state.provider} />
          </Slider>
        )}
      </Payments>
    );
  }
}
