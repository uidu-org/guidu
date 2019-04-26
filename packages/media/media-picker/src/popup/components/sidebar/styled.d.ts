import { HTMLAttributes, ComponentClass, SVGAttributes, LiHTMLAttributes, SVGProps } from 'react';
export declare const Wrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const ServiceList: ComponentClass<HTMLAttributes<{}>>;
export declare const Separator: ComponentClass<LiHTMLAttributes<{}>>;
export declare const SeparatorLine: ComponentClass<HTMLAttributes<{}>>;
export interface IconProps {
    active: boolean;
}
export declare const StyledIcon: ComponentClass<SVGAttributes<{}>>;
export declare const StyledSvgGroup: ComponentClass<IconProps & SVGProps<SVGGElement>>;
