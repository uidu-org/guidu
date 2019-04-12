import { AuthProvider } from '@uidu/media-core';
export declare class StoryBookAuthProvider {
    static create(isAsapEnvironment: boolean, access?: {
        [resourceUrn: string]: string[];
    }): AuthProvider;
}
