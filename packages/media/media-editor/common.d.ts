export interface Color {
    red: number;
    green: number;
    blue: number;
}
export interface ColorWithAlpha {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}
export interface ShapeParameters {
    color: Color;
    lineWidth: number;
    addShadow: boolean;
}
export interface Dimensions {
    width: number;
    height: number;
}
export declare type Tool = 'line' | 'blur' | 'arrow' | 'brush' | 'oval' | 'rectangle' | 'text';
export declare type TextDirection = 'ltr' | 'rtl';
export interface ExportedImage {
    isExported: boolean;
    content?: string;
    error?: string;
}
