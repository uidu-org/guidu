import React, { PureComponent } from 'react';
import {
  ErrorMessages,
  FloatLabel,
  Help,
  Icon,
  RequiredSymbol,
  Row,
} from '../../index';
import InputGroup from '../InputGroup';
import { WrapperProps } from './types';

export default class Wrapper extends PureComponent<WrapperProps> {
  static defaultProps = {
    floatLabel: false,
  };

  render() {
    const {
      addonAfter,
      addonBefore,
      buttonAfter,
      buttonBefore,
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

    let control = children;

    if (type === 'hidden') {
      return control;
    }

    const inputGroupProps = {
      addonAfter,
      addonBefore,
      buttonAfter,
      buttonBefore,
    };

    if (addonBefore || addonAfter || buttonBefore || buttonAfter) {
      control = <InputGroup {...inputGroupProps}>{control}</InputGroup>;
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
            {control}
            {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
            <span>
              {floatLabel}
              {required && ' '}
              {required && <RequiredSymbol required={required} />}
            </span>
          </FloatLabel>
          {help ? <Help id={id} help={help} /> : null}
        </Row>
      );
    }

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row htmlFor={id} {...this.props}>
        {control}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
        {help ? <Help id={id} help={help} /> : null}
        {showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
      </Row>
    );
  }
}
