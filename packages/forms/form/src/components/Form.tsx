import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FormProps, LayoutType } from '../types';
import { FormContextProvider } from './FormContext';

const Loading = styled.div<{ isLoading: boolean }>`
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  transition: opacity 0.3ms ease-in;
  ${({ isLoading }) =>
    isLoading
      ? css`
          z-index: 100;
          pointer-events: none;
        `
      : css`
          z-index: -1;
        `};
`;

export default function Form<T>({
  form,
  footerRenderer = () => {},
  handleSubmit: onSubmit = async (model: T) => {},
  withLoader = true,
  children,
  // formsy
  layout = 'vertical' as LayoutType,
  className = '',
  overrides = {},
  ...rest
}: FormProps<T>) {
  const { handleSubmit, formState, clearErrors, reset } = form;

  const isMounted = useRef(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <FormContextProvider<T> form={form} layout={layout} overrides={overrides}>
      <form
        onSubmit={handleSubmit(async (model) => onValidSubmit(model))}
        tw="relative"
        className={className}
      >
        <Loading
          tw="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
          hidden
          isLoading={isLoading || false}
        />
        {children}
        {footerRenderer(
          { loading: isLoading, canSubmit: formState.isValid },
          form,
          onValidSubmit,
        )}
      </form>
    </FormContextProvider>
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
        <Loading isLoading={isLoading || false}>{children}</Loading>
        {footerRenderer(
          { loading: isLoading, canSubmit },
          form.current,
          onValidSubmit,
        )}
      </Formsy>
    </FormContext.Provider>
  );
}
