import { AnchorHTMLAttributes, ComponentClass } from 'react';
export interface WrapperProps {
    isSelected?: boolean;
    isInteractive?: boolean;
    withoutBackground?: boolean;
}
export declare const Wrapper: ComponentClass<AnchorHTMLAttributes<{}> & WrapperProps>;
