var _this = this;
import * as tslib_1 from "tslib";
import * as React from 'react';
import * as jsc from 'jsverify';
import Button from '@uidu/button';
import { createMouseEvent, mountWithIntlContext, } from '@uidu/media-test-helpers';
import { Rectangle, Camera, Vector2 } from '@uidu/media-ui';
import { InteractiveImg, zoomLevelAfterResize, } from '../../../../../newgen/viewers/image/interactive-img';
import { ZoomControls } from '../../../../../newgen/zoomControls';
import { ImageWrapper, Img } from '../../../../../newgen/styled';
import { ZoomLevel } from '../../../../../newgen/domain/zoomLevel';
import { Outcome } from '../../../../../newgen/domain';
function createFixture(props) {
    var onClose = jest.fn();
    var el = mountWithIntlContext(React.createElement(InteractiveImg, tslib_1.__assign({ onLoad: jest.fn(), onError: jest.fn(), src: '', onClose: onClose }, props)));
    var viewport = new Rectangle(400, 300);
    var originalImg = new Rectangle(800, 600);
    var camera = new Camera(viewport, originalImg);
    var zoomLevel = new ZoomLevel(1);
    el.setState({
        camera: Outcome.successful(camera),
        zoomLevel: zoomLevel,
    });
    return { el: el, onClose: onClose, camera: camera, zoomLevel: zoomLevel };
}
function clickZoomIn(el) {
    el.find(ZoomControls)
        .find(Button)
        .last()
        .simulate('click');
}
function clickZoomOut(el) {
    el.find(ZoomControls)
        .find(Button)
        .first()
        .simulate('click');
}
describe('InteractiveImg', function () {
    it('it allows zooming', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var el;
        return tslib_1.__generator(this, function (_a) {
            el = createFixture().el;
            expect(el.find(ZoomControls)).toHaveLength(1);
            expect(el.state().zoomLevel.value).toEqual(1);
            clickZoomOut(el);
            expect(el.state().zoomLevel.value).toBeLessThan(1);
            clickZoomIn(el);
            expect(el.state().zoomLevel.value).toEqual(1);
            return [2 /*return*/];
        });
    }); });
    it('sets the correct width and height on the Img element', function () {
        var _a = createFixture(), el = _a.el, camera = _a.camera, zoomLevel = _a.zoomLevel;
        var styleProp = el.find(Img).prop('style');
        expect(styleProp).toMatchObject(camera.scaledImg(zoomLevel.value));
    });
    it('sets the correct scrollLeft and scrollTop values on the ImageWrapper', function () {
        var _a = createFixture(), el = _a.el, camera = _a.camera, zoomLevel = _a.zoomLevel;
        var imgWrapper = el.find(ImageWrapper).getDOMNode();
        var prevOffset = new Vector2(imgWrapper.scrollLeft, imgWrapper.scrollTop);
        var prevScale = zoomLevel.value;
        var nextScale = zoomLevel.zoomIn().value;
        clickZoomIn(el);
        var expectedOffset = camera.scaledOffset(prevOffset, prevScale, nextScale);
        expect(imgWrapper.scrollLeft).toEqual(expectedOffset.x);
        expect(imgWrapper.scrollTop).toEqual(expectedOffset.y);
    });
    it('resizes a fitted image when the window is resized', function () {
        var _a = createFixture(), el = _a.el, camera = _a.camera;
        var oldZoomLevel = new ZoomLevel(camera.scaleDownToFit);
        el.setState({ zoomLevel: oldZoomLevel });
        var newViewport = new Rectangle(100, 100);
        var newCamera = camera.resizedViewport(newViewport);
        var newWrapper = {
            clientWidth: newViewport.width,
            clientHeight: newViewport.height,
        };
        el.instance()['wrapper'] = newWrapper;
        window.dispatchEvent(new CustomEvent('resize'));
        var expectedZoomLevel = zoomLevelAfterResize(newCamera, camera, oldZoomLevel);
        var _b = el.state(), actualZoomLevel = _b.zoomLevel, actualCamera = _b.camera.data;
        expect(actualCamera).not.toBeUndefined();
        expect(actualCamera.viewport).toEqual(newViewport);
        expect(actualZoomLevel.value).toEqual(expectedZoomLevel.value);
    });
    it('rotates image when orientation is provided', function () {
        var el = createFixture({ orientation: 2 }).el;
        expect(el.find(Img).prop('style')).toEqual(expect.objectContaining({
            transform: 'rotateY(180deg)',
        }));
    });
    describe('drag and drop', function () {
        it('the image will not move before a mousedown event', function () {
            var el = createFixture().el;
            var wrapper = el.find(ImageWrapper).getDOMNode();
            var oldScrollLeft = wrapper.scrollLeft, oldScrollTop = wrapper.scrollTop;
            var mouseMove = createMouseEvent('mousemove', {
                screenX: 300,
                screenY: 200,
            });
            document.dispatchEvent(mouseMove);
            expect(wrapper.scrollLeft).toEqual(oldScrollLeft);
            expect(wrapper.scrollTop).toEqual(oldScrollTop);
        });
        it('the image will move after a mousedown event', function () {
            var el = createFixture().el;
            el.find(Img).simulate('mousedown', { screenX: 100, screenY: 100 });
            var wrapper = el.find(ImageWrapper).getDOMNode();
            var oldScrollLeft = wrapper.scrollLeft, oldScrollTop = wrapper.scrollTop;
            var mouseMove = createMouseEvent('mousemove', {
                screenX: 300,
                screenY: 200,
            });
            document.dispatchEvent(mouseMove);
            expect(wrapper.scrollLeft).not.toEqual(oldScrollLeft);
            expect(wrapper.scrollTop).not.toEqual(oldScrollTop);
        });
        it('the image will stop moving after a mouseup event', function () {
            var el = createFixture().el;
            el.find(Img).simulate('mousedown', { screenX: 100, screenY: 100 });
            var mouseUp = createMouseEvent('mouseup');
            document.dispatchEvent(mouseUp);
            var wrapper = el.find(ImageWrapper).getDOMNode();
            var oldScrollLeft = wrapper.scrollLeft, oldScrollTop = wrapper.scrollTop;
            var mouseMove = createMouseEvent('mousemove', {
                screenX: 300,
                screenY: 200,
            });
            document.dispatchEvent(mouseMove);
            expect(wrapper.scrollLeft).toEqual(oldScrollLeft);
            expect(wrapper.scrollTop).toEqual(oldScrollTop);
        });
        it('the image will be draggable when it is zoomed larger than the screen', function () {
            var _a = createFixture(), el = _a.el, camera = _a.camera;
            var zoomLevel = new ZoomLevel(camera.scaleToFit * 1.5);
            el.setState({ zoomLevel: zoomLevel });
            expect(el.find(Img).prop('canDrag')).toEqual(true);
        });
        it('the image will not be draggable when it is zoomed smaller than or equal to the screen', function () {
            var _a = createFixture(), el = _a.el, camera = _a.camera;
            var zoomLevel = new ZoomLevel(camera.scaleToFit);
            el.setState({ zoomLevel: zoomLevel });
            expect(el.find(Img).prop('canDrag')).toEqual(false);
        });
        it('the image will be marked as isDragging when it is being dragged', function () {
            var _a = createFixture(), el = _a.el, camera = _a.camera;
            var zoomLevel = new ZoomLevel(camera.scaleToFit * 1.5);
            el.setState({ zoomLevel: zoomLevel });
            el.find(Img).simulate('mousedown', { screenX: 100, screenY: 100 });
            expect(el.find(Img).prop('isDragging')).toEqual(true);
        });
        it('the image will not be marked as isDragging when it is not being dragged', function () {
            var _a = createFixture(), el = _a.el, camera = _a.camera;
            var zoomLevel = new ZoomLevel(camera.scaleToFit * 1.5);
            el.setState({ zoomLevel: zoomLevel });
            expect(el.find(Img).prop('isDragging')).toEqual(false);
        });
    });
    it('only applies image-rendering css props when zoom level greater than 1 (zoomed in)', function () {
        var el = createFixture().el;
        expect(el.find(Img)).not.toHaveStyleRule('image-rendering', 'pixelated');
        clickZoomIn(el);
        expect(el.find(Img)).toHaveStyleRule('image-rendering', 'pixelated');
    });
});
describe('zoomLevelAfterResize', function () {
    var sideLenGenerator = function () { return jsc.integer(1, 10000); };
    jsc.property('a fitted image will be resized to fit the new viewport', sideLenGenerator(), sideLenGenerator(), sideLenGenerator(), sideLenGenerator(), function (w1, h1, w2, h2) {
        var originalImg = new Rectangle(800, 600);
        var oldViewport = new Rectangle(w1, h1);
        var newViewport = new Rectangle(w2, h2);
        var oldCamera = new Camera(oldViewport, originalImg);
        var newCamera = oldCamera.resizedViewport(newViewport);
        var oldZoomLevel = new ZoomLevel(oldCamera.scaleDownToFit);
        var newZoomLevel = zoomLevelAfterResize(newCamera, oldCamera, oldZoomLevel);
        return newZoomLevel.value === newCamera.scaleDownToFit;
    });
    jsc.property('a non-fitted image will maintain its size when viewport is resized', sideLenGenerator(), sideLenGenerator(), sideLenGenerator(), sideLenGenerator(), function (w1, h1, w2, h2) {
        var originalImg = new Rectangle(800, 600);
        var oldViewport = new Rectangle(w1, h1);
        var newViewport = new Rectangle(w2, h2);
        var oldCamera = new Camera(oldViewport, originalImg);
        var newCamera = oldCamera.resizedViewport(newViewport);
        var oldZoomLevel = new ZoomLevel(oldCamera.scaleDownToFit + 1);
        var newZoomLevel = zoomLevelAfterResize(newCamera, oldCamera, oldZoomLevel);
        return newZoomLevel.value === oldZoomLevel.value;
    });
});
//# sourceMappingURL=interactive-img.spec.js.map