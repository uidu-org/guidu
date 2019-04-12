import * as React from 'react';
export interface FrameViewProps {
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
    /** A flag that determines whether the card needs a backgorund or not */
    withoutBackground?: boolean;
    children?: React.ReactNode;
    link?: string;
    /** The optional click handler */
    onClick?: () => void;
}
export declare class Frame extends React.Component<FrameViewProps> {
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
