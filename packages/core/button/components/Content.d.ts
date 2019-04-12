import * as React from 'react';
interface Props {
    followsIcon: boolean;
    spacing: string;
    isLoading?: boolean;
    children?: React.ReactNode;
}
declare const _default: ({ children, followsIcon, spacing, isLoading, ...rest }: Props) => JSX.Element;
export default _default;
