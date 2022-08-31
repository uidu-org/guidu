import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FormProps, LayoutType } from '../types';
import { stripEmpty } from '../utils';
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

const defaultOverrides = {};
const defaultFooterRenderer = () => {};
const defaultHandleSubmit = async () => {};

export default function Form<T>({
  form,
  footerRenderer = defaultFooterRenderer,
  handleSubmit: onSubmit = defaultHandleSubmit,
  children,
  layout = 'vertical' as LayoutType,
  className = '',
  overrides = defaultOverrides,
}: FormProps<T>) {
  const { handleSubmit, formState } = form;

  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return function cleanup(): void {
      isMounted.current = false;
    };
  }, []);

  const onValidSubmit = async (model: T) => {
    setIsLoading(true);
    return onSubmit(stripEmpty<T>(model)).then(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    });
  };

  return (
    <FormContextProvider<T> form={form} layout={layout} overrides={overrides}>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        tw="relative"
        className={className}
      >
        <Loading
          tw="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
          hidden
          isLoading={isLoading || false}
        />
        {children}
        {footerRenderer &&
          footerRenderer(
            { loading: isLoading, canSubmit: formState.isValid },
            onValidSubmit,
          )}
      </form>
    </FormContextProvider>
  );
}
