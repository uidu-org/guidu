import { ThemedOuterStyledProps } from 'styled-components';
import { HTMLAttributes, ComponentClass, CanvasHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { ButtonProps } from './toolbarButtons';
export interface LineWidthFrontCircleProps {
    width: number;
}
export declare const blanketColor: string;
export declare const MediaEditorContainer: ComponentClass<HTMLAttributes<{}>>;
export declare const OutputArea: ComponentClass<HTMLAttributes<{}> & ThemedOuterStyledProps<{}, {}>>;
export declare const DrawingCanvas: ComponentClass<CanvasHTMLAttributes<{}> & ThemedOuterStyledProps<{}, {}>>;
export declare const SupplementaryCanvas: ComponentClass<CanvasHTMLAttributes<{}> & ThemedOuterStyledProps<{}, {}>>;
export declare const HiddenTextArea: ComponentClass<TextareaHTMLAttributes<{}> & ThemedOuterStyledProps<{}, {}>>;
export declare const HiddenTextHelperDiv: ComponentClass<HTMLAttributes<{}> & ThemedOuterStyledProps<{}, {}>>;
export declare const ToolbarContainer: ComponentClass<HTMLAttributes<{}>>;
export declare const ToolbarButton: ComponentClass<HTMLAttributes<{}> & ButtonProps>;
export declare const ColorSquare: ComponentClass<HTMLAttributes<{}>>;
export declare const LineWidthBackCircle: ComponentClass<HTMLAttributes<{}>>;
export declare const LineWidthFrontCircle: ComponentClass<HTMLAttributes<{}> & LineWidthFrontCircleProps>;
export declare const ToolIcon: ComponentClass<HTMLAttributes<{}>>;
export declare const Blanket: ComponentClass<HTMLAttributes<{}>>;
export declare const SpinnerWrapper: ComponentClass<HTMLAttributes<{}>>;
