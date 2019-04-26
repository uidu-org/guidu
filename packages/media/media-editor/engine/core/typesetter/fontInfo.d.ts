export interface FontMetrics {
    lineHeight: number;
    descent: number;
}
export declare class FontInfo {
    private textHelperDiv;
    private cache;
    constructor(textHelperDiv: HTMLDivElement);
    getFontMetrics(fontSize: number): FontMetrics;
    static getFontStyle(fontSize: number): string;
    private calculateFontMetrics;
}
