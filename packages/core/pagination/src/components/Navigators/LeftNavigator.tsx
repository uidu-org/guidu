import React, { Component } from 'react';
import { ChevronLeft } from 'react-feather';
import Navigator, { NavigatorPropsType } from './Navigator';

export default class LeftNavigator extends Component<NavigatorPropsType> {
  static defaultProps = {
    'aria-label': 'previous',
    iconBefore: <ChevronLeft size={16} />,
    isDisabled: false,
  };

  render() {
    return <Navigator {...this.props} />;
  }
}
