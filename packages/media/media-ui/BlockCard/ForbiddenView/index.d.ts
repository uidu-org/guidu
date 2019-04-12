import * as React from 'react';
export interface BlockCardForbiddenViewProps {
    /** The url to display */
    url: string;
    /** The optional click handler */
    onClick?: () => void;
    /** The optional click handler */
    onAuthorise?: () => void;
    isSelected?: boolean;
}
export declare class BlockCardForbiddenView extends React.Component<BlockCardForbiddenViewProps> {
    handleAuthorise: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    render(): JSX.Element;
}
