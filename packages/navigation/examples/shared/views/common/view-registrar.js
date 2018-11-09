// @flow

import { Component } from 'react';
import { withNavigationViewController } from '../../../../src';

import getAnalyticsAttributes from './get-analytics-attributes';

import type { ViewComponentProps } from './types';

type Props = ViewComponentProps & {
  navigationViewController: *,
};
class ViewRegistrarBase extends Component<Props> {
  componentDidMount() {
    const {
      navigationViewController,
      viewId,
      getItemsFactory,
      type,
      getAnalyticsAttributes: customGetAnalyticsAttributes,
    } = this.props;

    if (!navigationViewController.views[viewId]) {
      navigationViewController.addView({
        getAnalyticsAttributes:
          customGetAnalyticsAttributes || getAnalyticsAttributes,
        getItems: getItemsFactory(),
        id: viewId,
        type,
      });
    }
  }

  render() {
    return null;
  }
}

export default withNavigationViewController(ViewRegistrarBase);
