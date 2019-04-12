import * as React from 'react';
import { Card as CardType } from './index';
import { CardProps } from '../..';
interface AsyncCardProps {
    Card?: typeof CardType;
}
export default class Card extends React.PureComponent<CardProps & AsyncCardProps, AsyncCardProps> {
    static displayName: string;
    static Card?: typeof CardType;
    state: {
        Card: typeof CardType;
    };
    componentWillMount(): void;
    render(): JSX.Element;
}
export {};
