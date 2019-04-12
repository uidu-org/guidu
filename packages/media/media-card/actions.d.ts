import { FileItem } from '@uidu/media-core';
import { ReactNode } from 'react';
export interface CardAction {
    label?: string;
    handler: CardEventHandler;
    icon?: ReactNode;
}
export declare type CardEventHandler = (item?: FileItem, event?: Event) => void;
