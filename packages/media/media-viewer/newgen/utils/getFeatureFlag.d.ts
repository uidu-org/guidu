import { MediaViewerFeatureFlags } from '../domain';
export declare const featureFlagsMap: {
    [key: string]: string;
};
export declare const getFeatureFlag: (featureName: never, featureFlags?: MediaViewerFeatureFlags) => boolean;
