import { CardDimensions, CardAppearance } from '../';
import { BreakpointSizeValue } from '../utils/breakpoint';
export interface WrapperProps {
    shouldUsePointerCursor?: boolean;
    dimensions?: CardDimensions;
    appearance?: CardAppearance;
    breakpointSize?: BreakpointSizeValue;
}
export declare const Wrapper: import("styled-components").StyledComponent<"div", any, WrapperProps, never>;
export declare const InlinePlayerWrapper: import("styled-components").StyledComponent<"div", any, {
    selected?: boolean;
}, never>;
