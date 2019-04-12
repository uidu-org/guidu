import { Component } from 'react';
import { CardAction } from '../../actions';
export interface CardActionsViewProps {
    readonly actions: CardAction[];
    readonly onToggle?: (attrs: {
        isOpen: boolean;
    }) => void;
    readonly triggerColor?: string;
}
export declare class CardActionsView extends Component<CardActionsViewProps> {
    render(): JSX.Element | null;
    private renderActionIconButton;
    private renderOtherActionButtons;
}
