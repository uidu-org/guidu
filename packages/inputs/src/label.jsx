import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RequiredSymbol from './required-symbol';

const Label = props => {
  const { layout, label, htmlFor, labelClassName, fakeLabel, required } = props;

  if (layout === 'elementOnly') {
    return null;
  }

  const labelClassNames = classNames([
    'mb-2',
    layout === 'horizontal' ? 'col-sm-2 col-form-label' : '',
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

Label.propTypes = {
  fakeLabel: PropTypes.bool,
  htmlFor: PropTypes.string,
  label: PropTypes.node,
  labelClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
  required: PropTypes.bool,
};

export default Label;
