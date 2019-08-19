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
  static defaultProps = {
    layout: 'vertical',
    floatLabel: false,
  };

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
    } = this.props;

    if (type === 'hidden') {
      return children;
    }

    if (floatLabel) {
      return (
        <Row
          label={() => null} // so that shouldRenderLabel return false in Row.js
          required={false} // so that shouldRenderLabel return false in Row.js
          htmlFor={id}
          {...this.props}
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
      <Row htmlFor={id} {...this.props}>
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
