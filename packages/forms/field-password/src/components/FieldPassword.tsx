import { Wrapper } from '@uidu/field-base';
import Tooltip from '@uidu/tooltip';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Eye, EyeOff } from 'react-feather';
import zxcvbn from 'zxcvbn';
import { FieldPasswordProps } from '../types';
import FieldPasswordStateless from './FieldPasswordStateless';

type State = {
  isPasswordVisible: boolean;
  showInstructions: boolean;
  passwordStrength: number;
};

class FieldPassword extends Component<FieldPasswordProps, State> {
  private element;

  static defaultProps = {
    value: '',
    tooltipProps: {
      content: 'Show/Hide password',
    },
    measurePasswordStrength: true,
    instructions: 'Use at least 8 character. Password strength:',
    passwordStrengths: ['Worst', 'Bad', 'Weak', 'Good', 'Strong'],
    onBlur: () => {},
    onChange: () => {},
  };

  state = {
    isPasswordVisible: false,
    showInstructions: false,
    passwordStrength: 0,
  };

  handleChange = event => {
    const { onSetValue, onChange, name, measurePasswordStrength } = this.props;
    const { value } = event.currentTarget;
    if (measurePasswordStrength) {
      this.setState({
        passwordStrength: zxcvbn(value).score,
      });
    }
    onSetValue(value);
    onChange(name, value);
  };

  handleVisiblity = () => {
    const { isPasswordVisible } = this.state;
    this.setState({
      isPasswordVisible: !isPasswordVisible,
    });
  };

  handleFocus = () => {
    this.setState({
      showInstructions: true,
    });
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const {
      disabled,
      passwordStrengths,
      instructions,
      tooltipProps,
      measurePasswordStrength,
    } = this.props;
    const {
      isPasswordVisible,
      passwordStrength,
      showInstructions,
    } = this.state;

    return (
      <Wrapper {...this.props}>
        <div className="input-group">
          <FieldPasswordStateless
            {...this.props}
            isPasswordVisible={isPasswordVisible}
            className="border-right-0"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            ref={this.initElementRef}
          />
          <Tooltip {...tooltipProps} className="input-group-append">
            <button
              className="btn border border-left-0 text-muted"
              type="button"
              onClick={this.handleVisiblity}
              disabled={disabled}
            >
              {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </Tooltip>
        </div>
        {measurePasswordStrength && showInstructions && (
          <small className="form-text text-muted d-flex align-items-center">
            <span>
              {instructions}
              <b>{passwordStrengths[passwordStrength]}</b>
            </span>
            <div
              className="progress rounded w-25 ml-2"
              style={{ height: '2px' }}
            >
              <div
                className={classNames('progress-bar', {
                  'bg-warning': passwordStrength <= 2,
                  'bg-success': passwordStrength > 2,
                })}
                role="progressbar"
                style={{
                  width: `${(passwordStrength / 4) * 100}%`,
                }}
                aria-valuenow={(passwordStrength / 4) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </small>
        )}
      </Wrapper>
    );
  }
}

export default FieldPassword;
