import { GasPayload } from '@atlaskit/analytics-gas-types';
import { ObjectState } from './Client/types';
export declare const ANALYTICS_CHANNEL = "media";
export declare const context: {
    componentName: string;
    packageName: string;
    packageVersion: string;
};
export declare const resolvedEvent: (url: string) => GasPayload;
export declare const unresolvedEvent: (url: string, state: ObjectState) => GasPayload;
export declare const connectSucceededEvent: (url: string, state: ObjectState) => GasPayload;
export declare const connectFailedEvent: (reason: string, url: string, state: ObjectState) => GasPayload;
export declare const trackAppAccountConnected: (definitionId?: string) => {
    action: string;
    actionObject: string;
    eventType: string;
    attributes: {
        definitionId: string;
        componentName: string;
        packageName: string;
        packageVersion: string;
    };
};
