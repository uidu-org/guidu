import { PureComponent } from 'react';
import { GlobalNavigationProps } from '../types';
export default class GlobalNavigation extends PureComponent<GlobalNavigationProps> {
    state: {
        isOpen: boolean;
    };
    render(): JSX.Element[];
}
