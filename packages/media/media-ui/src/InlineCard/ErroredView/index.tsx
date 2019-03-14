import * as React from 'react';
import { colors } from '@atlaskit/theme';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Button from '@atlaskit/button';
import { truncateUrlForErrorView } from '../utils';
import { Frame } from '../Frame';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { AKIconWrapper } from '../Icon';

export interface InlineCardErroredViewProps {
  /** The url to display */
  url: string;
  /** The error message to display */
  message: string;
  /** The optional click handler */
  onClick?: () => void;
  /** What to do when a user clicks "Try again" button */
  onRetry?: () => void;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class InlineCardErroredView extends React.Component<
  InlineCardErroredViewProps
> {
  handleRetry = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { onRetry } = this.props;
    if (onRetry) {
      event.preventDefault();
      event.stopPropagation();
      onRetry();
    }
  };

  render() {
    const { url, message, onClick, onRetry, isSelected } = this.props;
    return (
      <Frame onClick={onClick} isSelected={isSelected}>
        <IconAndTitleLayout
          icon={
            <AKIconWrapper>
              <ErrorIcon
                label="error"
                size="small"
                primaryColor={colors.R300}
              />
            </AKIconWrapper>
          }
          title={
            <span style={{ color: colors.R300 }}>
              {truncateUrlForErrorView(url) + ' - ' + message.trim()}
            </span>
          }
        />{' '}
        {onRetry && (
          <Button spacing="none" appearance="link" onClick={this.handleRetry}>
            Try again
          </Button>
        )}
      </Frame>
    );
  }
}
