import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/dist/cleave-react';

import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';

export default class InputPrice extends Component {
  handleChange = e => {
    const value = e.target.rawValue * 100;
    this.props.onSetValue(e.target.value);
    this.props.onChange(this.props.name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.isPristine;
    delete inputProps.showErrors;

    const control = (
      <Cleave
        {...inputProps}
        placeholder="€ "
        options={{
          numeral: true,
          numeralDecimalMark: ',',
          delimiter: '.',
          numeralPositiveOnly: true,
          numeralDecimalScale: 2,
        }}
        onChange={this.handleChange}
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

InputPrice.propTypes = {
  ...ComponentCommon.propTypes,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputPrice.defaultProps = {
  ...ComponentCommon.defaultProps,
  className: 'form-control',
  value: undefined,
};
