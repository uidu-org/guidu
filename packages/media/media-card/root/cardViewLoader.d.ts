import * as React from 'react';
import { CardViewOwnProps, CardView as CardViewType } from './cardView';
interface AsyncCardView {
    CardView?: typeof CardViewType;
}
/**
 * TODO: MS-699 Remove these loaders when CardView is no longer used externally
 */
export declare class CardView extends React.PureComponent<CardViewOwnProps & AsyncCardView> {
    static CardView?: typeof CardViewType;
    state: {
        CardView: typeof CardViewType;
    };
    componentWillMount(): void;
    render(): JSX.Element;
}
export {};
