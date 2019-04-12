import { HTMLAttributes, ComponentClass } from 'react';
export interface OverlayProps {
    hasError?: boolean;
    noHover?: boolean;
}
export declare const TickBox: ComponentClass<HTMLAttributes<{}> & OverlayProps>;
export declare const Overlay: ComponentClass<HTMLAttributes<{}> & OverlayProps>;
export declare const ErrorLine: ComponentClass<HTMLAttributes<{}>>;
export declare const LeftColumn: ComponentClass<HTMLAttributes<{}>>;
export declare const TopRow: ComponentClass<HTMLAttributes<{}>>;
export declare const BottomRow: ComponentClass<HTMLAttributes<{}>>;
export declare const RightColumn: ComponentClass<HTMLAttributes<{}>>;
export declare const ErrorMessage: ComponentClass<HTMLAttributes<{}>>;
export declare const Retry: ComponentClass<HTMLAttributes<{}>>;
export declare const ErrorWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const TitleWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const Subtitle: ComponentClass<HTMLAttributes<{}>>;
export declare const Metadata: ComponentClass<HTMLAttributes<{}>>;
