import * as tslib_1 from "tslib";
import { name as packageName, version as packageVersion, } from '../package.json';
export var ANALYTICS_CHANNEL = 'media';
export var context = {
    componentName: 'smart-cards',
    packageName: packageName,
    packageVersion: packageVersion,
};
export var resolvedEvent = function (url) { return ({
    action: 'resolved',
    actionSubject: 'smartCard',
    actionSubjectId: url,
    eventType: 'operational',
    attributes: tslib_1.__assign({}, context, { url: url }),
}); };
export var unresolvedEvent = function (url, state) { return ({
    action: 'unresolved',
    actionSubject: 'smartCard',
    actionSubjectId: url,
    eventType: 'operational',
    attributes: tslib_1.__assign({}, context, { url: url, reason: state.status }, (state.definitionId
        ? { definitionId: state.definitionId }
        : {})),
}); };
export var connectSucceededEvent = function (url, state) { return ({
    action: 'connectSucceeded',
    actionSubject: 'smartCard',
    actionSubjectId: url,
    eventType: 'operational',
    attributes: tslib_1.__assign({}, context, (state.definitionId
        ? { definitionId: state.definitionId }
        : {})),
}); };
export var connectFailedEvent = function (reason, url, state) { return ({
    action: 'connectFailed',
    actionSubject: 'smartCard',
    actionSubjectId: url,
    eventType: 'operational',
    attributes: tslib_1.__assign({}, context, { reason: reason }, (state.definitionId
        ? { definitionId: state.definitionId }
        : {})),
}); };
export var trackAppAccountConnected = function (definitionId) { return ({
    action: 'connected',
    actionObject: 'applicationAccount',
    eventType: 'track',
    attributes: tslib_1.__assign({}, context, { definitionId: definitionId }),
}); };
//# sourceMappingURL=analytics.js.map