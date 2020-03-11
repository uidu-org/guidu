import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import classNames from 'classnames';
import React, { Component } from 'react';
import StyledInput from '../styled/Input';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class FieldTextStateless extends Component<any> {
  static defaultProps = {
    disabled: false,
    isReadOnly: false,
    isSpellCheckEnabled: true,
    isPristine: true,
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
      isPristine,
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
          'is-valid': !isPristine && !showErrors,
          'is-invalid': !isPristine && showErrors,
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
        value={value}
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
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName,
        packageVersion,
      },
    }),
  })(FieldTextStateless),
);
