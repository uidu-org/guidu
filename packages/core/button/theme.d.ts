/// <reference path="../theme/index.d.ts" />
import { ThemeProps, ThemeTokens, ThemeMode, ThemeFallbacks } from './types';
export declare const fallbacks: ThemeFallbacks;
export declare const baseTheme: {
    background: {
        default: {
            default: {
                light: string;
                dark: string;
            };
            hover: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        primary: {
            default: {
                light: string;
                dark: string;
            };
            hover: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        warning: {
            default: {
                light: string;
                dark: string;
            };
            hover: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        danger: {
            default: {
                light: string;
                dark: string;
            };
            hover: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        link: {
            default: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        subtle: {
            default: {
                light: string;
                dark: string;
            };
            hover: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        'subtle-link': {
            default: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
    };
    boxShadowColor: {
        default: {
            focus: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        primary: {
            focus: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        warning: {
            focus: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        danger: {
            focus: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        link: {
            focus: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        subtle: {
            focus: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        'subtle-link': {
            focus: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
    };
    color: {
        default: {
            default: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        primary: {
            default: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        warning: {
            default: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        danger: {
            default: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        link: {
            default: {
                light: string;
                dark: string;
            };
            hover: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        subtle: {
            default: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
        'subtle-link': {
            default: {
                light: string;
                dark: string;
            };
            hover: {
                light: string;
                dark: string;
            };
            active: {
                light: string;
                dark: string;
            };
            disabled: {
                light: string;
                dark: string;
            };
            selected: {
                light: string;
                dark: string;
            };
            focusSelected: {
                light: string;
                dark: string;
            };
        };
    };
};
export declare function applyPropertyStyle(property: string, { appearance, state, mode, }: {
    appearance?: string;
    state?: string;
    mode?: ThemeMode;
}, theme: any): any;
export declare const Theme: import("@uidu/theme").Theme<ThemeTokens, ThemeProps>;
