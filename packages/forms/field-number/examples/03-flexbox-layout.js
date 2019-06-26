// @flow
import React, { Component } from 'react';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { FieldNumberStateless } from '../src';

type State = {
  value: string | number,
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
          <FieldNumberStateless {...inputDefaultProps} />
        </div>
      </div>
    );
  }
}
