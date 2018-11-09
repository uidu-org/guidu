import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ComponentCommon, ErrorMessages, Help, Row } from '@uidu/field-base';

export default class Checkbox extends Component {
  changeValue = e => {
    const { onSetValue, onChange, name } = this.props;
    const value = e.currentTarget.checked;
    onSetValue(value);
    onChange(name, value);
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
    const { help, showErrors, errorMessages, layout, id } = this.props;
    const element = this.renderElement();

    if (layout === 'elementOnly') {
      return element;
    }

    return (
      <Row {...this.props} htmlFor={id} fakeLabel>
        {element}
        {help && <Help help={help} />}
        {showErrors && <ErrorMessages messages={errorMessages} />}
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
