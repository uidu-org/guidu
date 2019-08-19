import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import classNames from 'classnames';
import React, { Component } from 'react';
import Input from '../styled/Input';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class FieldMonthStateless extends Component<any, void> {
  static defaultProps = {
    disabled: false,
    isReadOnly: false,
    isSpellCheckEnabled: true,
    isPristine: true,
    onChange: () => {},
    required: false,
    type: 'text',
  };

  input?: HTMLInputElement;

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  initElementRef = (input?: HTMLInputElement) => {
    this.input = input;
  };

  render() {
    const {
      isPristine,
      showErrors,
      className,
      autoComplete,
      autoFocus,
      disabled,
      id,
      maxLength,
      name,
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
    } = this.props;

    return (
      <Input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={name}
        // onBlur={onBlur}
        // onChange={onChange}
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
        className={classNames('form-control', className, {
          'is-valid': !isPristine && !showErrors,
          'is-invalid': !isPristine && showErrors,
        })}
      />
    );
  }
}

export { FieldMonthStateless as FieldMonthStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldMonth',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldMonth',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldMonth',
        packageName,
        packageVersion,
      },
    }),
  })(FieldMonthStateless),
);
