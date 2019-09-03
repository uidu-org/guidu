declare module '@uidu/theme/elevation' {
  type ThemedResult = () => {
    light: string;
    dark: string;
  };

  export const e100: ThemedResult;
  export const e200: ThemedResult;
  export const e300: ThemedResult;
  export const e400: ThemedResult;
  export const e500: ThemedResult;
}
