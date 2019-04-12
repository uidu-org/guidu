import { Auth } from './auth';
export interface ClientBasedQueryParameters {
    readonly client: string;
    readonly token: string;
}
export interface AsapBasedQueryParameters {
    readonly issuer: string;
    readonly token: string;
}
export declare type AuthQueryParameters = ClientBasedQueryParameters | AsapBasedQueryParameters;
export declare function mapAuthToQueryParameters(auth: Auth): AuthQueryParameters;
