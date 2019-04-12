import * as React from 'react';
export interface CollapsedFrameProps {
    minWidth?: number;
    maxWidth?: number;
    children?: React.ReactNode;
    /** The optional click handler */
    onClick?: () => void;
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
}
export declare class CollapsedFrame extends React.Component<CollapsedFrameProps> {
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
