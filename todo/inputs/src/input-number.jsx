import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';

export default class InputNumber extends Component {
  handleChange = value => {
    this.props.onSetValue(value);
    this.props.onChange(this.props.name, value);
  };

  initElementRef = control => {
    this.element = control && control.refs ? control.refs.input : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.isPristine;
    delete inputProps.showErrors;

    const control = (
      <NumericInput
        {...inputProps}
        ref={this.initElementRef}
        onChange={this.handleChange}
        style={{
          btn: {
            borderStyle: 'none',
            background: '#f1f1f1',
            boxShadow: 'none',
          },
          btnUp: {
            borderRadius: '.2rem .2rem 0 0',
          },
          btnDown: {
            borderRadius: '0 0 .2rem .2rem',
          },
          // arrowUp: {
          //   borderTopColor: 'rgba(66, 54, 0, 0.63)',
          // },
          // arrowDown: {
          //   borderTopColor: 'rgba(66, 54, 0, 0.63)',
          // }
        }}
      />
    );

    if (this.props.layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={this.props.id}>
        {control}
        {this.props.showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

InputNumber.propTypes = {
  ...ComponentCommon.propTypes,
  value: PropTypes.number,
  className: PropTypes.string,
};

InputNumber.defaultProps = {
  ...ComponentCommon.defaultProps,
  className: 'form-control',
  value: undefined,
};
