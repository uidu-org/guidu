import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useFormContext } from '@uidu/form';
import React from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { StyledAddon } from '../../styled';
import FloatLabel from '../../styled/FloatLabel';
import ErrorMessages from '../ErrorMessages';
import Help from '../Help';
import Icon from '../Icon';
import InputGroup from '../InputGroup';
import RequiredSymbol from '../RequiredSymbol';
import Row from '../Row';
import { WrapperProps } from './types';

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
}: WrapperProps & {
  fieldState?: ControllerFieldState;
}) {
  const { layout: formLayout } = useFormContext();
  const layout = inputLayout || formLayout;

  let input = children;

  if (type === 'hidden') {
    return input;
  }

  input = (
    <InputGroup
      addonsAfter={[
        ...(fieldState?.error
          ? [
              <StyledAddon key={fieldState.error.type}>
                <ExclamationCircleIcon tw="h-5 text-red-500 px-4" />
              </StyledAddon>,
            ].concat(addonsAfter || [])
          : addonsAfter || []),
      ]}
      addonsBefore={addonsBefore}
    >
      {input}
    </InputGroup>
  );

  if (floatLabel) {
    return (
      <Row<T>
        label={() => null} // so that shouldRenderLabel return false in Row.js
        required={false} // so that shouldRenderLabel return false in Row.js
        htmlFor={id}
        layout={layout}
        overrides={overrides}
      >
        <FloatLabel htmlFor={id} className="has-float-label">
          {input}
          {fieldState.error && <ErrorMessages messages={[fieldState.error]} />}
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
    <Row<T>
      htmlFor={id}
      label={label}
      required={required}
      showErrors={showErrors}
      layout={layout}
      overrides={overrides}
    >
      {input}
      {fieldState.error && <ErrorMessages messages={[fieldState.error]} />}
      {help ? <Help id={id} help={help} /> : null}
      {fieldState.error && (
        <Icon symbol="remove" className="form-control-feedback" />
      )}
    </Row>
  );
}
