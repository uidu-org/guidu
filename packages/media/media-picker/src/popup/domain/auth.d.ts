import { Auth } from '@uidu/media-core';
export interface ClientBasedAuthHeaders {
    readonly 'X-Client-Id': string;
    readonly Authorization: string;
}
export interface AsapBasedAuthHeaders {
    readonly 'X-Issuer': string;
    readonly Authorization: string;
}
export declare type AuthHeaders = ClientBasedAuthHeaders | AsapBasedAuthHeaders;
export interface ClientBasedQueryParameters {
    readonly client: string;
    readonly token: string;
}
export interface AsapBasedQueryParameters {
    readonly issuer: string;
    readonly token: string;
}
export declare type AuthQueryParameters = ClientBasedQueryParameters | AsapBasedQueryParameters;
export declare function mapAuthToAuthHeaders(auth: Auth): AuthHeaders;
export declare function mapAuthToQueryParameters(auth: Auth): AuthQueryParameters;
