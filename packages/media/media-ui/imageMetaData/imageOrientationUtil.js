var ORIENT_TRANSFORMS = {
    1: 'none',
    2: 'rotateY(180deg)',
    3: 'rotate(180deg)',
    4: 'rotate(180deg) rotateY(180deg)',
    5: 'rotate(270deg) rotateY(180deg)',
    6: 'rotate(90deg)',
    7: 'rotate(90deg) rotateY(180deg)',
    8: 'rotate(270deg)',
};
/**
 * Returns true if image rotated 90 or 270 degrees (on it's side)
 */
export var isRotated = function (orientation) { return orientation >= 5; };
export var getCssFromImageOrientation = function (orientation) {
    return ORIENT_TRANSFORMS[orientation];
};
//# sourceMappingURL=imageOrientationUtil.js.map