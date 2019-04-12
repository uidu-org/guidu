import * as React from 'react';
export declare type ElementDimension = 'height' | 'width';
export declare const getElementDimension: (component: React.Component<{}, {}, any>, dimension: ElementDimension) => number;
