import { ComponentHOC, Wrapper } from '@uidu/field-base';
import moment from 'moment';
import React, { PureComponent } from 'react';
import InputControl from './FieldDateStateless';

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

  handleChange = (date: any) => {
    const { onSetValue, onChange } = this.props;
    const value = date ? moment(date).format(this.props.formatSubmit) : '';
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
