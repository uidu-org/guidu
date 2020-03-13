import { ClassValue } from 'classnames/types';
import { createContext } from 'react';
import { LayoutType } from '../types';

const defaultContextValue = {
  elementWrapperClassName: '' as ClassValue,
  labelClassName: '' as ClassValue,
  layout: 'vertical' as LayoutType,
  rowClassName: '' as ClassValue,
  validateBeforeSubmit: true,
  validatePristine: false,
};

const FormContext = createContext(defaultContextValue);

FormContext.displayName = 'FrcContext';

export default FormContext;
