import * as tslib_1 from "tslib";
import { packageAttributes } from './index';
export function createZoomEvent(zoomType, zoomScale) {
    return {
        eventType: 'ui',
        action: 'clicked',
        actionSubject: 'button',
        actionSubjectId: zoomType,
        attributes: tslib_1.__assign({ zoomScale: zoomScale }, packageAttributes),
    };
}
//# sourceMappingURL=zoom.js.map