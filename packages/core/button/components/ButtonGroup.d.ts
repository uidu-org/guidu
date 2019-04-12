import * as React from 'react';
import { ButtonAppearances } from '../types';
export declare type ButtonGroupProps = {
    /** The appearance to apply to all buttons. */
    appearance?: ButtonAppearances;
};
export declare const groupItemStyles: {
    flex: string;
    display: string;
    '& + &::before': {
        content: string;
        display: string;
        width: string;
    };
};
export default class ButtonGroup extends React.Component<ButtonGroupProps> {
    render(): JSX.Element;
}
