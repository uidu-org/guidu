import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldTextStatelessWithoutAnalytics } from '@uidu/field-text';
import React, { Component } from 'react';
import StyledInput from '../styled/Input';
import { FieldNumberProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class FieldNumberStateless extends Component<FieldNumberProps> {
  static defaultProps = {
    type: 'tel',
  };

  render() {
    const { options, onValueChange } = this.props;

    return (
      <FieldTextStatelessWithoutAnalytics
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
        {...this.props}
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
