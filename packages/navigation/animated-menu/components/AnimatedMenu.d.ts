import { Component } from 'react';
import { AnimatedMenuProps, AnimatedMenuState } from '../types';
export default class AnimatedMenu extends Component<AnimatedMenuProps, AnimatedMenuState> {
    readonly state: Readonly<AnimatedMenuState>;
    animatingOutTimeout: any;
    resetDropdownState: (i: any) => void;
    onMouseEnter: (i: any) => void;
    onMouseLeave: () => void;
    render(): JSX.Element;
}
