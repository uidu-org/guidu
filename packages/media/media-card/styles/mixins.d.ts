import { CardAppearance } from '../index';
export declare const centerX = "\n  display: flex;\n  justify-content: center;\n";
export declare const antialiased = "\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n";
export declare const centerSelfY = "\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n";
export declare const centerSelfX = "\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n";
export declare const centerSelf = "\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n";
export declare const borderRadiusLeft: string;
export declare const spaceAround = "\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n";
export declare const transition: (propertyName?: string) => string;
export declare const hexToRgb: (hex: any) => string;
export declare const rgba: (hex: any, opacity: any) => string;
export declare const capitalize = "\n  &::first-letter {\n    text-transform: uppercase;\n  }\n";
export interface WithAppearanceProps {
    appearance?: CardAppearance;
}
export declare const withAppearance: (styleMap: {
    image?: string;
    auto?: string;
    square?: string;
    horizontal?: string;
}) => ({ appearance }: WithAppearanceProps) => string;
