// @flow
import React, { Component } from 'react';

import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@uidu/analytics';
import Switch from 'react-switch';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import defaultBaseProps from './defaultBaseProps';
import type { StatelessProps, DefaultBaseProps } from './types';

type State = {|
  // not controlled by props but by browser focus
  isFocused: boolean,
|};

type DefaultProps = DefaultBaseProps & {
  isChecked: boolean,
};

class ToggleStateless extends Component<StatelessProps, State> {
  static defaultProps: DefaultProps = {
    ...defaultBaseProps,
    isChecked: false,
  };

  state: State = {
    isFocused: false,
  };

  handleBlur = (event: Event) => {
    this.setState({
      isFocused: false,
    });
    this.props.onBlur(event);
  };

  handleFocus = (event: Event) => {
    this.setState({ isFocused: true });
    this.props.onFocus(event);
  };

  handleChange = (event: Event) => {
    if (this.props.isDisabled) {
      return;
    }
    this.props.onChange(event);
  };

  render() {
    const { isChecked, isDisabled, label, name, size, value } = this.props;
    const { isFocused } = this.state;

    const styledProps = {
      isChecked,
      isDisabled,
      isFocused,
      size,
    };

    console.log(styledProps);

    return (
      <Switch
        {...this.props}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        checked={isChecked}
        uncheckedIcon={false}
        checkedIcon={false}
        offColor="#ededed"
        onColor="#28a745"
        // offHandleColor="#0ff"
        // onHandleColor="#08f"
        height={28}
        width={56}
      />
    );
  }
}

export { ToggleStateless as ToggleStatelessWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'toggle',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'toggle',

      attributes: {
        componentName: 'toggle',
        packageName,
        packageVersion,
      },
    }),

    onChange: createAndFireEventOnAtlaskit({
      action: 'changed',
      actionSubject: 'toggle',

      attributes: {
        componentName: 'toggle',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'toggle',

      attributes: {
        componentName: 'toggle',
        packageName,
        packageVersion,
      },
    }),
  })(ToggleStateless),
);
