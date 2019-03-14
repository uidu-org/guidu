import * as React from 'react';
import { Frame } from '../Frame';
import Spinner  from '@uidu/spinner';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { IconPlaceholderWrapper } from '../Icon';

export interface InlineCardResolvingViewProps {
  /** The url to display */
  url: string;
  /** The optional click handler */
  onClick?: () => void;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class InlineCardResolvingView extends React.Component<
  InlineCardResolvingViewProps
> {
  render() {
    const { url, onClick, isSelected } = this.props;
    return (
      <Frame onClick={onClick} isSelected={isSelected}>
        <IconAndTitleLayout
          icon={
            <IconPlaceholderWrapper>
              <Spinner size={16} />
            </IconPlaceholderWrapper>
          }
          title={url}
        />
      </Frame>
    );
  }
}
