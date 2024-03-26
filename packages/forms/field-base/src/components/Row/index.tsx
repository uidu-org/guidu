import React from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import tw from 'twin.macro';
import * as defaultComponents from '../../styled';
import { getComponents } from '../../utils';
import DefaultLabel from '../Label';
import { RowProps } from './types';

export default function Row<T>({
  label = null,
  required = false,
  fakeLabel = false,
  layout,
  children,
  htmlFor,
  overrides,
}: RowProps & {
  field?: ControllerRenderProps<T>;
  fieldState?: ControllerFieldState;
}) {
  const {
    StyledRow: { component: StyledRow, props: rowProps },
    Label: { component: Label, props: labelProps },
  } = getComponents({ ...defaultComponents, Label: DefaultLabel }, overrides);

  let element = children;

  if (layout === 'elementOnly') {
    return element;
  }

  // We should render the label if there is label text defined, or if the
  // component is required (so a required symbol is displayed in the label tag)
  const shouldRenderLabel = label !== null;

  if (layout === 'horizontal') {
    element = <div css={[tw`w-9/12`]}>{element}</div>;
  }

  return (
    <StyledRow layout={layout} {...rowProps}>
      {shouldRenderLabel ? (
        <Label
          layout={layout}
          label={label}
          htmlFor={htmlFor}
          fakeLabel={fakeLabel}
          required={required}
          overrides={overrides}
          {...labelProps}
        />
      ) : null}
      {element}
    </StyledRow>
  );
}
