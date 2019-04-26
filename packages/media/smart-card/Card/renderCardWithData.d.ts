import * as React from 'react';
import { CardAppearance } from './types';
import { DefinedState } from '../Client/types';
export interface CardWithDataContentProps {
    appearance: CardAppearance;
    data: DefinedState['data'];
    onClick?: () => void;
    isSelected?: boolean;
}
export declare class CardWithDataContent extends React.Component<CardWithDataContentProps> {
    render(): JSX.Element;
}
