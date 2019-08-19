import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldTextStateless } from '@uidu/field-text';
import React, { Component } from 'react';
import TimeField from 'react-simple-timefield';
import { FieldTimeProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class FieldTimeStateless extends Component<FieldTimeProps> {
  static defaultProps = {
    // type: 'tel',
    className: 'form-control',
  };

  render() {
    return (
      <TimeField
        {...this.props}
        input={<FieldTextStateless />} // {Element}  default: <input type="text" />
        colon=":" // {String}   default: ":"
        // showSeconds // {Boolean}  default: false
      />
    );
  }
}

export { FieldTimeStateless as FieldTimeStatelessWithoutAnalytics };
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
  })(FieldTimeStateless),
);
