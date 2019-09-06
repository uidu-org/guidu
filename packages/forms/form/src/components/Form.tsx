import Formsy from 'formsy-react';
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { FormProps, FormState } from '../types';
import FormContext from './FormContext';

const Loading = styled.div<{ loading: boolean }>`
  opacity: ${({ loading }) => (loading ? 0.4 : 1)};
  transition: opacity 0.3ms ease-in;
  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
    `};
`;

class Form extends Component<FormProps, FormState> {
  private form: React.RefObject<Formsy> = React.createRef();

  static defaultProps = {
    footerRenderer: () => {},
    handleSubmit: () => {},
    inputsWrapperProps: {},
    submitted: false,
    withLoader: true,
  };

  state = {
    canSubmit: false,
    loading: false,
  };

  static getDerivedStateFromProps(props, _state) {
    if (props.submitted) {
      return {
        loading: false,
      };
    }
    return null;
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  };

  disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  };

  handleSubmit = (model, resetForm) => {
    const { handleSubmit } = this.props;
    this.setState(
      {
        // canSubmit: false,
        loading: true,
      },
      () => {
        handleSubmit(model, resetForm).then(() => {
          this.setState({ loading: false });
        });
      },
    );
  };

  render() {
    const { loading, canSubmit } = this.state;

    const {
      footerRenderer,
      children,
      withLoader,
      inputsWrapperProps,
      handleSubmit,
      submitted,
      innerRef,
      ...otherProps
    } = this.props;

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
          {...otherProps}
          ref={innerRef}
          onValidSubmit={this.handleSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <Loading loading={loading} {...inputsWrapperProps}>
            {children}
          </Loading>
          {footerRenderer({ loading, canSubmit }, this.form, this.handleSubmit)}
        </Formsy>
      </FormContext.Provider>
    );
  }
}

export default React.forwardRef<any, FormProps>(
  ({ children, ...otherProps }, ref) => (
    <Form innerRef={ref} {...otherProps}>
      {children}
    </Form>
  ),
);
