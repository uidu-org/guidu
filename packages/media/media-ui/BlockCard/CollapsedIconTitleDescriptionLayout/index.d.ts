import * as React from 'react';
export interface CollapsedIconTitleDescriptionLayoutProps {
    icon?: React.ReactNode;
    title: string;
    description: React.ReactNode;
    other?: React.ReactNode;
}
export declare class CollapsedIconTitleDescriptionLayout extends React.Component<CollapsedIconTitleDescriptionLayoutProps> {
    render(): JSX.Element;
}
