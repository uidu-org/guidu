import React, { PureComponent } from 'react';
import {
  ErrorMessages,
  FloatLabel,
  Help,
  Icon,
  RequiredSymbol,
  Row,
} from '../../index';
import { WrapperProps } from './types';

export default class Wrapper extends PureComponent<WrapperProps> {
  render() {
    const {
      children,
      errorMessages,
      floatLabel,
      help,
      id,
      layout,
      type,
      showErrors,
      required,
      onChange,
      // value,
      ...otherProps
    } = this.props;

    if (type === 'hidden') {
      return children;
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
            {children}
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
      return children;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {children}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        {help ? <Help help={help} /> : null}
        {showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
      </Row>
    );
  }
}
