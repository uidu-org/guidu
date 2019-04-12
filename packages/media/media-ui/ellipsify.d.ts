/// <reference types="react" />
export interface WrapperProps {
    inline?: boolean;
}
export interface EllipsifyProps {
    text?: string;
    lines: number;
    endLength?: number;
    inline?: boolean;
}
export declare const Ellipsify: (props: EllipsifyProps) => JSX.Element;
export default Ellipsify;
