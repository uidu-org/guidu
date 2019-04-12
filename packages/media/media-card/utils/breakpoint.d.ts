/// <reference types="react" />
export declare type BreakpointSizeValue = 'small' | 'medium' | 'large' | 'xlarge';
export declare const breakpointSize: (width: import("react").ReactText, sizes?: any) => "small" | "medium" | "large" | "xlarge";
export interface BreakpointProps {
    breakpointSize: BreakpointSizeValue;
}
export declare type CardBreakpoint = {
    [P in BreakpointSizeValue]?: number;
};
export declare const cardBreakpointSizes: CardBreakpoint;
export declare const breakpointStyles: ({ breakpointSize }: BreakpointProps) => string;
