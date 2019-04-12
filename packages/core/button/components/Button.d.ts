import * as React from 'react';
import { ButtonProps } from '../types';
export declare type ButtonState = {
    isActive: boolean;
    isFocus: boolean;
    isHover: boolean;
};
export declare const defaultProps: Pick<ButtonProps, 'appearance' | 'isDisabled' | 'isSelected' | 'isLoading' | 'spacing' | 'type' | 'shouldFitContainer' | 'autoFocus'>;
export declare class Button extends React.Component<ButtonProps, ButtonState> {
    button: HTMLElement | undefined;
    state: {
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
    };
    componentWillReceiveProps(nextProps: ButtonProps): void;
    componentDidMount(): void;
    private customComponent;
    isInteractive: () => boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: (e: Event) => void;
    onMouseUp: () => void;
    onFocus: React.FocusEventHandler<HTMLButtonElement>;
    onBlur: React.FocusEventHandler<HTMLButtonElement>;
    onInnerClick: React.MouseEventHandler<HTMLButtonElement>;
    getStyledComponent(): React.ComponentClass<any, any> | React.FunctionComponent<any> | import("styled-components").StyledComponent<"span", any, Partial<{
        'aria-label': string;
        onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, analyticsEvent: import("@atlaskit/analytics-next-types").UIAnalyticsEvent) => void;
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: Event) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
        tabIndex: number;
        appearance: import("../types").ButtonAppearances;
        className: string;
        disabled: boolean;
        isActive: boolean;
        isFocus: boolean;
        isHover: boolean;
        isLoading: boolean;
        isSelected: boolean;
        spacing: "default" | "compact" | "none";
        fit: boolean;
        id: string;
    }> & {
        theme?: any;
    }, never>;
    getInnerRef: (ref: HTMLElement) => void;
    render(): JSX.Element;
}
export declare const DefaultedButton: React.ComponentClass<Partial<Pick<ButtonProps, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "shouldFitContainer" | "type" | "autoFocus">> & Pick<ButtonProps, "form" | "className" | "onBlur" | "onClick" | "onFocus" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "tabIndex" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "target" | "theme">, any>;
export declare type ButtonType = Button;
export declare const ButtonBase: typeof Button;
export declare const ButtonWithoutAnalytics: React.ComponentClass<Partial<Pick<ButtonProps, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "shouldFitContainer" | "type" | "autoFocus">> & Pick<ButtonProps, "form" | "className" | "onBlur" | "onClick" | "onFocus" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "tabIndex" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "target" | "theme"> & {
    appearance?: import("../types").ButtonAppearances;
}, any>;
declare const _default: any;
export default _default;
