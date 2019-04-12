import { Component, ReactNode, MouseEvent } from 'react';
export declare type CardActionIconButtonProps = {
    readonly icon: ReactNode;
    readonly triggerColor?: string;
    readonly onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};
export declare class CardActionIconButton extends Component<CardActionIconButtonProps> {
    render(): JSX.Element;
}
