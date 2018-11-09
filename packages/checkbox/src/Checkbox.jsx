import React, { Component } from 'react';
import { CustomInput } from 'reactstrap';
import styled from 'styled-components';
import { ComponentCommon, ErrorMessages, Help, Row } from '@uidu/field-base';

import { type CheckboxProps } from './types';

const CustomInputComponent = styled(CustomInput)`
  :hover {
    .custom-control-label {
      ::before {
        background-color: var(--gray);
      }
    }
  }
  .custom-control-label {
    ::before {
      background-color: transparent;
      border: 1px solid var(--gray);
    }
  }
`;

export default class Checkbox extends Component<CheckboxProps> {
  static defaultProps = {
    isDisabled: false,
    isInvalid: false,
    defaultChecked: false,
    isIndeterminate: false,
  };

  changeValue = e => {
    const { onSetValue, onChange, name } = this.props;
    const value = e.currentTarget.checked;
    onSetValue(value);
    onChange(name, value);
  };

  renderElement = () => {
    const inputProps = Object.assign({}, this.props);
    const {
      // children,
      id,
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
      <CustomInputComponent
        {...inputProps}
        type="checkbox"
        disabled={disabled}
        id={id}
        label={label}
        onChange={this.changeValue}
      />
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
  type: 'checkbox',
};

Checkbox.propTypes = {
  ...ComponentCommon.propTypes,
  ...CustomInput.propTypes,
};
