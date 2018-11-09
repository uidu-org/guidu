import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import OptionsProvider from './hoc/options-provider';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitted) {
      this.setState({
        loading: false,
      });
    }
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
    const modelToSubmit = model;
    this.setState(
      {
        // canSubmit: false,
        loading: true,
      },
      () => {
        handleSubmit(modelToSubmit, resetForm);
      },
    );
  };

  render() {
    const formsyProps = Object.assign({}, this.props);
    delete formsyProps.elementWrapperClassName;
    delete formsyProps.inputsWrapperProps;
    delete formsyProps.labelClassName;
    delete formsyProps.layout;
    delete formsyProps.rowClassName;
    delete formsyProps.validatePristine;
    delete formsyProps.validateOnSubmit;

    delete formsyProps.handleSubmit;
    delete formsyProps.footerRenderer;
    delete formsyProps.submitted;
    delete formsyProps.withLoader;

    const { loading, canSubmit } = this.state;

    const {
      footerRenderer,
      children,
      withLoader,
      inputsWrapperProps,
    } = this.props;

    return (
      <OptionsProvider {...this.props}>
        <Formsy
          {...formsyProps}
          ref={c => {
            this.form = c;
          }}
          onValidSubmit={this.handleSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <div style={{ position: 'relative' }} {...inputsWrapperProps}>
            {loading && withLoader && (
              <div className="form-loader">
                <div className="vertical-align">
                  <span className="spinner">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                </div>
              </div>
            )}
            {children}
          </div>
          {footerRenderer({ loading, canSubmit }, this.form, this.handleSubmit)}
        </Formsy>
      </OptionsProvider>
    );
  }
}

Form.propTypes = {
  footerRenderer: PropTypes.func,
  handleSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  submitted: PropTypes.bool,
  withLoader: PropTypes.bool,
  inputsWrapperProps: PropTypes.shape(PropTypes.obj),
};

Form.defaultProps = {
  footerRenderer: () => {},
  handleSubmit: () => {},
  inputsWrapperProps: {},
  submitted: false,
  withLoader: true,
};
