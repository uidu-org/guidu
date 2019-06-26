import React, { Component } from 'react';
import { CustomInput } from 'reactstrap';
import styled from 'styled-components';
import { ComponentCommon, ErrorMessages } from '@uidu/field-base';

import { type CheckboxProps } from './types';

const StyledCustomInput = styled(CustomInput)`
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

  componentWillReceiveProps = nextProps => {
    const { onSetValue, value } = this.props;
    const isValueChanging = nextProps.value !== value;

    if (isValueChanging) {
      onSetValue(nextProps.value);
    }
  };

  componentDidUpdate() {
    const { isIndeterminate } = this.props;

    if (this.checkbox) {
      this.checkbox.indeterminate = !!isIndeterminate;
    }
  }

  changeValue = e => {
    const { onSetValue, onChange, name } = this.props;
    const value = e.currentTarget.checked;
    onSetValue(value);
    onChange(name, value);
  };

  render = () => {
    const inputProps = Object.assign({}, this.props);
    const {
      // children,
      id,
      disabled,
      label,
      value,
      showErrors,
      errorMessages,
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
    delete inputProps.isIndeterminate;
    delete inputProps.isInvalid;
    delete inputProps.defaultChecked;
    delete inputProps.showErrors;

    return (
      <CustomInput
        {...inputProps}
        innerRef={r => {
          this.checkbox = r;
        }}
        checked={value}
        type="checkbox"
        disabled={disabled}
        id={id}
        label={label}
        onChange={this.changeValue}
      >
        {showErrors && <ErrorMessages messages={errorMessages} />}
      </CustomInput>
    );
  };
}

Checkbox.defaultProps = {
  ...ComponentCommon.defaultProps,
  type: 'checkbox',
};

Checkbox.propTypes = {
  ...ComponentCommon.propTypes,
  ...CustomInput.propTypes,
};
