import { useFormContext } from '@uidu/form';
import React from 'react';
import tw from 'twin.macro';
import * as defaultComponents from '../../styled';
import { getComponents } from '../../utils';
import DefaultRequiredSymbol from '../RequiredSymbol';
import { LabelProps } from './types';

export default function Label({
  layout: inputLayout = 'vertical',
  label = null,
  htmlFor,
  fakeLabel = false,
  required = false,
  overrides,
}: LabelProps) {
  const { layout: formLayout } = useFormContext();
  const layout = inputLayout || formLayout;

  const {
    StyledLabel: { component: StyledLabel, props: labelProps },
    RequiredSymbol: { component: RequiredSymbol, props: requiredSymbolProps },
  } = getComponents(
    { ...defaultComponents, RequiredSymbol: DefaultRequiredSymbol },
    overrides,
  );

  if (layout === 'elementOnly') {
    return null;
  }

  if (fakeLabel) {
    return (
      <div
        css={[layout === 'horizontal' ? tw`w-3/12` : tw`mb-3`]}
        data-required={required}
      >
        {label}
        <RequiredSymbol
          required={required}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...requiredSymbolProps}
        />
      </div>
    );
  }

  return (
    <StyledLabel layout={layout} data-required={required} htmlFor={htmlFor}>
      {label}
      <RequiredSymbol
        required={required}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...requiredSymbolProps}
      />
    </StyledLabel>
  );
}
