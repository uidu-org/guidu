import React from 'react';

const FormContext = React.createContext({
  elementWrapperClassName: '',
  labelClassName: '',
  layout: 'vertical',
  rowClassName: '',
  validateBeforeSubmit: false,
  validatePristine: false,
});

export default FormContext;
