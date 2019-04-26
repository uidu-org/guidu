import { Vector2 } from '@uidu/media-ui';
import { CONTAINER_SIZE, CONTAINER_INNER_SIZE, CONTAINER_PADDING, } from './image-navigator';
export function constrainPos(_a, _b) {
    var x = _a.x, y = _a.y;
    var width = _b.width, height = _b.height;
    return new Vector2(Math.min(Math.max(CONTAINER_SIZE - CONTAINER_PADDING - width, x), CONTAINER_PADDING), Math.min(Math.max(CONTAINER_SIZE - CONTAINER_PADDING - height, y), CONTAINER_PADDING));
}
export function constrainScale(newScale, minScale, _a) {
    var width = _a.width, height = _a.height;
    var scaledSize = {
        width: width * newScale,
        height: height * newScale,
    };
    if (scaledSize.width < CONTAINER_INNER_SIZE ||
        scaledSize.height < CONTAINER_INNER_SIZE) {
        return minScale;
    }
    return newScale;
}
export function constrainEdges(_a, _b) {
    var x = _a.x, y = _a.y;
    var width = _b.width, height = _b.height;
    var newPos = {
        x: x,
        y: y,
    };
    var deltaX = newPos.x + width - (CONTAINER_PADDING + CONTAINER_INNER_SIZE);
    var deltaY = newPos.y + height - (CONTAINER_PADDING + CONTAINER_INNER_SIZE);
    var deltaNearX = newPos.x - CONTAINER_PADDING;
    var deltaNearY = newPos.y - CONTAINER_PADDING;
    if (deltaX < 0) {
        newPos.x = newPos.x + Math.abs(deltaX);
    }
    if (deltaY < 0) {
        newPos.y = newPos.y + Math.abs(deltaY);
    }
    if (deltaNearX > 0) {
        newPos.x = CONTAINER_PADDING;
    }
    if (deltaNearY > 0) {
        newPos.y = CONTAINER_PADDING;
    }
    return new Vector2(newPos.x, newPos.y);
}
//# sourceMappingURL=constraint-util.js.map