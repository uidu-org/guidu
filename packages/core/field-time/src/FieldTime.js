// @flow

import React, { PureComponent } from 'react';
import { ComponentHOC, Wrapper } from '@uidu/field-base';
import InputControl from './FieldTimeStateless';

import type { FieldTimeProps } from './types';

class FieldTime extends PureComponent<FieldTimeProps> {
  static defaultProps = {
    value: undefined,
  };

  handleChange = value => {
    const { onChange, onSetValue, name } = this.props;
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    return (
      <Wrapper {...this.props}>
        <InputControl
          {...this.props}
          onChange={this.handleChange}
          ref={this.initElementRef}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldTime);
