import { Rectangle, Vector2 } from '@uidu/media-ui';
import {
  CONTAINER_SIZE,
  CONTAINER_INNER_SIZE,
  CONTAINER_PADDING,
} from './image-navigator';

export function constrainPos(
  { x, y }: Vector2,
  { width, height }: Rectangle,
): Vector2 {
  return new Vector2(
    Math.min(
      Math.max(CONTAINER_SIZE - CONTAINER_PADDING - width, x),
      CONTAINER_PADDING,
    ),
    Math.min(
      Math.max(CONTAINER_SIZE - CONTAINER_PADDING - height, y),
      CONTAINER_PADDING,
    ),
  );
}

export function constrainScale(
  newScale: number,
  minScale: number,
  { width, height }: Rectangle,
): number {
  const scaledSize = {
    width: width * newScale,
    height: height * newScale,
  };

  if (
    scaledSize.width < CONTAINER_INNER_SIZE ||
    scaledSize.height < CONTAINER_INNER_SIZE
  ) {
    return minScale;
  }

  return newScale;
}

export function constrainEdges(
  { x, y }: Vector2,
  { width, height }: Rectangle,
): Vector2 {
  const newPos = {
    x,
    y,
  };
  const deltaX = newPos.x + width - (CONTAINER_PADDING + CONTAINER_INNER_SIZE);
  const deltaY = newPos.y + height - (CONTAINER_PADDING + CONTAINER_INNER_SIZE);
  const deltaNearX = newPos.x - CONTAINER_PADDING;
  const deltaNearY = newPos.y - CONTAINER_PADDING;
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
