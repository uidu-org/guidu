import * as tslib_1 from "tslib";
import { Rectangle, loadImage, getOrientation, } from '@uidu/media-ui';
import { getCanvas } from './util';
export function radians(deg) {
    return deg * (Math.PI / 180);
}
export function applyOrientation(img, canvasWidth, canvasHeight, orientation, sourceWidth, sourceHeight, destWidth, destHeight) {
    var _a = getCanvas(canvasWidth, canvasHeight), canvas = _a.canvas, context = _a.context;
    if (context) {
        switch (orientation) {
            case 2:
                context.translate(destWidth, 0);
                context.scale(-1, 1);
                break;
            case 3:
                context.translate(destWidth, destHeight);
                context.scale(-1, -1);
                break;
            case 4:
                context.translate(0, destHeight);
                context.scale(1, -1);
                break;
            case 5:
                context.translate(destHeight, 0);
                context.rotate(radians(90));
                context.translate(0, destHeight);
                context.scale(1, -1);
                break;
            case 6:
                context.translate(destHeight, 0);
                context.rotate(radians(90));
                break;
            case 7:
                context.translate(destHeight, 0);
                context.rotate(radians(90));
                context.translate(destWidth, 0);
                context.scale(-1, 1);
                break;
            case 8:
                context.translate(destHeight, 0);
                context.rotate(radians(90));
                context.translate(destWidth, destHeight);
                context.scale(-1, -1);
                break;
        }
        context.drawImage(img, 0, 0, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);
    }
    return canvas.toDataURL();
}
/* pre-process the incoming image for optimisations
     - resample image to min size required to fit zoomed view
     - apply exif orientation (rotate image if needed) so that coords don't need transforming when zooming, panning, or getting image
     - return size info about image (in case of rotation)
 */
export function initialiseImagePreview(fileInfo, containerRect, maxZoom) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orientation, img, result, e_1, naturalWidth, naturalHeight, srcRect, maxRect, scaleFactor, scaledRect, imageWidth, imageHeight, canvasRect, canvasWidth, canvasHeight;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orientation = 1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            getOrientation(fileInfo.file),
                            loadImage(fileInfo.src),
                        ])];
                case 2:
                    result = _a.sent();
                    orientation = result[0];
                    img = result[1];
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, null];
                case 4:
                    if (img) {
                        naturalWidth = img.naturalWidth, naturalHeight = img.naturalHeight;
                        srcRect = new Rectangle(naturalWidth, naturalHeight);
                        maxRect = new Rectangle(containerRect.width * maxZoom, containerRect.height * maxZoom);
                        scaleFactor = srcRect.scaleToFitLargestSide(maxRect);
                        scaledRect = scaleFactor < 1 ? srcRect.scaled(scaleFactor) : srcRect;
                        imageWidth = scaledRect.width, imageHeight = scaledRect.height;
                        canvasRect = scaledRect.clone();
                        if (orientation >= 5) {
                            /* any of the Exif orientation values >= 5 require flipping the rect.
                              any of the lower values are just mirrored/rotated within the same rect */
                            canvasRect = canvasRect.flipped();
                        }
                        canvasWidth = canvasRect.width, canvasHeight = canvasRect.height;
                        fileInfo.src = applyOrientation(img, canvasWidth, canvasHeight, orientation, naturalWidth, naturalHeight, imageWidth, imageHeight);
                        return [2 /*return*/, { fileInfo: fileInfo, width: canvasWidth, height: canvasHeight }];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
export function renderImageAtCurrentView(imageElement, viewInfo, useConstraints, useCircularClipWithActions, backgroundColor) {
    var containerRect = viewInfo.containerRect, imageBounds = viewInfo.imageBounds, sourceBounds = viewInfo.sourceBounds, visibleBounds = viewInfo.visibleBounds;
    var containerWidth = containerRect.width, containerHeight = containerRect.height;
    var _a = getCanvas(containerWidth, containerHeight), canvas = _a.canvas, context = _a.context;
    if (context) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, containerWidth, containerHeight);
        if (imageElement) {
            if (useCircularClipWithActions) {
                var cx = containerWidth * 0.5;
                var cy = containerHeight * 0.5;
                var rx = cx;
                var ry = cy;
                context.save();
                context.beginPath();
                context.translate(cx - rx, cy - ry);
                context.scale(rx, ry);
                context.arc(1, 1, 1, 0, 2 * Math.PI, false);
                context.restore();
                context.fill();
                context.clip();
            }
            if (useConstraints) {
                /* draw sourceRect mapped to container size */
                context.drawImage(imageElement, sourceBounds.left, sourceBounds.top, sourceBounds.width, sourceBounds.height, 0, 0, containerWidth, containerHeight);
            }
            else {
                /* draw imageBounds as is inside container size */
                var naturalWidth = imageElement.naturalWidth, naturalHeight = imageElement.naturalHeight;
                var _b = imageBounds.relativeTo(visibleBounds), left = _b.left, top_1 = _b.top, width = _b.width, height = _b.height;
                context.drawImage(imageElement, 0, 0, naturalWidth, naturalHeight, left, top_1, width, height);
            }
        }
    }
    return canvas;
}
//# sourceMappingURL=imageProcessor.js.map