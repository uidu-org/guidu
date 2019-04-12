import * as tslib_1 from "tslib";
import { createNavigationEvent } from '../../../../newgen/analytics/navigation';
import { version as packageVersion, name as packageName, } from '../../../../../package.json';
var identifier = {
    id: 'my-id',
    mediaItemType: 'file',
    occurrenceKey: 'my-key',
};
var commonPayload = {
    action: 'navigated',
    actionSubject: 'file',
    eventType: 'ui',
};
var commonAttributes = {
    componentName: 'media-viewer',
    packageName: packageName,
    packageVersion: packageVersion,
};
describe('createNavigationEvent', function () {
    it('previous mouse click', function () {
        expect(createNavigationEvent('prev', 'mouse', identifier)).toEqual(tslib_1.__assign({}, commonPayload, { actionSubjectId: 'previous', attributes: tslib_1.__assign({ fileId: 'my-id', input: 'button' }, commonAttributes) }));
    });
    it('next mouse click', function () {
        expect(createNavigationEvent('next', 'mouse', identifier)).toEqual(tslib_1.__assign({}, commonPayload, { actionSubjectId: 'next', attributes: tslib_1.__assign({ fileId: 'my-id', input: 'button' }, commonAttributes) }));
    });
    it('previous keyboard event', function () {
        expect(createNavigationEvent('prev', 'keyboard', identifier)).toEqual(tslib_1.__assign({}, commonPayload, { actionSubjectId: 'previous', attributes: tslib_1.__assign({ fileId: 'my-id', input: 'keys' }, commonAttributes) }));
    });
    it('next keyboard event', function () {
        expect(createNavigationEvent('next', 'keyboard', identifier)).toEqual(tslib_1.__assign({}, commonPayload, { actionSubjectId: 'next', attributes: tslib_1.__assign({ fileId: 'my-id', input: 'keys' }, commonAttributes) }));
    });
});
//# sourceMappingURL=navigation.spec.js.map