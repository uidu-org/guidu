import { Value } from 'classnames';
import { createContext } from 'react';
import { LayoutType } from '../types';

const defaultContextValue = {
  elementWrapperClassName: '' as Value,
  labelClassName: '' as Value,
  layout: 'vertical' as LayoutType,
  rowClassName: '' as Value,
  validateBeforeSubmit: true,
  validatePristine: false,
};

const FormContext = createContext(defaultContextValue);

FormContext.displayName = 'FrcContext';

export default FormContext;
