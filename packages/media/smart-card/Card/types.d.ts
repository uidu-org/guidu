import { Client } from '../Client';
export declare type CardAppearance = 'inline' | 'block';
declare type BaseCardProps = {
    appearance: CardAppearance;
    isSelected?: boolean;
    onClick?: () => void;
    importer?: (target: any) => void;
};
export declare type CardWithData = BaseCardProps & {
    data: any;
};
export declare type CardWithUrl = BaseCardProps & {
    url: string;
    client?: Client;
};
export declare type CardProps = CardWithUrl | CardWithData;
export {};
