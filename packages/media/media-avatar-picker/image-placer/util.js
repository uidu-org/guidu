export function getCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    return { canvas: canvas, context: context };
}
//# sourceMappingURL=util.js.map