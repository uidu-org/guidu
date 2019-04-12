import * as React from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next-types';
export declare type MentionItems = {
    /** Type is name that matches to database model. */
    type: string;
    /** Trigger is the string used to activate this mentionable item (es: @)*/
    trigger: string;
    /** Data is the list mention is matched against */
    data: Array<any> | Promise<any>;
    /** Function to render suggestion */
    renderSuggestion: (entry: string, search: string, highlightedDisplay: string, index: number, focused: boolean) => void;
    onAdd: (id: string, display: string) => void;
};
export declare type FieldMentionsProps = {
    /** Items to mention. */
    items: Array<MentionItems>;
    /** Function to handle display. */
    displayTransform: (id: string, display: string, type: string) => string;
    /** Function to handle display. */
    suggestionsPortalHost: (element: HTMLElement) => void;
};
export declare type FieldMentionsStatelessProps = {
    /** Add a classname to the button. */
    className?: string;
    /** Pass a reference on to the styled component */
    innerRef?: (element: HTMLElement) => void;
    /** Provide a unique id to the button. */
    id?: string;
    /** Set if the button is disabled. */
    isDisabled: boolean;
    /** Handler to be called on blur */
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Handler to be called on click. The second argument can be used to track analytics data. See the tutorial in the analytics-next package for details. */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, analyticsEvent: UIAnalyticsEvent) => void;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
    /** Handler to be called on focus */
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    /** Assign specific tabIndex order to the underlying html button. */
    tabIndex?: number;
    /** Set the button to autofocus on mount. */
    autoFocus: boolean;
    theme?: string;
} & FieldMentionsProps;
