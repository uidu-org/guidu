import { Auth } from './auth';
export interface ClientBasedAuthHeaders {
    readonly 'X-Client-Id': string;
    readonly Authorization: string;
}
export interface AsapBasedAuthHeaders {
    readonly 'X-Issuer': string;
    readonly Authorization: string;
}
export declare type AuthHeaders = ClientBasedAuthHeaders | AsapBasedAuthHeaders;
export declare function mapAuthToAuthHeaders(auth: Auth): AuthHeaders;
