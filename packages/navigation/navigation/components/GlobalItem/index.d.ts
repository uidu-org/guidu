import { PureComponent } from 'react';
export default class GlobalItem extends PureComponent<any> {
    static defaultProps: {
        as: string;
        badge: any;
        tooltip: any;
    };
    render(): JSX.Element;
}
