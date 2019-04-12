import * as React from 'react';
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
export declare class InlineCardUnauthorizedView extends React.Component<InlineCardUnauthorizedViewProps> {
    handleConnectAccount: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    render(): JSX.Element;
}
