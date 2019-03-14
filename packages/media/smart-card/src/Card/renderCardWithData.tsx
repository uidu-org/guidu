import * as React from 'react';
import { CardAppearance } from './types';
import { extractBlockPropsFromJSONLD } from '../extractBlockPropsFromJSONLD';
import { extractInlinePropsFromJSONLD } from '../extractInlinePropsFromJSONLD';
import {
  BlockCardResolvedView,
  InlineCardResolvedView,
} from '@uidu/media-ui';
import { DefinedState } from '../Client/types';

export interface CardWithDataContentProps {
  appearance: CardAppearance;
  data: DefinedState['data'];
  onClick?: () => void;
  isSelected?: boolean;
}

export class CardWithDataContent extends React.Component<
  CardWithDataContentProps
> {
  render() {
    const { data, isSelected, appearance, onClick } = this.props;

    if (appearance === 'inline') {
      return (
        <InlineCardResolvedView
          {...extractInlinePropsFromJSONLD(data || {})}
          isSelected={isSelected}
          onClick={onClick}
        />
      );
    } else {
      return (
        <BlockCardResolvedView
          {...extractBlockPropsFromJSONLD(data || {})}
          isSelected={isSelected}
          onClick={onClick}
        />
      );
    }
  }
}
