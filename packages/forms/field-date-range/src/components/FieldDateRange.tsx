import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { PureComponent } from 'react';
import InputControl from './FieldDateRangeStateless';

class FieldDate extends PureComponent<any> {
  private element = React.createRef();

  static defaultProps = {
    // ...ComponentCommon.defaultProps,
    // value: '',
    floatLabel: null,
    formatSubmit: 'YYYY-MM-DD',
    onBlur: () => {},
    onChange: () => {},
  };

  handleChange = (value: any) => {
    const { onSetValue, onChange } = this.props;
    console.log(value);
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

export default ComponentHOC(FieldDate);
