import { ThemedOuterStyledProps } from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
export interface WrapperProps {
    type: 'success' | 'failure';
}
export declare const Wrapper: ComponentClass<HTMLAttributes<{}> & ThemedOuterStyledProps<WrapperProps, {}>>;
