import { Component } from 'react';
import { CardAction } from '../../actions';
export declare type CardActionsDropdownMenuProps = {
    readonly actions: CardAction[];
    readonly triggerColor?: string;
    readonly onOpenChange?: (attrs: {
        isOpen: boolean;
    }) => void;
};
export declare class CardActionsDropdownMenu extends Component<CardActionsDropdownMenuProps> {
    render(): JSX.Element | null;
}
