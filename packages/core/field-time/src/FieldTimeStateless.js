// @flow

import React, { Component } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@uidu/analytics';
import { FieldTextStateless } from '@uidu/field-text';
import TimeField from 'react-simple-timefield';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import StyledInput from './styled/Input';
import type { FieldTimeProps } from './types';

type Props = FieldTimeProps & {
  innerRef?: (node: ?HTMLInputElement) => void,
};

class FieldTimeStateless extends Component<Props, void> {
  static defaultProps = {
    // type: 'tel',
    className: 'form-control',
  };

  render() {
    const { options, value, ...otherProps } = this.props;

    console.log(this.props);

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
  })(FieldTimeStateless),
);
