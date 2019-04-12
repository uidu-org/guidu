export interface ClientAltBasedAuth {
    readonly id: string;
    readonly token: string;
    readonly baseUrl: string;
}
export interface ClientBasedAuth {
    readonly clientId: string;
    readonly token: string;
    readonly baseUrl: string;
}
export interface AsapBasedAuth {
    readonly asapIssuer: string;
    readonly token: string;
    readonly baseUrl: string;
}
export declare type Auth = ClientBasedAuth | AsapBasedAuth;
export declare function isClientBasedAuth(auth: Auth): auth is ClientBasedAuth;
export declare function isAsapBasedAuth(auth: Auth): auth is AsapBasedAuth;
export interface ContextConfig {
    readonly cacheSize?: number;
    readonly authProvider: AuthProvider;
    readonly userAuthProvider?: AuthProvider;
}
export interface AuthContext {
    readonly collectionName?: string;
}
export declare type AuthProvider = (context?: AuthContext) => Promise<Auth>;
export declare type MediaApiConfig = {
    authProvider: AuthProvider;
};
