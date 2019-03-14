// @flow

import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import {
  ComponentHOC,
  ErrorMessages,
  Help,
  Icon,
  Row,
  RequiredSymbol,
} from '@uidu/field-base';
import InputControl from './FieldMonthStateless';

import FloatLabel from './styled/FloatLabel';
// import InputGroup from './input-group';

import type { FieldMonthProps } from './types';

class FieldMonth extends Component<FieldMonthProps> {
  static defaultProps = {
    // ...ComponentCommon.defaultProps,
    type: 'text',
    value: '',
    floatLabel: null,
    updateOn: 'blur change',
    debounce: {
      blur: 0,
      change: 0,
    },
    onBlur: () => {},
    onChange: () => {},
  };

  getDebounceInterval = eventName => {
    if (this.props.debounce[eventName]) {
      return this.props.debounce[eventName];
    }
    return 0;
  };

  changeDebounced = debounce(
    this.props.onSetValue,
    this.getDebounceInterval('change'),
  );

  blurDebounced = debounce(
    this.props.onSetValue,
    this.getDebounceInterval('blur'),
  );

  shouldUpdateOn = eventName => {
    const updateOnEventNames = this.props.updateOn.split(' ');
    return updateOnEventNames.includes(eventName);
  };

  handleChange = event => {
    const { onChange, name } = this.props;
    const { value } = event.currentTarget;
    if (this.shouldUpdateOn('change')) {
      this.changeDebounced(value);
    }
    onChange(name, value);
  };

  handleBlur = event => {
    const { onBlur, name } = this.props;
    const { value } = event.currentTarget;
    if (this.shouldUpdateOn('blur')) {
      this.changeDebounced.cancel();
      this.blurDebounced(value);
    }
    onBlur(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    const {
      errorMessages,
      floatLabel,
      help,
      id,
      layout,
      type,
      showErrors,
      required,
    } = this.props;

    const control = (
      <InputControl
        {...this.props}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        ref={this.initElementRef}
      />
    );

    if (type === 'hidden') {
      return control;
    }

    // if (addonBefore || addonAfter || buttonBefore || buttonAfter) {
    //   control = <InputGroup {...this.props}>{control}</InputGroup>;
    // }

    if (floatLabel) {
      return (
        <Row
          {...this.props}
          label={null} // so that shouldRenderLabel return false in Row.js
          required={false} // so that shouldRenderLabel return false in Row.js
          htmlFor={id}
        >
          <FloatLabel htmlFor={id} className="has-float-label">
            {control}
            {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
            <span>
              {floatLabel}
              {required && ' '}
              {required && <RequiredSymbol required={required} />}
            </span>
          </FloatLabel>
          {help ? <Help help={help} /> : null}
        </Row>
      );
    }

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        {help ? <Help help={help} /> : null}
        {showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
      </Row>
    );
  }
}

export default ComponentHOC(FieldMonth);

// FieldMonth.propTypes = {
//   ...InputControl.propTypes,
//   // ...inputGroupPropTypes,
//   ...ComponentCommon.propTypes,
//   debounce: PropTypes.shape({
//     blur: PropTypes.number,
//     change: PropTypes.number,
//   }),
//   floatLabel: PropTypes.string,
//   updateOn: PropTypes.string,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onBlur: PropTypes.func,
// };
