import { Component } from 'react';
import { CardDimensions } from '../..';
export interface LoadingCardProps {
    iconSize?: 'small' | 'medium' | 'large';
    dimensions?: CardDimensions;
}
export declare const getDimensionsWithDefault: (dimensions?: CardDimensions) => CardDimensions;
export declare class CardLoading extends Component<LoadingCardProps, {}> {
    render(): JSX.Element;
    readonly iconSize: "small" | "medium" | "large";
    readonly icon: JSX.Element;
}
