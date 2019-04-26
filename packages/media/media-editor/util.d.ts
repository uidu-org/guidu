import { Color, ColorWithAlpha, Dimensions } from './common';
export declare const colorSame: (a: Color, b: Color) => boolean;
export declare const colorWithAlphaSame: (a: ColorWithAlpha, b: ColorWithAlpha) => boolean;
export declare const dimensionsSame: (a: Dimensions, b: Dimensions) => boolean;
export declare const getUtf32Codes: (text: string) => number[];
export declare const getUtf32CodeUnits: (text: string) => string[];
export declare function adjustSize<T>(elements: Array<T>, requiredSize: number, creator: () => T, deleter: (element: T) => void): void;
export declare const fileToBase64: (blob: Blob) => Promise<string>;
