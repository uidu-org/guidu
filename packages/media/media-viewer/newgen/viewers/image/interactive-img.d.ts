import * as React from 'react';
import { Camera, Vector2 } from '@uidu/media-ui';
import { ZoomLevel } from '../../domain/zoomLevel';
import { Outcome } from '../../domain';
export declare function zoomLevelAfterResize(newCamera: Camera, oldCamera: Camera, oldZoomLevel: ZoomLevel): ZoomLevel;
export declare type Props = {
    src: string;
    orientation?: number;
    onClose?: () => void;
    onLoad: () => void;
    onError: () => void;
};
export declare type State = {
    zoomLevel: ZoomLevel;
    camera: Outcome<Camera, never>;
    isDragging: boolean;
    cursorPos: Vector2;
};
export declare class InteractiveImg extends React.Component<Props, State> {
    state: State;
    private wrapper?;
    private saveWrapperRef;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private onImgLoad;
    private onError;
    private onResize;
    private onZoomChange;
    private startDragging;
    private stopDragging;
    private panImage;
}
