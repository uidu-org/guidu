import { HTMLAttributes, ComponentClass, InputHTMLAttributes, ImgHTMLAttributes } from 'react';
export declare const ImageBg: ComponentClass<HTMLAttributes<{}>>;
export declare const Container: ComponentClass<HTMLAttributes<{}>>;
export declare const SliderContainer: ComponentClass<HTMLAttributes<{}>>;
export declare const FileInput: ComponentClass<InputHTMLAttributes<{}>>;
export declare const ImageUploader: ComponentClass<HTMLAttributes<{}>>;
export interface DragZoneProps {
    isDroppingFile: boolean;
    showBorder: boolean;
}
export declare const DragZone: ComponentClass<HTMLAttributes<{}> & DragZoneProps>;
export declare const DragZoneImage: ComponentClass<ImgHTMLAttributes<{}>>;
export interface DragZoneTextProps {
    isFullSize: boolean;
}
export declare const DragZoneText: ComponentClass<HTMLAttributes<{}> & DragZoneTextProps>;
export declare const SelectionBlocker: ComponentClass<HTMLAttributes<{}>>;
export declare const PaddedBreak: ComponentClass<HTMLAttributes<{}>>;
