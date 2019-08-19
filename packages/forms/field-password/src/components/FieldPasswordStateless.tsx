import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldTextStateless } from '@uidu/field-text';
import React, { Component } from 'react';
import { FieldPasswordProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

class FieldPasswordStateless extends Component<
  FieldPasswordProps & {
    isPasswordVisible: boolean;
  }
> {
  static defaultProps = {
    isPasswordVisible: false,
  };

  render() {
    const { isPasswordVisible } = this.props;
    if (isPasswordVisible) {
      return <FieldTextStateless {...this.props} type="text" />;
    }
    return <FieldTextStateless {...this.props} type="password" />;
  }
}

export { FieldPasswordStateless as FieldPasswordStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldPassword',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldPassword',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldPassword',
        packageName,
        packageVersion,
      },
    }),
  })(FieldPasswordStateless),
);
