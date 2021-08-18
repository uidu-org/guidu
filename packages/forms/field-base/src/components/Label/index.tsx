import React from 'react';
import tw from 'twin.macro';
import RequiredSymbol from '../RequiredSymbol';
import { LabelProps } from './types';

const Label = (props: LabelProps) => {
  const { layout, label, htmlFor, labelClassName, fakeLabel, required } = props;

  if (layout === 'elementOnly') {
    return null;
  }

  if (fakeLabel) {
    return (
      <div
        css={[layout === 'horizontal' ? tw`w-3/12` : tw`mb-3`]}
        className={labelClassName}
        data-required={required}
      >
        {label}
        <RequiredSymbol required={required} />
      </div>
    );
  }

  return (
    <label
      css={[tw`block`, layout === 'horizontal' ? tw`w-3/12` : tw`mb-2`]}
      className={labelClassName}
      data-required={required}
      htmlFor={htmlFor}
    >
      {label}
      <RequiredSymbol required={required} />
    </label>
  );
};

Label.defaultProps = {
  fakeLabel: false,
  labelClassName: null,
  layout: 'vertical',
  required: false,
  label: null,
  htmlFor: null,
};

export default Label;
