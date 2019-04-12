import { size } from '@uidu/media-ui';
export var breakpointSize = function (width, sizes) {
    if (sizes === void 0) { sizes = cardBreakpointSizes; }
    var value = parseInt("" + width, 10); // Normalize value
    var keys = Object.keys(sizes);
    var defaultValue = keys[0];
    var breakpoint;
    keys.forEach(function (label) {
        if (value < sizes[label] && !breakpoint) {
            breakpoint = label;
        }
    });
    return breakpoint || defaultValue;
};
export var cardBreakpointSizes = {
    small: 173,
    medium: 225,
    large: 300,
    xlarge: Infinity,
};
export var breakpointStyles = function (_a) {
    var breakpointSize = _a.breakpointSize;
    switch (breakpointSize) {
        case 'small':
            return "\n        .title {\n          font-size: 12px;\n        }\n        .file-type-icon span {\n          // We need to use important here since we can't use the dimensions provided by the Icon component\n          " + size('14px !important') + "\n        }\n      ";
        case 'medium':
            return "\n        .title {\n          font-size: 14px;\n        }\n        .file-type-icon span {\n          " + size('16px !important') + "\n        }\n      ";
        case 'large':
            return "\n        .overlay {\n          padding: 24px;\n        }\n        .title {\n          font-size: 14px;\n        }\n        .file-size {\n          font-size: 14px;\n        }\n        .file-type-icon span {\n          " + size('18px !important') + "\n        }\n      ";
        case 'xlarge':
            return "\n        border-radius: 2px;\n\n        .title {\n          font-size: 16px;\n        }\n\n        .file-size {\n          font-size: 14px;\n        }\n\n        .wrapper, .img-wrapper {\n          border-radius: 2px;\n        }\n\n        .overlay {\n          padding: 24px;\n        }\n\n        .file-type-icon span {\n          " + size('18px !important') + "\n        }\n      ";
    }
};
//# sourceMappingURL=breakpoint.js.map