import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldTextStateless } from '@uidu/field-text';
import React, { Component } from 'react';
import StyledInput from '../styled/Input';
import { FieldNumberProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class FieldNumberStateless extends Component<FieldNumberProps, void> {
  static defaultProps = {
    type: 'tel',
  };

  render() {
    const { options, onValueChange } = this.props;

    return (
      <FieldTextStateless
        {...this.props}
        inputMode="numeric"
        component={StyledInput}
        options={{
          thousandSeparator: '.',
          decimalSeparator: ',',
          isNumericString: true,
          decimalScale: 2,
          onValueChange,
          ...options,
        }}
      />
    );
  }
}

export { FieldNumberStateless as FieldNumberStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldNumber',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName,
        packageVersion,
      },
    }),
  })(FieldNumberStateless),
);
