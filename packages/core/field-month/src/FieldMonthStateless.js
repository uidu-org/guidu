// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@uidu/analytics';
import { name as packageName, version as packageVersion } from './version.json';
import Input from './styled/Input';
import type { FieldMonthProps } from './types';

type Props = FieldMonthProps & {
  innerRef?: (node: ?HTMLInputElement) => void,
};

class FieldMonthStateless extends Component<Props, void> {
  static defaultProps = {
    disabled: false,
    isReadOnly: false,
    isSpellCheckEnabled: true,
    isPristine: true,
    innerRef: () => {},
    onChange: () => {},
    required: false,
    type: 'text',
  };

  input: ?HTMLInputElement;

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  initElementRef = (input: ?HTMLInputElement) => {
    this.input = input;
    // $FlowFixMe - Cannot call `this.props.innerRef` because undefined [1] is not a function
    this.props.innerRef(input);
  };

  render() {
    const {
      isPristine,
      showErrors,
      className,
      autoComplete,
      autoFocus,
      disabled,
      form,
      id,
      maxLength,
      min,
      max,
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
        form={form}
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
        className={classNames('form-control', className, {
          'is-valid': !isPristine && !showErrors,
          'is-invalid': !isPristine && showErrors,
        })}
      />
    );
  }
}

export { FieldMonthStateless as FieldMonthStatelessWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldMonth',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldMonth',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
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
