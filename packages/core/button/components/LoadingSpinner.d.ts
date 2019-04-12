import * as React from 'react';
declare type Props = {
    spacing: string;
    styles: {};
    isDisabled: boolean;
    isSelected: boolean;
    appearance?: string;
};
export default class LoadingSpinner extends React.Component<Props> {
    invertSpinner: () => boolean;
    render(): JSX.Element;
}
export {};
