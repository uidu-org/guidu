import React, { Component } from 'react';
import { ChevronRight } from 'react-feather';
import Navigator, { NavigatorPropsType } from './Navigator';

export default class RightNavigator extends Component<NavigatorPropsType> {
  static defaultProps = {
    'aria-label': 'next',
    iconBefore: <ChevronRight size={16} />,
    isDisabled: false,
  };

  render() {
    return <Navigator {...this.props} />;
  }
}
