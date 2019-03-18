import * as React from 'react';
import { ButtonAppearances } from '../types';
export declare type ButtonGroupProps = {
    /** The appearance to apply to all buttons. */
    appearance?: ButtonAppearances;
};
declare const _default: React.ComponentClass<ButtonGroupProps & {
    appearance?: "default" | "danger" | "link" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
}, any>;
export default _default;
