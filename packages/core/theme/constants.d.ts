declare module '@uidu/theme/constants' {
  export const borderRadius: () => number;
  export const codeFontFamily: () => string;
  export const noFocusRing: () => string;
  export const focusRing: (color: string, outlineWidth: number) => string;
  export const colors: Record<string, string>;
  export const elevation: any;
  export const fontFamily: any;
  export const fontSize: any;
  export const fontSizeSmall: () => number;
  export const gridSize: any;
  export const layers: Record<string, () => number>;
  export const math: any;
  export const themed: any;
  export const typography: any;

  const GlobalTheme: Theme<GlobalThemeTokens, any>;
  export default GlobalTheme;
}
