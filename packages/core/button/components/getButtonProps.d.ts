/// <reference types="react" />
declare const getButtonProps: (component: import("./Button").Button) => {
    'aria-label': string | undefined;
    onBlur: (event: import("react").FocusEvent<HTMLButtonElement>) => void;
    onClick: ((e: import("react").MouseEvent<HTMLButtonElement, MouseEvent>, analyticsEvent: import("@atlaskit/analytics-next-types").UIAnalyticsEvent) => void) | undefined;
    onFocus: (event: import("react").FocusEvent<HTMLButtonElement>) => void;
    onMouseDown: (e: Event) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseUp: () => void;
    tabIndex: number | undefined;
    appearance: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
    className: string | undefined;
    disabled: boolean;
    isActive: boolean;
    isFocus: boolean;
    isHover: boolean;
    isLoading: boolean;
    isSelected: boolean;
    spacing: "default" | "compact" | "none";
    fit: boolean;
    id: string | undefined;
};
export default getButtonProps;
