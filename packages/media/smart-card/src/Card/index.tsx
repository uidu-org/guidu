import * as React from 'react';
import { withAnalyticsForSumTypeProps } from '@atlaskit/analytics-next';
import { CardAppearance } from './types';
import { CardProps } from './types';
import {
  isCardWithData,
  CardWithDataRenderer,
  CardWithURLRenderer,
} from './render';
export { CardAppearance, CardProps };

class PlainCard extends React.PureComponent<CardProps> {
  render() {
    return isCardWithData(this.props) ? (
      <CardWithDataRenderer {...this.props} />
    ) : (
      <CardWithURLRenderer {...this.props} />
    );
  }
}

export const Card = withAnalyticsForSumTypeProps()(PlainCard);
