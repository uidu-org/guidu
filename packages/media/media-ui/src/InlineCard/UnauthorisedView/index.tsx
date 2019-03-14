import * as React from 'react';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import Button from '@atlaskit/button';
import { truncateUrlForErrorView } from '../utils';
import { Frame } from '../Frame';
import { colors } from '@atlaskit/theme';

export interface InlineCardUnauthorizedViewProps {
  /** The url to display */
  url: string;
  /** The icon of the service (e.g. Dropbox/Asana/Google/etc) to display */
  icon?: string;
  /** The optional click handler */
  onClick?: () => void;
  /** What to do when a user hit "Try another account" button */
  onAuthorise?: () => void;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class InlineCardUnauthorizedView extends React.Component<
  InlineCardUnauthorizedViewProps
> {
  handleConnectAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { onAuthorise } = this.props;
    event.preventDefault();
    event.stopPropagation();
    return onAuthorise!();
  };

  render() {
    const { url, icon, onClick, isSelected, onAuthorise } = this.props;
    return (
      <Frame onClick={onClick} isSelected={isSelected}>
        <IconAndTitleLayout
          icon={icon}
          title={
            <span style={{ color: colors.N500 }}>
              {truncateUrlForErrorView(url)}
            </span>
          }
        />
        {!onAuthorise ? (
          ''
        ) : (
          <>
            {' - '}
            <Button
              spacing="none"
              appearance="link"
              onClick={this.handleConnectAccount}
            >
              Connect your account to preview links
            </Button>
          </>
        )}
      </Frame>
    );
  }
}
