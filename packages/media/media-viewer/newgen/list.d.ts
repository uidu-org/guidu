import * as React from 'react';
import { Context, FileIdentifier } from '@uidu/media-core';
import { MediaViewerFeatureFlags } from './domain';
export declare type Props = Readonly<{
    onClose?: () => void;
    onNavigationChange?: (selectedItem: FileIdentifier) => void;
    showControls?: () => void;
    featureFlags?: MediaViewerFeatureFlags;
    defaultSelectedItem: FileIdentifier;
    items: FileIdentifier[];
    context: Context;
}>;
export declare type State = {
    selectedItem: FileIdentifier;
    previewCount: number;
};
export declare class List extends React.Component<Props, State> {
    state: State;
    render(): JSX.Element;
    renderContent(items: FileIdentifier[]): JSX.Element;
    onNavigationChange: (selectedItem: FileIdentifier) => void;
}
