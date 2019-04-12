import { isRetina } from './isRetina';
import { getElementDimension } from './getElementDimension';
import { defaultImageCardDimensions } from './cardDimensions';
import { isValidPercentageUnit } from './isValidPercentageUnit';
import { containsPixelUnit } from './containsPixelUnit';
export var getDataURIDimension = function (dimension, options) {
    var retinaFactor = isRetina() ? 2 : 1;
    var dimensionValue = (options.dimensions && options.dimensions[dimension]) || '';
    if (isValidPercentageUnit(dimensionValue)) {
        return getElementDimension(options.component, dimension) * retinaFactor;
    }
    if (typeof dimensionValue === 'number') {
        return dimensionValue * retinaFactor;
    }
    if (containsPixelUnit("" + dimensionValue)) {
        return parseInt("" + dimensionValue, 10) * retinaFactor;
    }
    return defaultImageCardDimensions[dimension] * retinaFactor;
};
//# sourceMappingURL=getDataURIDimension.js.map