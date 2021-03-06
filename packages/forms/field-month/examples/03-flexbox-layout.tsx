import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { FieldMonthStateless } from '../src';

type State = {
  value: string | number;
};

export default class StatelessExample extends Component<void, State> {
  state = {
    value: '',
  };

  setValue = (e: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState({ value: e.target.value });

  render() {
    return (
      <div>
        <p>The field should not break outside the coloured flex container.</p>
        <div style={{ display: 'flex', width: 150, backgroundColor: '#fea' }}>
          <FieldMonthStateless {...inputDefaultProps} />
        </div>
      </div>
    );
  }
}
