import * as React from 'react';
export declare type Props = {
    src: string;
    onClose?: () => void;
    onLoad: () => void;
    onError: () => void;
};
export declare const setState: (state: "error" | "success") => void;
export declare class InteractiveImg extends React.Component<Props, {}> {
    componentDidMount(): void;
    render(): JSX.Element;
}
