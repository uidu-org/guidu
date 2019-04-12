import * as React from 'react';
export interface InlineCardResolvingViewProps {
    /** The url to display */
    url: string;
    /** The optional click handler */
    onClick?: () => void;
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
}
export declare class InlineCardResolvingView extends React.Component<InlineCardResolvingViewProps> {
    render(): JSX.Element;
}
