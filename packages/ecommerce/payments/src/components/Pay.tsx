import React, { PureComponent } from 'react';
import { PayProps } from '../types';
import PayWithBank from './PayWith/Bank';
import PayWithCard from './PayWith/Card';

export default class Pay extends PureComponent<PayProps> {
  render() {
    const { provider } = this.props;

    switch (provider) {
      case 'bank_account':
        return <PayWithBank {...this.props} />;
      default:
        return <PayWithCard {...this.props} />;
    }
  }
}
