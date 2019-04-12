import { isValidPercentageUnit } from './isValidPercentageUnit';
import { containsPixelUnit } from './containsPixelUnit';
export var canCompareDimension = function (current, next) {
    if (!current || !next) {
        return false;
    }
    if (isValidPercentageUnit(current) && isValidPercentageUnit(next)) {
        return true;
    }
    if (containsPixelUnit("" + current) && containsPixelUnit("" + next)) {
        return true;
    }
    if (typeof current === 'number' && typeof next === 'number') {
        return true;
    }
    return false;
};
export var isBigger = function (current, next) {
    if (canCompareDimension(current.width, next.width) &&
        canCompareDimension(current.height, next.height)) {
        var nextIsHigher = parseInt("" + current.width, 10) < parseInt("" + next.width, 10);
        var nextIsWider = parseInt("" + current.height, 10) < parseInt("" + next.height, 10);
        return nextIsHigher || nextIsWider;
    }
    else {
        return false;
    }
};
//# sourceMappingURL=dimensionComparer.js.map