import * as React from 'react';
export interface BlockCardUnauthorisedViewProps {
    /** The icon of the service (e.g. Dropbox/Asana/Google/etc) to display */
    icon?: string;
    /** The url to display */
    url: string;
    /** The optional click handler */
    onClick?: () => void;
    /** The optional handler for "Connect" button */
    onAuthorise?: () => void;
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
}
export declare class BlockCardUnauthorisedView extends React.Component<BlockCardUnauthorisedViewProps> {
    handleAuthorise: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    render(): JSX.Element;
}
