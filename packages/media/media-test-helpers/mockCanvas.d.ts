/// <reference types="jest" />
export declare function mockCanvas(width?: number, height?: number): {
    canvas: {
        width: number;
        height: number;
        toDataURL: jest.Mock<any, any>;
        getContext: jest.Mock<any, any>;
    };
    context: Partial<CanvasRenderingContext2D>;
};
