import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import { AnalyticsReactContext } from './AnalyticsReactContext';

const ContextTypes = {
  getGuiduAnalyticsContext: PropTypes.func,
  getGuidulyticsEventHandlers: PropTypes.func,
};

interface Props {
  /** Children! */
  children: React.ReactNode;
  /** Arbitrary data. Any events created below this component in the tree will
   * have this added as an item in their context array. */
  data: unknown;
}

interface State {
  getGuiduAnalyticsContext: () => any[];
  getGuiduAnalyticsEventHandlers: () => any[];
}

class AnalyticsContext extends Component<Props, State> {
  static contextTypes = ContextTypes;
  static childContextTypes = ContextTypes;

  constructor(props: Props) {
    super(props);
    this.state = {
      getGuiduAnalyticsContext: this.getAnalyticsContext,
      getGuiduAnalyticsEventHandlers: this.getAnalyticsEventHandlers,
    };
  }

  getChildContext = () => ({
    getGuiduAnalyticsContext: this.getAnalyticsContext,
  });

  getAnalyticsContext = () => {
    const { data } = this.props;
    const { getGuiduAnalyticsContext } = this.context;
    const ancestorData =
      (typeof getGuiduAnalyticsContext === 'function' &&
        getGuiduAnalyticsContext()) ||
      [];

    return [...ancestorData, data];
  };

  getAnalyticsEventHandlers = () => {
    const { getGuiduAnalyticsEventHandlers } = this.context;
    const ancestorHandlers =
      (typeof getGuiduAnalyticsEventHandlers === 'function' &&
        getGuiduAnalyticsEventHandlers()) ||
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
