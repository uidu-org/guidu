import { HTMLAttributes, ComponentClass, AnchorHTMLAttributes } from 'react';
export declare const className = "media-card-frame";
export declare const cardShadow = "\n  box-shadow: 0 0 1px 0 rgba(23, 43, 77, 0.24);";
export interface WrapperProps {
    minWidth?: number;
    maxWidth?: number;
    isInteractive?: boolean;
    isSelected?: boolean;
}
export declare const LinkWrapper: ComponentClass<AnchorHTMLAttributes<{}> & WrapperProps>;
export declare const Wrapper: ComponentClass<HTMLAttributes<{}> & WrapperProps>;
export declare const Header: ComponentClass<HTMLAttributes<{}>>;
export interface PlaceholderProps {
    isPlaceholder: boolean;
}
export declare const IconWrapper: ComponentClass<HTMLAttributes<{}> & PlaceholderProps>;
export declare const TextWrapper: ComponentClass<HTMLAttributes<{}> & PlaceholderProps>;
export interface ContentProps {
    isInteractive: boolean;
}
export declare const Content: ComponentClass<HTMLAttributes<{}> & ContentProps>;
