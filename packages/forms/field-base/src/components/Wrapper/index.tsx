import { useFormContext } from '@uidu/form';
import React, { ReactNode } from 'react';
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
  layout: inputLayout,
  type,
  showErrors,
  required,
  label,
  overrides,
}: WrapperProps): ReactNode {
  const { layout: formLayout } = useFormContext();
  const layout = inputLayout || formLayout;

  let input = children;

  if (type === 'hidden') {
    return input;
  }

  const inputGroupProps = {
    addonAfter,
    addonBefore,
    buttonAfter,
    buttonBefore,
  };

  if (addonBefore || addonAfter || buttonBefore || buttonAfter) {
    input = <InputGroup {...inputGroupProps}>{input}</InputGroup>;
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
          {input}
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
    return input;
  }

  return (
    <Row
      htmlFor={id}
      label={label}
      required={required}
      showErrors={showErrors}
      layout={layout}
      overrides={overrides}
    >
      {input}
      {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      {help ? <Help id={id} help={help} /> : null}
      {showErrors ? (
        <Icon symbol="remove" className="form-control-feedback" />
      ) : null}
    </Row>
  );
}
