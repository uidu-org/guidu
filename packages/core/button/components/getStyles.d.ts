/// <reference types="react" />
import { ThemeProps } from '../types';
/**
 * BUTTON STYLES
 */
export declare const getButtonStyles: (props: ThemeProps) => {
    'pointer-events': string;
    background: any;
    borderRadius: string;
    boxShadow: string;
    color: string;
    cursor: string;
    height: string;
    lineHeight: string;
    padding: import("react").ReactText;
    transition: string;
    transitionDuration: string;
    verticalAlign: string;
    width: string;
    '&::-moz-focus-inner': {
        border: number;
        margin: number;
        padding: number;
    };
    '&:hover': {
        textDecoration: string;
    };
    alignItems: string;
    borderWidth: number;
    boxSizing: string;
    display: string;
    fontSize: string;
    fontStyle: string;
    fontWeight: string;
    maxWidth: string;
    outline: string;
    textAlign: string;
    textDecoration: string;
    whiteSpace: string;
};
/**
 * SPINNER STYLES
 */
export declare const getSpinnerStyles: () => {
    display: string;
    position: string;
    left: string;
    top: string;
    transform: string;
};
