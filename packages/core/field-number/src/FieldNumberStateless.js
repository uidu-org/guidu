// @flow

import React, { Component } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@uidu/analytics';
import { FieldTextStateless } from '@uidu/field-text';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import StyledInput from './styled/Input';
import type { FieldNumberProps } from './types';

type Props = FieldNumberProps & {
  innerRef?: (node: ?HTMLInputElement) => void,
};

class FieldNumberStateless extends Component<Props, void> {
  static defaultProps = {
    type: 'tel',
  };

  render() {
    const { options, onValueChange } = this.props;

    return (
      <FieldTextStateless
        {...this.props}
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
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldNumber',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
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
