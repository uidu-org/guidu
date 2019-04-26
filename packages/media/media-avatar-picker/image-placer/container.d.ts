/**
 * The Container is responsible for implementing the mouse/touch events.
 * This way, you can still move the image without clicking directly on it.
 */
import * as React from 'react';
import { Vector2 } from '@uidu/media-ui';
export interface ImagePlacerContainerProps {
    width: number;
    height: number;
    margin: number;
    onDragStart: () => void;
    onDragMove: (delta: Vector2) => void;
    onWheel: (delta: number) => void;
}
export declare class ImagePlacerContainer extends React.Component<ImagePlacerContainerProps, {}> {
    private dragClientStart?;
    componentWillMount(): void;
    componentWillUnmount(): void;
    readonly isDragging: boolean;
    readonly isTouch: boolean;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    onMouseMove: (e: MouseEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onMouseUp: () => void;
    onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
