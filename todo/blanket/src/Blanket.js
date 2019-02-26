// @flow
import React, { PureComponent } from 'react';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import Div from './styled';

type Props = {
  /** Whether mouse events can pierce the blanket. If true, onBlanketClicked will not be fired */
  canClickThrough: boolean,
  /** Whether the blanket has a tinted background color. */
  isTinted: boolean,
  /** Handler function to be called when the blanket is clicked */
  onBlanketClicked: (event: SyntheticMouseEvent<*>) => void,
};

class Blanket extends PureComponent<Props, void> {
  static defaultProps = {
    canClickThrough: false,
    isTinted: false,
    onBlanketClicked: () => {},
  };

  render() {
    const { canClickThrough, isTinted, onBlanketClicked } = this.props;
    const onClick = canClickThrough ? null : onBlanketClicked;
    const containerProps = { canClickThrough, isTinted, onClick };

    return <Div {...containerProps} />;
  }
}

export { Blanket as BlanketWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'blanket',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlanketClicked: createAndFireEventOnAtlaskit({
      action: 'clicked',
      actionSubject: 'blanket',

      attributes: {
        componentName: 'blanket',
        packageName,
        packageVersion,
      },
    }),
  })(Blanket),
);
