import { Rectangle, Vector2 } from '@uidu/media-ui';
export declare function constrainPos({ x, y }: Vector2, { width, height }: Rectangle): Vector2;
export declare function constrainScale(newScale: number, minScale: number, { width, height }: Rectangle): number;
export declare function constrainEdges({ x, y }: Vector2, { width, height }: Rectangle): Vector2;
