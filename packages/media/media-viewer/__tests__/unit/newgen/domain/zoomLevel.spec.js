import { ZoomLevel } from '../../../../newgen/domain/zoomLevel';
import * as jsc from 'jsverify';
var scaleGenerator = function () {
    return jsc.oneof([jsc.number(0.1, 2.0), jsc.constant(1)]);
};
describe('ZoomLevel', function () {
    it('should sort zoom levels correctly', function () {
        var zoomLevel = new ZoomLevel(2);
        expect(zoomLevel.zoomLevels).toEqual([
            0.12,
            0.24,
            0.48,
            0.96,
            1,
            2,
            3,
            4,
            8,
            12,
            16,
        ]);
    });
    jsc.property('selects the initialValue if no value is selected', scaleGenerator(), function (scale) {
        var zoomLevel = new ZoomLevel(scale);
        return zoomLevel.value === scale;
    });
    jsc.property('the zoomLevel of 100% does always exist exactly once', scaleGenerator(), function (scale) {
        var zoomLevel = new ZoomLevel(scale);
        return zoomLevel.zoomLevels.filter(function (i) { return i === 1; }).length === 1;
    });
    jsc.property('zooming in maintains the initialValue', scaleGenerator(), function (scale) {
        var original = new ZoomLevel(scale);
        var zoomed = original.zoomIn();
        return original.initialValue === zoomed.initialValue;
    });
    jsc.property('zooming out maintains the initialValue', scaleGenerator(), function (scale) {
        var original = new ZoomLevel(scale);
        var zoomed = original.zoomOut();
        return original.initialValue === zoomed.initialValue;
    });
    jsc.property('increases the zoom level when zooming in', scaleGenerator(), function (scale) {
        var zoomLevel = new ZoomLevel(scale);
        return zoomLevel.zoomIn().value > zoomLevel.value;
    });
    jsc.property('decreases the zoom level when zooming out', scaleGenerator(), function (scale) {
        var zoomLevel = new ZoomLevel(scale);
        return zoomLevel.zoomOut().value < zoomLevel.value;
    });
    jsc.property('will not increase the zoom level when the maximum is reached', scaleGenerator(), function (scale) {
        var zoomLevel = new ZoomLevel(scale).fullyZoomIn();
        return zoomLevel.zoomIn().value === zoomLevel.value;
    });
    jsc.property('will not decrease the zoom level when the minimum is reached', scaleGenerator(), function (scale) {
        var zoomLevel = new ZoomLevel(scale).fullyZoomOut();
        return zoomLevel.zoomOut().value === zoomLevel.value;
    });
    jsc.property('will report if zooming out is possible', scaleGenerator(), function (scale) {
        var zoomLevelDefault = new ZoomLevel(scale);
        var zoomLevelMin = new ZoomLevel(scale).fullyZoomOut();
        return zoomLevelDefault.canZoomOut && !zoomLevelMin.canZoomOut;
    });
    jsc.property('will report if zooming in is possible', scaleGenerator(), function (scale) {
        var zoomLevelDefault = new ZoomLevel(scale);
        var zoomLevelMax = new ZoomLevel(scale).fullyZoomIn();
        return zoomLevelDefault.canZoomIn && !zoomLevelMax.canZoomIn;
    });
    jsc.property('the percentage will be returned as an integer string', scaleGenerator(), function (scale) {
        var zoomLevel = new ZoomLevel(scale);
        return !zoomLevel.asPercentage.includes('.');
    });
});
//# sourceMappingURL=zoomLevel.spec.js.map