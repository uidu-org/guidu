import * as React from 'react';
/**
 * Styling a button is complicated and there are a number of properties which inform its appearance.
 * We want to be able to style any arbitrary component like a button, but we don't want to pass all
 * of these appearance-related props through to the component or underlying DOM node. This component
 * acts as a layer which catches the appearance-related properties so that they can be used by
 * styled-components, then passes the rest of the props on to the custom component.
 */
import { DerivedButtonProps } from '../types';
declare class CustomComponentProxy extends React.Component<DerivedButtonProps> {
    render(): JSX.Element;
}
export default CustomComponentProxy;
