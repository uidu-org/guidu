import * as React from 'react';
declare type Props = {
    spacing: string;
    appearance?: string;
    isDisabled: boolean;
    isSelected: boolean;
};
export default class LoadingSpinner extends React.Component<Props> {
    invertSpinner: () => boolean;
    render(): JSX.Element;
}
export {};
