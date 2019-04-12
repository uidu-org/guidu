import * as React from 'react';
import { ButtonProps } from '../types';
export declare type ButtonState = {
    isHover: boolean;
    isActive: boolean;
    isFocus: boolean;
};
export declare class Button extends React.Component<ButtonProps, ButtonState> {
    static defaultProps: ButtonProps;
    button: React.RefObject<HTMLElement>;
    getComposedRefs: (...refs: any[]) => (x: HTMLElement) => void;
    state: {
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
    };
    componentDidMount(): void;
    isInteractive: () => boolean;
    onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseUp: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onFocus: React.FocusEventHandler<HTMLButtonElement>;
    onBlur: React.FocusEventHandler<HTMLButtonElement>;
    getElement: () => "span" | "button" | "a";
    onInnerClick: React.MouseEventHandler<HTMLElement>;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<ButtonProps>;
export default _default;
