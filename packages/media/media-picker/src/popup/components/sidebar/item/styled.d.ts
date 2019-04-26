import { HTMLAttributes, ComponentClass, LiHTMLAttributes } from 'react';
export interface WrapperProps {
    isActive: boolean;
}
export declare const Wrapper: ComponentClass<LiHTMLAttributes<{}> & WrapperProps>;
export declare const ServiceIcon: ComponentClass<HTMLAttributes<{}>>;
export declare const ServiceName: ComponentClass<HTMLAttributes<{}>>;
