import { CardAppearance } from '../Card';
import Environments from '../environments';
export interface CardProvider {
    resolve(url: string, appearance: CardAppearance): Promise<any>;
}
export declare type ORSCheckResponse = {
    isSupported: boolean;
};
export declare type EnvironmentsKeys = keyof typeof Environments;
export declare class EditorCardProvider implements CardProvider {
    private envKey;
    constructor(envKey?: EnvironmentsKeys);
    resolve(url: string, appearance: CardAppearance): Promise<any>;
}
export declare const editorCardProvider: EditorCardProvider;
