import { Wrapper } from '@uidu/field-base';
import React, { PureComponent } from 'react';
import { FieldTimeProps } from '../types';
import FieldTimeStateless from './FieldTimeStateless';

class FieldTime extends PureComponent<FieldTimeProps> {
  element;

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
        <FieldTimeStateless
          {...this.props}
          onChange={this.handleChange}
          ref={this.initElementRef}
        />
      </Wrapper>
    );
  }
}

export default FieldTime;
