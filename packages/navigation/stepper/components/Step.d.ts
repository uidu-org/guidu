import { Component } from 'react';
import { StepProps } from '../types';
export default class Step extends Component<StepProps> {
    static defaultProps: {
        scope: any;
        description: any;
        className: any;
        style: any;
        isCompleted: boolean;
        isDisabled: boolean;
        isEditable: boolean;
    };
    private step;
    renderIcon: () => number | JSX.Element;
    render(): JSX.Element;
}
