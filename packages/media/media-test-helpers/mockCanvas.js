export function mockCanvas(width, height) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    var context = {
        translate: jest.fn(),
        rotate: jest.fn(),
        scale: jest.fn(),
        drawImage: jest.fn(),
        arc: jest.fn(),
        save: jest.fn(),
        beginPath: jest.fn(),
        restore: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        clip: jest.fn(),
        fillRect: jest.fn(),
        closePath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        fillStyle: '',
        strokeStyle: '',
    };
    return {
        canvas: {
            width: width,
            height: height,
            toDataURL: jest.fn(),
            getContext: jest.fn().mockReturnValue(context),
        },
        context: context,
    };
}
//# sourceMappingURL=mockCanvas.js.map