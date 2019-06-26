// @flow
import React, { Component } from 'react';
import { FieldPasswordStateless } from '../src';
import { inputDefaultProps } from '../examples-utils';

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
          <FieldPasswordStateless {...inputDefaultProps} />
        </div>
      </div>
    );
  }
}
