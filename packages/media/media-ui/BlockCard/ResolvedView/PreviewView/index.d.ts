import * as React from 'react';
export declare const LoadingView: () => JSX.Element;
export declare const NoImageView: () => JSX.Element;
export declare const LoadedView: ({ url }: {
    url: string;
}) => JSX.Element;
export interface PreviewViewProps {
    url?: string;
}
export declare class PreviewView extends React.Component<PreviewViewProps> {
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
