import { Context } from '@uidu/media-core';
export declare const defaultBaseUrl = "https://dt-api.dev.atl-paas.net";
export declare const defaultParams: {
    clientId: string;
    asapIssuer: string;
    baseUrl: string;
};
export interface AuthParameter {
    authType: 'client' | 'asap';
}
/**
 * Creates and returns `Context` (from `media-core`) based on the data provided in parameter object.
 *
 * @param {AuthParameter} authParameter specifies serviceName and whatever auth should be done with clientId or asapIssuer
 * @returns {Context}
 */
export declare const createStorybookContext: (authParameter?: AuthParameter) => Context;
export declare const createUploadContext: () => Context;
