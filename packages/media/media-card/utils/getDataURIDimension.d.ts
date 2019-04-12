import { Component } from 'react';
import { CardDimensions, CardAppearance } from '..';
import { ElementDimension } from './getElementDimension';
export declare type getDataURIDimensionOptions = {
    component: Component;
    dimensions?: CardDimensions;
    appearance?: CardAppearance;
};
export declare const getDataURIDimension: (dimension: ElementDimension, options: getDataURIDimensionOptions) => number;
