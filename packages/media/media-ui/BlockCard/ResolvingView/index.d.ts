import * as React from 'react';
export interface BlockCardResolvingViewProps {
    /** The optional click handler */
    onClick?: () => void;
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
}
export declare class BlockCardResolvingView extends React.Component<BlockCardResolvingViewProps> {
    render(): JSX.Element;
}
