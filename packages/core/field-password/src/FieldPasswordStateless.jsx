// @flow

import React, { Component } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@uidu/analytics';
import { FieldTextStateless } from '@uidu/field-text';
import { name as packageName, version as packageVersion } from './version.json';

import type { FieldPasswordProps } from './types';

type Props = FieldPasswordProps & {
  innerRef?: (node: ?HTMLInputElement) => void,
};

class FieldPasswordStateless extends Component<Props, void> {
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
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldPassword',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldPassword',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
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
