import { Component } from 'react';
export declare type MediaApiConfig = {
    clientId: string;
    token: string;
    baseUrl: string;
};
export interface MediaImageProps {
    id: string;
    mediaApiConfig: MediaApiConfig;
    className?: string;
    width?: number;
    height?: number;
    collectionName?: string;
}
export interface MediaImageState {
}
export declare class MediaImage extends Component<MediaImageProps, MediaImageState> {
    private readonly imgSrc;
    private readonly hasAuth;
    private readonly style;
    render(): JSX.Element;
}
export default MediaImage;
