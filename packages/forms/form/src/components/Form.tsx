import { ClassValue } from 'classnames/types';
import Formsy from 'formsy-react';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
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

function Form({
  footerRenderer = () => {},
  handleSubmit = async (model) => {},
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
}: FormProps & { forwardedRef: React.Ref<any> }) {
  const form: React.RefObject<Formsy> = useRef(null);
  const isMounted = useRef(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(forwardedRef, () => form.current);

  useEffect(() => {
    isMounted.current = true;
    return function cleanup(): void {
      isMounted.current = false;
    };
  }, []);

  const enableButton = () => setCanSubmit(true);

  const disableButton = () => setCanSubmit(false);

  const onValidSubmit = (model, resetForm) => {
    setIsLoading(true);
    handleSubmit(model, resetForm).then(() => {
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
