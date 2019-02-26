// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import PropTypes from 'prop-types';
import { shouldReportItemHeight } from './shared-variables';

type Props = {
  children: Node,
};

export default class OverflowHeightReportEnabler extends Component<Props> {
  static childContextTypes = {
    [shouldReportItemHeight]: PropTypes.bool,
  };

  getChildContext() {
    return {
      [shouldReportItemHeight]: true,
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
