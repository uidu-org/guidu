import { HTMLAttributes, ComponentClass } from 'react';
export declare const Wrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const IconWrapper: ComponentClass<HTMLAttributes<{}>>;
export interface ImageWrapperProps {
    url: string;
}
export declare const ImageWrapper: ComponentClass<HTMLAttributes<{}> & ImageWrapperProps>;
