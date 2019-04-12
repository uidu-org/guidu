import * as React from 'react';
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
export declare class BlockCardErroredView extends React.Component<BlockCardErroredViewProps> {
    handleRetry: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    render(): JSX.Element;
}
