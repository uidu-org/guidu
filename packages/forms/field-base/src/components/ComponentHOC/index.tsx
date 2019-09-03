import { FormContext } from '@uidu/form';
import { withFormsy } from 'formsy-react';
import React from 'react';
import { FieldBaseProps } from '../../types';
import {
  getDisplayName,
  getFallbackBoolean,
  getId,
  shouldShowErrors,
} from '../../utils';
import { RequiredFromOriginalComponentProps } from './types';

/**
 * Props coming from the `withFormsy` hoc.
 */
interface ExternalProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  errorMessage: any;
  hasValue: any;
  innerRef: any;
  isFormDisabled: boolean;
  isFormSubmitted: boolean;
  isPristine: boolean;
  isRequired: boolean;
  isValid: boolean;
  isValidValue: boolean;
  resetValue: any;
  setValidations: any;
  setValue: any;
  showError: boolean;
  showRequired: boolean;
  validationError: any;
  validationErrors: any;
  validations: any;
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
const withFRC = <TOriginalProps extends FieldBaseProps & unknown>(
  Component:
    | React.ComponentClass<TOriginalProps>
    | React.FunctionComponent<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps &
    ExternalProps &
    RequiredFromOriginalComponentProps;

  const result = class FrcWrapper extends React.Component<ResultProps, {}> {
    public static displayName = `withFRC(${getDisplayName(Component)})`;
    public static contextType = FormContext;

    id: string = null;

    static defaultProps = {
      onChange: () => {},
      layout: 'vertical',
    };

    public constructor(props: ResultProps) {
      super(props);
    }

    public render(): JSX.Element {
      const {
        layout: contextLayout,
        validateBeforeSubmit: contextValidateBeforeSubmit,
        validatePristine: contextValidatePristine,
      } = this.context;

      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        errorMessage,
        hasValue,
        innerRef,
        isRequired,
        isValidValue,
        resetValue,
        setValidations,
        showError,
        showRequired,
        validationError,
        validationErrors,
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
        id: getId(propId || '', propLabel || '', propName),
        label: propLabel,
        name: propName,
        ref: componentRef,
        disabled: isFormDisabled || propDisabled || false,
        layout,
        showErrors,
        onSetValue: setValue,
      };

      return <Component {...(props as TOriginalProps)} {...newProps} />;
    }
  };
  return result;
};

// @ts-ignore
export default Component => withFormsy(withFRC(Component));
