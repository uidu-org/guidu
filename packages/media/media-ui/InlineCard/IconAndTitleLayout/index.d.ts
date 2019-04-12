import * as React from 'react';
export interface IconAndTitleLayoutProps {
    icon?: React.ReactNode;
    title: React.ReactNode;
    right?: React.ReactNode;
}
export declare class IconAndTitleLayout extends React.Component<IconAndTitleLayoutProps> {
    renderIcon(): JSX.Element;
    render(): JSX.Element;
}
