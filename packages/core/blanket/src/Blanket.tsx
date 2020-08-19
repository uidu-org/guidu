import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@uidu/analytics';
import React from 'react';
import Div from './styled';
import pkg from './version.json';

interface Props extends WithAnalyticsEventsProps {
  /** Whether mouse events can pierce the blanket. If true, onBlanketClicked will not be fired */
  canClickThrough?: boolean;
  /** Whether the blanket has a tinted background color. */
  isTinted?: boolean;
  /** Handler function to be called when the blanket is clicked */
  onBlanketClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Stacked blankets have higher z-index references */
  isStacked?: boolean;
  /** Padding right is added by parent container if blanket shoul account for scrollbar */
  paddingRight?: number;
}

function Blanket({
  canClickThrough = false,
  isTinted = false,
  onBlanketClicked = () => {},
  isStacked = false,
  paddingRight = 0,
}: Props) {
  const onClick = canClickThrough ? null : onBlanketClicked;
  const containerProps = {
    canClickThrough,
    isTinted,
    onClick,
    isStacked,
    paddingRight,
  };

  return (
    <>
      <Div {...containerProps} />
    </>
  );
}

export { Blanket as BlanketWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'blanket',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlanketClicked: createAndFireEventOnAtlaskit({
      action: 'clicked',
      actionSubject: 'blanket',

      attributes: {
        componentName: 'blanket',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(Blanket),
);
