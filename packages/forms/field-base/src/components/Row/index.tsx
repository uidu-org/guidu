import classNames from 'classnames';
import React from 'react';
import tw from 'twin.macro';
import * as defaultComponents from '../../styled';
import { getComponents } from '../../utils';
import DefaultLabel from '../Label';
import { RowProps } from './types';

export default function Row({
  label = null,
  required = false,
  showErrors = false,
  fakeLabel = false,
  layout,
  children,
  htmlFor,
  overrides,
}: RowProps) {
  const {
    StyledRow: { component: StyledRow, props: rowProps },
    Label: { component: Label, props: labelProps },
  } = getComponents({ ...defaultComponents, Label: DefaultLabel }, overrides);

  let element = children;

  if (layout === 'elementOnly') {
    return element;
  }

  const cssClasses = {
    row: [],
    elementWrapper: [],
  };

  if (showErrors) {
    cssClasses.row.push('has-error');
    cssClasses.row.push('has-feedback');
  }

  // We should render the label if there is label text defined, or if the
  // component is required (so a required symbol is displayed in the label tag)
  const shouldRenderLabel = label !== null || required;

  if (layout === 'horizontal') {
    // Horizontal layout needs a 'row' class for Bootstrap 4
    if (!shouldRenderLabel) {
      cssClasses.elementWrapper.push('col-sm-offset-3');
    }

    element = (
      <div css={[tw`w-9/12`]} className={classNames(cssClasses.elementWrapper)}>
        {element}
      </div>
    );
  }

  return (
    <StyledRow
      layout={layout}
      className={classNames(cssClasses.row)}
      {...rowProps}
    >
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
