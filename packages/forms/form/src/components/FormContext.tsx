import React from 'react';

const FormContext = React.createContext({
  layout: 'vertical',
  validateOnSubmit: false,
  validatePristine: false,
  rowClassName: '',
  labelClassName: '',
  elementWrapperClassName: '',
});

export default FormContext;
