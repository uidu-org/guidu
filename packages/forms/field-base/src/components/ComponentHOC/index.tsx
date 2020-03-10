import { FormContext } from '@uidu/form';
import { PassDownProps } from 'formsy-react/dist/Wrapper';
import React from 'react';
import shortid from 'shortid';
import { FieldBaseLayout } from '../../types';
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
  Component: React.ComponentType<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps &
    PassDownProps<TOriginalProps> &
    RequiredFromOriginalComponentProps;

  const result = class FrcWrapper extends React.PureComponent<ResultProps, {}> {
    public static displayName = `withFRC(${getDisplayName(Component)})`;
    public static contextType = FormContext;

    id: string = null;

    static defaultProps = {
      onChange: () => {},
      layout: 'vertical' as FieldBaseLayout,
    };

    public constructor(props: ResultProps) {
      super(props);
      const { id } = props;
      this.id = id || shortid.generate();
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

      return <Component {...(props as TOriginalProps)} {...newProps} />;
    }
  };
  return result;
};

export default withFRC;
