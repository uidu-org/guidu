import { HTMLAttributes } from 'react';
export interface FrameProps {
    minWidth?: number;
    maxWidth?: number;
    isInteractive?: boolean;
    isSelected?: boolean;
}
export declare const Wrappper: React.ComponentClass<FrameProps & HTMLAttributes<{}>>;
export declare const Icon: React.ComponentClass<HTMLAttributes<{}>>;
export declare const Text: React.ComponentClass<HTMLAttributes<{}>>;
