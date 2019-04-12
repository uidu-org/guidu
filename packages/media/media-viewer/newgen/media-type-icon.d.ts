import * as React from 'react';
import { MediaType } from '@uidu/media-core';
export interface FileIconProps {
    type?: MediaType;
}
export declare class MediaTypeIcon extends React.Component<FileIconProps, {}> {
    static defaultProps: FileIconProps;
    render(): JSX.Element;
}
