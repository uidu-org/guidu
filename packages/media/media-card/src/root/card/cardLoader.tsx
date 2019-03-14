import * as React from 'react';
import { CardLoading } from '../../utils/cardLoading';
import { Card as CardType } from './index';
import { CardProps } from '../..';

interface AsyncCardProps {
  Card?: typeof CardType;
}

export default class Card extends React.PureComponent<
  CardProps & AsyncCardProps,
  AsyncCardProps
> {
  static displayName = 'AsyncCard';
  static Card?: typeof CardType;

  state = {
    Card: Card.Card,
  };

  componentWillMount() {
    if (!this.state.Card) {
      import(/* webpackChunkName:"@atlaskit-internal_Card" */
      './index').then(module => {
        Card.Card = module.Card;
        this.setState({ Card: module.Card });
      });
    }
  }

  render() {
    const { dimensions } = this.props;

    if (!this.state.Card) {
      return <CardLoading dimensions={dimensions} />;
    }

    return <this.state.Card {...this.props} />;
  }
}
