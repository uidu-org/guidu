import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import classNames from 'classnames';
import React, { Component } from 'react';
import StyledInput from '../styled/Input';
import pkg from '../version.json';

class FieldTextStateless extends Component<any> {
  static defaultProps = {
    disabled: false,
    isReadOnly: false,
    isSpellCheckEnabled: true,
    onChange: () => {},
    required: false,
    type: 'text',
  };

  input: HTMLInputElement;

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  initElementRef = (input?: HTMLInputElement) => {
    this.input = input;
  };

  getInputMode = (type: string) => {
    const { inputMode } = this.props;
    if (inputMode) {
      return inputMode;
    }

    switch (type) {
      case 'tel':
        return 'tel';
      case 'email':
        return 'email';
      case 'url':
        return 'url';
      default:
        return null;
    }
  };

  render() {
    const {
      as,
      showErrors,
      className,
      autoComplete,
      autoFocus,
      disabled,
      id,
      maxLength,
      min,
      max,
      name,
      options,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      pattern,
      placeholder,
      isReadOnly,
      required,
      isSpellCheckEnabled,
      type,
      value,
      ariaDescribedBy,
    } = this.props;

    return (
      <StyledInput
        as={as}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={classNames('form-control', className, {
          // 'is-valid': !showErrors,
          'is-invalid': showErrors,
        })}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        min={min}
        max={max}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={isReadOnly}
        ref={this.initElementRef}
        required={required}
        spellCheck={isSpellCheckEnabled}
        type={type}
        defaultValue={value}
        aria-describedby={ariaDescribedBy}
        {...(this.getInputMode(type)
          ? { inputMode: this.getInputMode(type) }
          : {})}
        {...options} // for other input patterns}
      />
    );
  }
}

export { FieldTextStateless as FieldTextStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldText',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldTextStateless),
);
