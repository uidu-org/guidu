import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import { AnalyticsReactContext } from './AnalyticsReactContext';

const ContextTypes = {
  getAnalyticsContext: PropTypes.func,
  getAnalyticsEventHandlers: PropTypes.func,
};

interface Props {
  /** Children! */
  children: React.ReactNode;
  /** Arbitrary data. Any events created below this component in the tree will
   * have this added as an item in their context array. */
  data: unknown;
}

interface State {
  getAnalyticsContext: () => any[];
  getAnalyticsEventHandlers: () => any[];
}

class AnalyticsContext extends Component<Props, State> {
  static contextTypes = ContextTypes;
  static childContextTypes = ContextTypes;

  constructor(props: Props) {
    super(props);
    this.state = {
      getAnalyticsContext: this.getAnalyticsContext,
      getAnalyticsEventHandlers: this.getAnalyticsEventHandlers,
    };
  }

  getChildContext = () => ({
    getAnalyticsContext: this.getAnalyticsContext,
  });

  getAnalyticsContext = () => {
    const { data } = this.props;
    const { getAnalyticsContext } = this.context;
    const ancestorData =
      (typeof getAnalyticsContext === 'function' && getAnalyticsContext()) ||
      [];

    return [...ancestorData, data];
  };

  getAnalyticsEventHandlers = () => {
    const { getAnalyticsEventHandlers } = this.context;
    const ancestorHandlers =
      (typeof getAnalyticsEventHandlers === 'function' &&
        getAnalyticsEventHandlers()) ||
      [];
    return ancestorHandlers;
  };

  render() {
    const { children } = this.props;
    return (
      <AnalyticsReactContext.Provider value={this.state}>
        {Children.only(children)}
      </AnalyticsReactContext.Provider>
    );
  }
}

export default AnalyticsContext;
