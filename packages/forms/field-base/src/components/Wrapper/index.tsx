import React, { ReactElement } from 'react';
import FloatLabel from '../../styled/FloatLabel';
import ErrorMessages from '../ErrorMessages';
import Help from '../Help';
import Icon from '../Icon';
import InputGroup from '../InputGroup';
import RequiredSymbol from '../RequiredSymbol';
import Row from '../Row';
import { WrapperProps } from './types';

export default function Wrapper({
  addonAfter,
  addonBefore,
  buttonAfter,
  buttonBefore,
  children,
  errorMessages,
  floatLabel = false,
  help,
  id,
  layout,
  type,
  showErrors,
  required,
  label,
  elementWrapperClassName,
  overrides,
}: WrapperProps): ReactElement {
  let control = children;

  if (type === 'hidden') {
    return <>{control}</>;
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
        layout={layout}
        overrides={overrides}
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
    <Row
      htmlFor={id}
      label={label}
      elementWrapperClassName={elementWrapperClassName}
      required={required}
      showErrors={showErrors}
      fakeLabel={false}
      layout={layout}
      overrides={overrides}
    >
      {control}
      {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      {help ? <Help id={id} help={help} /> : null}
      {showErrors ? (
        <Icon symbol="remove" className="form-control-feedback" />
      ) : null}
    </Row>
  );
}
