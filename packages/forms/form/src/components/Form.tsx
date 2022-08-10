import { ClassValue } from 'classnames/types';
import Formsy from 'formsy-react';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { FormProps, LayoutType } from '../types';
import FormContext from './FormContext';

const Loading = styled.div<{ isLoading: boolean }>`
  opacity: ${({ isLoading }) => (isLoading ? 0.4 : 1)};
  transition: opacity 0.3ms ease-in;
  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
    `};
`;

function Form<T>({
  footerRenderer = () => {},
  handleSubmit: onSubmit = async (model: T) => {},
  inputsWrapperProps = {},
  withLoader = true,
  children,
  forwardedRef,
  // formsy
  layout = 'vertical' as LayoutType,
  className = '' as ClassValue,
  elementWrapperClassName = '' as ClassValue,
  validateBeforeSubmit = true,
  validatePristine = false,
  disabled = false,
  overrides = {},
  ...rest
}: FormProps) {
  const methods = useForm<T>({ mode: 'onChange', ...rest });
  const { handleSubmit, formState, clearErrors, reset } = methods;

  const form: React.RefObject<Formsy> = useRef(null);
  const isMounted = useRef(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(forwardedRef, () => methods);

  useEffect(() => {
    isMounted.current = true;
    return function cleanup(): void {
      isMounted.current = false;
    };
  }, []);

  const enableButton = () => setCanSubmit(true);

  const disableButton = () => setCanSubmit(false);

  const onValidSubmit = (model) => {
    setIsLoading(true);
    return onSubmit(model, reset).then(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    });
  };

  const contextProps = {
    elementWrapperClassName,
    layout,
    validateBeforeSubmit,
    validatePristine,
    overrides,
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(async (model) => onValidSubmit(model))}>
        {children}
        {footerRenderer(
          { loading: isLoading, canSubmit: formState.isValid },
          form.current,
          onValidSubmit,
        )}
      </form>
    </FormProvider>
  );

  return (
    <FormContext.Provider value={contextProps}>
      <Formsy
        {...rest}
        ref={form}
        onValidSubmit={onValidSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        disabled={disabled}
        className={className as string}
        // noValidate
      >
        <Loading {...inputsWrapperProps} isLoading={isLoading || false}>
          {children}
        </Loading>
        {footerRenderer(
          { loading: isLoading, canSubmit },
          form.current,
          onValidSubmit,
        )}
      </Formsy>
    </FormContext.Provider>
  );
}

export default React.forwardRef(
  ({ children, ...otherProps }: FormProps, ref: React.Ref<any>) => (
    <Form forwardedRef={ref} {...otherProps}>
      {children}
    </Form>
  ),
);
