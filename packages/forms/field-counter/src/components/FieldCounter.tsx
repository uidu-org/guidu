import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { PureComponent } from 'react';
import InputControl from './FieldCounterStateless';

class FieldCounter extends PureComponent<any> {
  private element = React.createRef();

  static defaultProps = {
    floatLabel: null,
    onBlur: () => {},
    onChange: () => {},
  };

  handleChange = value => {
    const { onChange, onSetValue, name } = this.props;
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.current.element : null;
  };

  render() {
    const { onChange, ...otherProps } = this.props;

    return (
      <Wrapper {...this.props}>
        <InputControl
          {...otherProps}
          onChange={this.handleChange}
          ref={this.element}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldCounter);
