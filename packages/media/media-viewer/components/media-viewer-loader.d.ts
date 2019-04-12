import * as React from 'react';
import { MediaViewer } from './media-viewer';
import { MediaViewerProps } from './types';
interface AsyncMediaViewerState {
    MediaViewer?: typeof MediaViewer;
}
export default class AsyncMediaViewer extends React.PureComponent<MediaViewerProps & AsyncMediaViewerState, AsyncMediaViewerState> {
    static displayName: string;
    static MediaViewer?: typeof MediaViewer;
    state: {
        MediaViewer: typeof MediaViewer;
    };
    componentWillMount(): Promise<void>;
    render(): JSX.Element;
}
export {};
