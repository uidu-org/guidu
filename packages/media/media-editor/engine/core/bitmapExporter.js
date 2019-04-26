// Responsible for receiving the image
var BitmapExporter = /** @class */ (function () {
    function BitmapExporter(supplementaryCanvas, module) {
        this.supplementaryCanvas = supplementaryCanvas;
        this.module = module;
    }
    BitmapExporter.prototype.prepare = function (imageWidth, imageHeight) {
        if (imageWidth <= 0 || imageHeight <= 0) {
            return false;
        }
        this.supplementaryCanvas.width = imageWidth;
        this.supplementaryCanvas.height = imageHeight;
        return (this.supplementaryCanvas.width === imageWidth &&
            this.supplementaryCanvas.height === imageHeight);
    };
    // Puts the part of the image to the canvas.
    // The array is allocated in Emscripten heap. The core is responsible for releasing it.
    // buffer is the offset in the 8-bit Emscripten heap, bufferLength is the length of the buffer in bytes.
    // The image format is RGBA, no extra conversion necessary to place it to the canvas.
    BitmapExporter.prototype.putImagePart = function (left, top, width, height, buffer, bufferLength) {
        var context = this.supplementaryCanvas.getContext('2d');
        if (context) {
            var array = new Uint8ClampedArray(this.module.HEAPU8.buffer, buffer, bufferLength);
            var imageData = context.createImageData(width, height); // new ImageData() doesn't work in IE11
            imageData.data.set(array);
            context.putImageData(imageData, left, top);
        }
    };
    BitmapExporter.prototype.getBase64Image = function (format) {
        return this.supplementaryCanvas.toDataURL(format);
    };
    return BitmapExporter;
}());
export { BitmapExporter };
//# sourceMappingURL=bitmapExporter.js.map