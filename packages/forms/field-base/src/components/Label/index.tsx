import React from 'react';
import tw from 'twin.macro';
import * as defaultComponents from '../../styled';
import { getComponents } from '../../utils';
import DefaultRequiredSymbol from '../RequiredSymbol';
import { LabelProps } from './types';

export default function Label({
  layout = 'vertical',
  label = null,
  htmlFor,
  fakeLabel = false,
  required = false,
  overrides,
}: LabelProps) {
  const {
    StyledLabel: { component: StyledLabel, props: labelProps },
    RequiredSymbol: { component: RequiredSymbol, props: requiredSymbolProps },
  } = getComponents(
    { ...defaultComponents, RequiredSymbol: DefaultRequiredSymbol },
    overrides,
  ) as any;

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
        <RequiredSymbol required={required} {...requiredSymbolProps} />
      </div>
    );
  }

  return (
    <StyledLabel layout={layout} data-required={required} htmlFor={htmlFor}>
      {label}
      <RequiredSymbol required={required} {...requiredSymbolProps} />
    </StyledLabel>
  );
}
