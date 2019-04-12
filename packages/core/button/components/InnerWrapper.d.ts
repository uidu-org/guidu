import * as React from 'react';
interface Props {
    onClick?: React.MouseEventHandler;
    fit: boolean;
    children: React.ReactNode;
}
declare const _default: ({ fit, children, ...rest }: Props) => JSX.Element;
export default _default;
