export declare class Vector2 {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    add({ x: thatX, y: thatY }: Vector2): Vector2;
    sub({ x: thatX, y: thatY }: Vector2): Vector2;
    scaled(scalar: number): Vector2;
    map(fn: (component: number) => number): Vector2;
    clone(): Vector2;
    rounded(): Vector2;
    toString(): string;
}
export declare class Rectangle {
    readonly width: number;
    readonly height: number;
    constructor(width: number, height: number);
    readonly aspectRatio: number;
    readonly center: Vector2;
    scaled(scale: number): Rectangle;
    resized(width: number, height: number): Rectangle;
    flipped(): Rectangle;
    scaleToFit(containing: Rectangle): number;
    scaleToFitLargestSide(containing: Rectangle): number;
    scaleToFitSmallestSide(containing: Rectangle): number;
    clone(): Rectangle;
}
export declare class Bounds extends Rectangle {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    constructor(x: number, y: number, width: number, height: number);
    readonly origin: Vector2;
    readonly corner: Vector2;
    readonly center: Vector2;
    readonly rect: Rectangle;
    flipped(): Bounds;
    scaled(scale: number): Bounds;
    relativeTo(bounds: Bounds): Bounds;
    clone(): Bounds;
    map(fn: (value: number) => number): Bounds;
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
}
export declare class Camera {
    readonly viewport: Rectangle;
    readonly originalImg: Rectangle;
    constructor(viewport: Rectangle, originalImg: Rectangle);
    resizedViewport(newViewport: Rectangle): Camera;
    readonly scaleToFit: number;
    readonly scaleDownToFit: number;
    readonly fittedImg: Rectangle;
    scaledImg(newScale: number): Rectangle;
    scaledOffset(prevOffset: Vector2, prevScale: number, newScale: number): Vector2;
}
