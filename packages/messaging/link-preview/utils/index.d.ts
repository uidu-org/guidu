export declare const isFunction: (fn: any) => boolean;
export declare const isObject: (obj: any) => boolean;
export declare const isNil: (value: any) => boolean;
export declare const getUrlPath: (data: any) => any;
export declare const someProp: (data: any, props: any) => any;
export declare const media: {
    mobile: (...args: any[]) => import("styled-components").FlattenSimpleInterpolation;
    desktop: (...args: any[]) => import("styled-components").FlattenSimpleInterpolation;
};
export declare const defaultApiParameters: {
    video: boolean;
    contrast: boolean;
    screenshot: boolean;
    prerender: string;
};
export declare const createApiUrl: (props: any) => string;
export declare const fetchFromApiUrl: ({ apiKey, apiUrl }: {
    apiKey: any;
    apiUrl: any;
}, source: any) => Promise<any>;
export declare const fetchFromApi: (props: any, source: any) => Promise<any>;
export declare const isLarge: (cardSize: any) => boolean;
export declare const imageProxy: (url: any) => any;
export declare const extractFirstUrl: (text: any) => string;
