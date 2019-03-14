// @flow
import React, { Component } from 'react';
import { inputDefaultProps } from '@uidu/field-base';
import { FieldNumberStateless } from '../src';

type State = {
  value: string | number,
};

export default class StatelessExample extends Component<void, State> {
  state = {
    value: '',
  };

  setValue = (e: SyntheticInputEvent<HTMLInputElement>) => {
    console.log(e);
  };
  // this.setState({ value: e.target.value });

  render() {
    return (
      <FieldNumberStateless
        {...inputDefaultProps}
        type="tel"
        label="Stateless Text Input Example"
        onValueChange={this.setValue}
        // value={this.state.value}
      />
    );
  }
}
