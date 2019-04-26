import { HTMLAttributes, ComponentClass, ImgHTMLAttributes, ButtonHTMLAttributes } from 'react';
declare module 'react' {
    interface ImgHTMLAttributes<T> {
        alt?: string;
        crossOrigin?: 'anonymous' | 'use-credentials' | '';
        height?: number | string;
        sizes?: string;
        src?: string;
        srcSet?: string;
        useMap?: string;
        width?: number | string;
    }
}
export declare const Container: ComponentClass<HTMLAttributes<{}>>;
export declare const Image: ComponentClass<ImgHTMLAttributes<{}>>;
export declare const containerPadding = 28;
export declare const RectMask: ComponentClass<HTMLAttributes<{}>>;
export declare const CircularMask: ComponentClass<HTMLAttributes<{}>>;
export declare const DragOverlay: ComponentClass<HTMLAttributes<{}>>;
export declare const RemoveImageContainer: ComponentClass<HTMLAttributes<{}>>;
export declare const RemoveImageButton: ComponentClass<ButtonHTMLAttributes<{}>>;
