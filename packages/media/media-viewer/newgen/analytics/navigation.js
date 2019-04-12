import * as tslib_1 from "tslib";
import { isFileIdentifier } from '@uidu/media-core';
import { packageAttributes } from './index';
function actionFromDirection(direction) {
    switch (direction) {
        case 'next':
            return 'next';
        case 'prev':
            return 'previous';
    }
}
function inputFromSource(source) {
    switch (source) {
        case 'mouse':
            return 'button';
        case 'keyboard':
            return 'keys';
    }
}
var fileDetailsFromIdentifier = function (identifier) { return ({
    fileId: isFileIdentifier(identifier) && typeof identifier.id === 'string'
        ? identifier.id
        : '',
}); };
export function createNavigationEvent(direction, source, newItem) {
    return {
        eventType: 'ui',
        action: 'navigated',
        actionSubject: 'file',
        actionSubjectId: actionFromDirection(direction),
        attributes: tslib_1.__assign({}, packageAttributes, fileDetailsFromIdentifier(newItem), { input: inputFromSource(source) }),
    };
}
//# sourceMappingURL=navigation.js.map