import * as React from 'react';
import { CardLoading } from '../utils/cardLoading';
import { CardViewOwnProps, CardView as CardViewType } from './cardView';

interface AsyncCardView {
  CardView?: typeof CardViewType;
}

/**
 * TODO: MS-699 Remove these loaders when CardView is no longer used externally
 */

export class CardView extends React.PureComponent<
  CardViewOwnProps & AsyncCardView
> {
  static CardView?: typeof CardViewType;

  state = {
    CardView: CardView.CardView,
  };

  componentWillMount() {
    if (!this.state.CardView) {
      import(/* webpackChunkName:"@atlaskit-internal_CardView" */
      './cardView').then(module => {
        CardView.CardView = module.CardView;
        this.setState({ CardView: module.CardView });
      });
    }
  }

  render() {
    const { dimensions } = this.props;

    if (!this.state.CardView) {
      return <CardLoading dimensions={dimensions} />;
    }

    return <this.state.CardView {...this.props} />;
  }
}
