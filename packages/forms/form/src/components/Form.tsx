import Formsy from 'formsy-react';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FormProps } from '../types';
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
  handleSubmit = async model => {},
  inputsWrapperProps = {},
  submitted = false,
  withLoader = true,
  children,
  forwardedRef,
  ...rest
}: FormProps & { forwardedRef: React.Ref<any> }) {
  const form: React.RefObject<Formsy> = useRef(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const enableButton = () => setCanSubmit(true);

  const disableButton = () => setCanSubmit(false);

  const onValidSubmit = (model, resetForm) => {
    setIsLoading(true);
    handleSubmit(model, resetForm).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <FormContext.Provider
      value={{
        layout: 'vertical',
        validateBeforeSubmit: false,
        validatePristine: false,
        rowClassName: '',
        labelClassName: '',
        elementWrapperClassName: '',
      }}
    >
      <Formsy
        {...rest}
        ref={forwardedRef}
        onValidSubmit={onValidSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
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
