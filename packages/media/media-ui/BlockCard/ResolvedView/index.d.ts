import * as React from 'react';
import { LozengeViewModel } from '../../common';
export interface ContextViewModel {
    icon?: string;
    text: string;
}
export interface IconWithTooltip {
    url: string;
    tooltip?: string;
}
export interface TextWithTooltip {
    text: string;
    tooltip?: string;
}
export interface UserViewModel {
    icon?: string;
    name?: string;
}
export interface BadgeViewModel {
    value: number;
    max?: number;
    appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed';
}
export interface DetailViewModel {
    title?: string;
    icon?: string | React.ReactNode;
    badge?: BadgeViewModel;
    lozenge?: LozengeViewModel;
    text?: string;
    tooltip?: string;
}
export interface ActionHandlerCallbacks {
    pending: () => void;
    success: (message?: string) => void;
    failure: () => void;
}
export interface Action {
    id: string;
    text: string;
    handler: (callbacks: ActionHandlerCallbacks) => void;
}
export interface BlockCardResolvedViewProps {
    /** The context view model */
    context?: ContextViewModel;
    /** The link to display */
    link?: string;
    /** The optional con of the service (e.g. Dropbox/Asana/Google/etc) to display */
    icon?: IconWithTooltip | React.ReactNode;
    /** The user view model */
    user?: UserViewModel;
    /** The thumbnail to display */
    thumbnail?: string;
    /** The preview to display */
    preview?: string;
    /** The name of the resource */
    title?: TextWithTooltip;
    /** The line to display */
    byline?: TextWithTooltip | React.ReactNode;
    /** The description to display */
    description?: TextWithTooltip;
    /** The detail view model */
    details?: DetailViewModel[];
    /** An array of user */
    users?: UserViewModel[];
    /** An array of action */
    actions?: Action[];
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
    /** The optional click handler */
    onClick?: () => void;
}
export interface ResolvedViewState {
    lastFailedAction?: Action;
    pendingActionsById: {
        [id: string]: boolean;
    };
    alert?: {
        type: 'success' | 'failure';
        text: string;
    };
}
export declare class BlockCardResolvedView extends React.Component<BlockCardResolvedViewProps, ResolvedViewState> {
    state: ResolvedViewState;
    alertTimeout?: number;
    handleAvatarClick: ({ event }: {
        event: React.MouseEvent<Element, MouseEvent>;
    }) => void;
    handleMoreAvatarsClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    getActionHandlerCallbacks(action: Action): {
        pending: () => void;
        success: (message?: string) => void;
        failure: () => void;
    };
    createActionHandler: (action: Action) => (event: React.MouseEvent<Element, MouseEvent>) => void;
    handleActionRetry: () => void;
    handleActionDismis: () => void;
    componentWillUnmount(): void;
    renderIcon(): {};
    renderThumbnail(): JSX.Element;
    renderUser(): JSX.Element;
    renderUsers(): JSX.Element;
    renderActions(): JSX.Element;
    renderAlert(): JSX.Element;
    renderWithToolTip(Elem: React.ComponentClass<any>, model: {
        text: string;
        tooltip?: string;
    }): JSX.Element;
    render(): JSX.Element;
}
