import * as React from 'react';
import { LozengeViewModel } from '../../common';
export interface InlineCardResolvedViewProps {
    /** The optional con of the service (e.g. Dropbox/Asana/Google/etc) to display */
    icon?: string | React.ReactNode;
    /** The name of the resource */
    title: string;
    /** The the optional lozenge that might represent the statux of the resource */
    lozenge?: LozengeViewModel;
    /** A flag that determines whether the card is selected in edit mode. */
    isSelected?: boolean;
    /** The optional url */
    link?: string;
    /** The optional click handler */
    onClick?: () => void;
}
export declare class InlineCardResolvedView extends React.Component<InlineCardResolvedViewProps> {
    renderLozenge(): JSX.Element;
    render(): JSX.Element;
}
