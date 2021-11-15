import { FormContext } from '@uidu/form';
import { FormsyInjectedProps } from 'formsy-react';
import { nanoid } from 'nanoid';
import React from 'react';
import {
  getDisplayName,
  getFallbackBoolean,
  shouldShowErrors,
} from '../../utils';
import { RequiredFromOriginalComponentProps } from './types';

/**
 * Props coming from the `withFormsy` hoc.
 */
export interface ExternalProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  errorMessage?: Array<any>;
  hasValue: any;
  innerRef?: any;
  isFormDisabled: boolean;
  isFormSubmitted: boolean;
  isPristine: boolean;
  isRequired: boolean;
  isValid: boolean;
  isValidValue:
    | (false & ((value: any) => boolean))
    | (true & ((value: any) => boolean));
  resetValue: any;
  setValidations: any;
  setValue: any;
  showError: boolean;
  showRequired: boolean;
  validationError?: any;
  validationErrors?: any;
  validations?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

// Component HOC
// -------------
//
// This HOC provides shared code for our form components.
//
// We use this to merge props set using our OptionsProvider, so that
// we can set commonly used props on an enclosing component.
//
// This allows us to set these properties 'as a whole' for each component in the
// the form, while retaining the ability to override the prop on a per-component
// basis.
const withFRC = <TOriginalProps extends {}>(
  Component: React.ComponentType<TOriginalProps> | React.FC<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps &
    FormsyInjectedProps<TOriginalProps> &
    RequiredFromOriginalComponentProps;

  const result = class FrcWrapper extends React.PureComponent<ResultProps, {}> {
    static get displayName() {
      return `withFRC(${getDisplayName(Component)})`;
    }
    static get contextType() {
      return FormContext;
    }

    id: string = null;

    constructor(props: ResultProps) {
      super(props);
      const { id } = props;
      this.id = id || nanoid();
    }

    render() {
      const {
        layout: contextLayout,
        validateBeforeSubmit: contextValidateBeforeSubmit,
        validatePristine: contextValidatePristine,
      } = this.context;

      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        errorMessage,
        hasValue,
        isRequired,
        isValidValue,
        resetValue,
        setValidations,
        showError,
        showRequired,
        validations,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        isFormDisabled,
        isFormSubmitted,
        isPristine,
        isValid,
        setValue,
        validateBeforeSubmit: propValidateBeforeSubmit,
        validatePristine: propValidatePristine,
        layout: propLayout,
        disabled: propDisabled,
        id: propId,
        label: propLabel,
        name: propName,
        componentRef,
        help,
        ...props
      } = this.props;

      const validatePristine = getFallbackBoolean(
        propValidatePristine,
        contextValidatePristine,
        false,
      );

      const validateBeforeSubmit = getFallbackBoolean(
        propValidateBeforeSubmit,
        contextValidateBeforeSubmit,
        true,
      );

      const showErrors = shouldShowErrors(
        isPristine,
        isFormSubmitted,
        isValid,
        validatePristine,
        validateBeforeSubmit,
      );

      const layout = propLayout || contextLayout;

      const newProps = {
        id: this.id,
        label: propLabel,
        name: propName,
        ref: componentRef,
        disabled: isFormDisabled || propDisabled || false,
        layout,
        showErrors,
        onSetValue: setValue,
        help,
        ...(help ? { ariaDescribedBy: `${this.id}-desc` } : {}),
      };

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...(props as TOriginalProps)} {...newProps} />;
    }
  };

  result.defaultProps = {
    onChange: () => null,
  };

  return result;
};

export default withFRC;
