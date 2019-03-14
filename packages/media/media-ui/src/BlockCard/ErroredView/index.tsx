import * as React from 'react';
import Button from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { colors } from '@atlaskit/theme';
import { CollapsedFrame } from '../CollapsedFrame';
import { minWidth, maxWidth } from '../dimensions';
import { CollapsedIconTitleDescriptionLayout } from '../CollapsedIconTitleDescriptionLayout';

export interface BlockCardErroredViewProps {
  /** The url to display */
  url: string;
  /** The optional click handler */
  onClick?: () => void;
  /** The error message to display */
  message: string;
  /** What to do when a user clicks "Try again" button. */
  onRetry?: () => void;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class BlockCardErroredView extends React.Component<
  BlockCardErroredViewProps
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
      <CollapsedFrame
        isSelected={isSelected}
        minWidth={minWidth}
        maxWidth={maxWidth}
        onClick={onClick}
      >
        <CollapsedIconTitleDescriptionLayout
          icon={
            <WarningIcon
              label="error"
              size="medium"
              primaryColor={colors.Y300}
            />
          }
          title={url}
          description={
            <>
              {message}{' '}
              {onRetry && (
                <Button
                  appearance="link"
                  spacing="none"
                  onClick={this.handleRetry}
                >
                  Try again
                </Button>
              )}
            </>
          }
        />
      </CollapsedFrame>
    );
  }
}
