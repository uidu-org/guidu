import { HTMLAttributes, ComponentClass } from 'react';
export declare const Container: ComponentClass<HTMLAttributes<{}>>;
export declare const HoverArea: ComponentClass<HTMLAttributes<{}>>;
export interface AreaProps {
    isSelected: boolean;
}
export declare const MainArea: ComponentClass<HTMLAttributes<{}> & AreaProps>;
export declare const FrontArea: ComponentClass<HTMLAttributes<{}> & AreaProps>;
