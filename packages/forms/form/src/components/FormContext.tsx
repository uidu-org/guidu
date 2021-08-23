import { Value } from 'classnames';
import { createContext } from 'react';
import { LayoutType } from '../types';

const defaultContextValue = {
  elementWrapperClassName: '' as Value,
  layout: 'vertical' as LayoutType,
  validateBeforeSubmit: true,
  validatePristine: false,
  overrides: {},
};

const FormContext = createContext(defaultContextValue);

FormContext.displayName = 'FrcContext';

export default FormContext;
