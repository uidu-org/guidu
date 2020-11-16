import classNames from 'classnames';
import React from 'react';
import RequiredSymbol from '../RequiredSymbol';
import { LabelProps } from './types';

const Label = (props: LabelProps) => {
  const { layout, label, htmlFor, labelClassName, fakeLabel, required } = props;

  if (layout === 'elementOnly') {
    return null;
  }

  const labelClassNames = classNames([
    layout === 'horizontal' ? 'col-sm-3 col-form-label' : 'mb-2',
    labelClassName,
  ]);

  if (fakeLabel) {
    return (
      <div className={labelClassNames} data-required={required}>
        {label}
        <RequiredSymbol required={required} />
      </div>
    );
  }

  return (
    <label
      className={labelClassNames}
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
