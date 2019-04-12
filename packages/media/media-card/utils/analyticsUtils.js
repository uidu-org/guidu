import { version, name } from '../version.json';
export var getBaseAnalyticsContext = function (componentName, actionSubjectId) { return ({
    packageVersion: version,
    packageName: name,
    componentName: componentName,
    actionSubject: 'MediaCard',
    actionSubjectId: actionSubjectId,
}); };
//# sourceMappingURL=analyticsUtils.js.map