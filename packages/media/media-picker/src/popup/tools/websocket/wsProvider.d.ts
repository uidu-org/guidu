import { Auth } from '@uidu/media-core';
import { WsConnectionHolder } from './wsConnectionHolder';
export declare class WsProvider {
    private connectionHolders;
    getWsConnectionHolder(auth: Auth): WsConnectionHolder;
    private createAndRemember;
    private static mapAuthToTag;
}
