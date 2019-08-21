import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';

const ContextTypes = {
  getAtlaskitAnalyticsContext: PropTypes.func,
};

interface Props {
  /** Children! */
  children: React.ReactNode;
  /** Arbitrary data. Any events created below this component in the tree will
   * have this added as an item in their context array. */
  data: unknown;
}

export default class AnalyticsContext extends Component<Props> {
  static contextTypes = ContextTypes;
  static childContextTypes = ContextTypes;

  getChildContext = () => ({
    getAtlaskitAnalyticsContext: this.getAnalyticsContext,
  });

  getAnalyticsContext = () => {
    const { data } = this.props;
    const { getAtlaskitAnalyticsContext } = this.context;
    const ancestorData =
      (typeof getAtlaskitAnalyticsContext === 'function' &&
        getAtlaskitAnalyticsContext()) ||
      [];

    return [...ancestorData, data];
  };

  render() {
    return Children.only(this.props.children);
  }
}
