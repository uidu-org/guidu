import { Auth, AuthContext, AuthProvider } from '@uidu/media-core';
export declare const mediaPickerAuthProvider: (authEnvironment?: string) => (context?: AuthContext) => Promise<Auth>;
export declare const defaultMediaPickerAuthProvider: AuthProvider;
