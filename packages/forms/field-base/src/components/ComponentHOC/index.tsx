import { FormContext } from '@uidu/form';
import { withFormsy } from 'formsy-react';
import React from 'react';
import shortid from 'shortid';
import { ComponentHOCProps } from './types';

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
const FormsyReactComponent = <TOriginalProps extends {}>(
  Component:
    | React.ComponentClass<TOriginalProps>
    | React.FunctionComponent<TOriginalProps>,
) => {
  type ResultProps = TOriginalProps & ComponentHOCProps;

  const result = class FrcWrapper extends React.Component<ResultProps, {}> {
    id: string = null;

    static defaultProps = {
      onChange: () => {},
      layout: 'vertical',
    };

    static contextType = FormContext;

    constructor(props: ResultProps) {
      super(props);
      const { id } = props;
      this.id = id || shortid.generate();
    }

    // Use the following value for layout:
    // 1. layout prop (if supplied)
    // 2. [else] layout context (if defined)
    // 3. [else] 'vertical' (default value)
    getLayout = () => this.props.layout || (this.context.layout || 'vertical');

    // Use the following value for validatePristine:
    // 1. validatePristine prop (if supplied)
    // 2. [else] validatePristine context (if defined)
    // 3. [else] false (default value)
    getValidatePristine = () => {
      const { validatePristine } = this.props;
      const { validatePristine: contextValidatePristine } = this.props;
      if (typeof validatePristine === 'boolean') {
        return validatePristine;
      }
      return contextValidatePristine || false;
    };

    // Use the following value for validateOnSubmit:
    // 1. validateOnSubmit prop (if supplied)
    // 2. [else] validateOnSubmit context (if defined)
    // 3. [else] false (default value)
    getValidateOnSubmit = () => {
      const { validateOnSubmit } = this.props;
      const { validateOnSubmit: contextValidateOnSubmit } = this.props;
      if (typeof validateOnSubmit === 'boolean') {
        return validateOnSubmit;
      }
      return contextValidateOnSubmit || false;
    };

    // Combine a parent context value with a component prop value.
    // This is used for CSS classnames, where the value is passed to `JedWatson/classnames`.
    combineContextWithProp = key => [this.context[key], this.props[key]];

    hashString = string => {
      let hash = 0;
      for (let i = 0; i < string.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = ((hash << 5) - hash + string.charCodeAt(i)) & 0xffffffff;
      }
      return hash;
    };

    // Determine whether to show errors, or not.
    shouldShowErrors = () => {
      const { isPristine, isFormSubmitted, isValid } = this.props;
      if (isPristine) {
        if (this.getValidatePristine() === false) {
          return false;
        }
      }
      if (this.getValidateOnSubmit() === true) {
        if (!isFormSubmitted) {
          return false;
        }
      }
      return !isValid;
    };

    // We pass through all unknown props, but delete some
    // formsy HOC props that we know we don't need.
    render() {
      const {
        isFormDisabled,
        disabled,
        errorMessages,
        isRequired,
        value,
        setValue,
        ref,
        ...otherProps
      } = this.props;

      console.log(this.props);

      const cssProps = {
        elementWrapperClassName: this.combineContextWithProp(
          'elementWrapperClassName',
        ),
        labelClassName: this.combineContextWithProp('labelClassName'),
        rowClassName: this.combineContextWithProp('rowClassName'),
      };

      const newProps = {
        ...cssProps,
        disabled: isFormDisabled || disabled,
        errorMessages,
        id: this.id,
        layout: this.getLayout(),
        required: isRequired,
        showErrors: this.shouldShowErrors(),
        value,
        onSetValue: setValue,
      };

      return (
        <Component
          ref={ref}
          {...(otherProps as TOriginalProps)}
          {...newProps}
        />
      );
    }
  };

  return result;

  //  const WithFormsy = withFormsy(ComponentHOC as any);
  //  return React.forwardRef<any, P>(({ children, ...props }, ref) => {
  //    return (
  //      <WithFormsy {...props} ref={ref}>
  //        {children}
  //      </WithFormsy>
  //    );
  //  });
};

export default Component => withFormsy(FormsyReactComponent(Component));
