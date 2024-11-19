import { useFormContext } from '@uidu/form';
import React from 'react';
import { ControllerFieldState } from 'react-hook-form';
import FloatLabel from '../../styled/FloatLabel';
import DefaultErrorIcon from '../ErrorIcon';
import ErrorMessages from '../ErrorMessages';
import Help from '../Help';
import InputGroup from '../InputGroup';
import RequiredSymbol from '../RequiredSymbol';
import Row from '../Row';
import { WrapperProps } from './types';

const emptyArray: any[] = [];

export default function Wrapper<T>({
  addonsAfter,
  addonsBefore,
  children,
  floatLabel = false,
  help,
  id,
  layout: inputLayout,
  type,
  showErrors,
  required,
  label,
  overrides,
  fieldState,
  errorIcon: ErrorIcon = DefaultErrorIcon,
}: WrapperProps & {
  fieldState?: ControllerFieldState;
}) {
  const { layout: formLayout } = useFormContext();
  const layout = inputLayout || formLayout;

  let input = children;

  if (type === 'hidden') {
    return input;
  }

  // if (addonsBefore || addonsAfter || fieldState?.error) {
  input = (
    <>
      <InputGroup
        layout={layout}
        key={id}
        addonsAfter={addonsAfter}
        addonsBefore={addonsBefore}
      >
        {input}
      </InputGroup>
      {fieldState?.error && showErrors && (
        <div tw="flex space-x-2 mt-3">
          <ErrorIcon fieldState={fieldState} />
          <ErrorMessages messages={[fieldState.error]} />
        </div>
      )}
    </>
  );
  // }

  if (floatLabel) {
    return (
      <Row<T>
        label={null} // so that shouldRenderLabel return false in Row.js
        required={false} // so that shouldRenderLabel return false in Row.js
        htmlFor={id}
        layout={layout}
        overrides={overrides}
        key={id}
      >
        <FloatLabel htmlFor={id} className="has-float-label">
          {input}
          {fieldState?.error && showErrors && (
            <ErrorMessages messages={[fieldState.error]} />
          )}
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
    return <div tw="w-full">{input}</div>;
  }

  return (
    <Row<T>
      htmlFor={id}
      label={label}
      required={required}
      showErrors={showErrors}
      layout={layout}
      overrides={overrides}
      key={id}
    >
      {input}
      {help ? <Help id={id} help={help} /> : null}
    </Row>
  );
}
