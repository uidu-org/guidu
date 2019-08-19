import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { Component } from 'react';
import InputControl from './FieldMonthStateless';

class FieldMonth extends Component<any> {
  element = React.createRef();

  static defaultProps = {
    type: 'text',
    value: '',
  };

  handleChange = event => {
    const { onChange, onSetValue, name } = this.props;
    const { value } = event.currentTarget;
    onChange(name, value);
    onSetValue(value);
  };

  handleBlur = event => {
    const { onBlur, name } = this.props;
    const { value } = event.currentTarget;
    onBlur(name, value);
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
          onBlur={this.handleBlur}
          ref={this.initElementRef}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldMonth);

// FieldMonth.propTypes = {
//   ...InputControl.propTypes,
//   // ...inputGroupPropTypes,
//   debounce: PropTypes.shape({
//     blur: PropTypes.number,
//     change: PropTypes.number,
//   }),
//   floatLabel: PropTypes.string,
//   updateOn: PropTypes.string,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onBlur: PropTypes.func,
// };
