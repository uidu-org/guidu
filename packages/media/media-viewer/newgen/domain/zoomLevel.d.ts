export declare class ZoomLevel {
    readonly initialValue: number;
    readonly value: number;
    constructor(initialValue: number, selectedValue?: number);
    readonly zoomLevels: number[];
    readonly min: number;
    readonly max: number;
    readonly asPercentage: string;
    zoomIn(): ZoomLevel;
    zoomOut(): ZoomLevel;
    fullyZoomIn(): ZoomLevel;
    fullyZoomOut(): ZoomLevel;
    readonly canZoomIn: boolean;
    readonly canZoomOut: boolean;
}
