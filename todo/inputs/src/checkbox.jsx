import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ComponentCommon from './component-common';

import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

export default class Checkbox extends Component {
  changeValue = e => {
    const value = e.currentTarget.checked;
    this.props.onSetValue(value);
    this.props.onChange(this.props.name, value);
  };

  renderElement = () => {
    const inputProps = Object.assign({}, this.props);
    const checked = this.props.value === true;
    const {
      // children,
      className,
      disabled,
      label,
    } = this.props;

    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    delete inputProps.addonAfter;
    delete inputProps.addonBefore;
    delete inputProps.buttonAfter;
    delete inputProps.buttonBefore;
    delete inputProps.debounce;
    delete inputProps.updateOn;
    delete inputProps.value;
    delete inputProps.onBlur;
    delete inputProps.isPristine;
    delete inputProps.showErrors;

    return (
      <div className={classNames('custom-control custom-checkbox', className)}>
        <input
          {...inputProps}
          id={this.props.id}
          className="custom-control-input"
          type="checkbox"
          checked={checked}
          onChange={this.changeValue}
          disabled={this.props.disabled || disabled}
        />
        <label
          className="custom-control-label d-flex align-items-center"
          htmlFor={this.props.id}
        >
          {label}
        </label>
      </div>
    );
  };

  render() {
    const element = this.renderElement();

    if (this.props.layout === 'elementOnly') {
      return element;
    }

    return (
      <Row
        {...this.props}
        // label={this.props.rowLabel}
        htmlFor={this.props.id}
        fakeLabel
      >
        {element}
        {this.props.help ? <Help help={this.props.help} /> : null}
        {this.props.showErrors ? (
          <ErrorMessages messages={this.props.errorMessages} />
        ) : null}
      </Row>
    );
  }
}

Checkbox.defaultProps = {
  ...ComponentCommon.defaultProps,
};

Checkbox.propTypes = {
  ...ComponentCommon.propTypes,
};
