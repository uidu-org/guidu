import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { PureComponent } from 'react';
import InputControl from './FieldNumberStateless';

class FieldNumber extends PureComponent<any> {
  private element;

  static defaultProps = {
    type: 'tel',
    value: '',
    floatLabel: null,
    onBlur: () => {},
    onChange: () => {},
  };

  handleChange = values => {
    const { onChange, onSetValue, name } = this.props;
    const { value } = values;
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const { onChange, ...otherProps } = this.props;

    return (
      <Wrapper {...this.props}>
        <InputControl
          {...otherProps}
          onValueChange={this.handleChange}
          ref={this.initElementRef}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldNumber);
