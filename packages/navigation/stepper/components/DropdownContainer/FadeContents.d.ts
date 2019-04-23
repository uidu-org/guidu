import React from 'react';
declare type FadeContentProps = {
    duration?: number;
    direction?: 'right' | 'left';
    animatingOut?: boolean;
    children: React.ReactNode;
};
declare const FadeContents: React.ForwardRefExoticComponent<FadeContentProps & React.RefAttributes<any>>;
export default FadeContents;
